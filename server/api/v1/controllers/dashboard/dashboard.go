package dashboard

import (
	"encoding/json"
	"log"
	"sync"

	"dev-profile/pkg/config/response"

	"github.com/gin-gonic/gin"
)

func ProfileAnalyze(c *gin.Context) {
	githubUser := c.Param("github_user")
	if githubUser == "" {
		response.SendBadRequestError(c, "Github user name is required", nil)
		return
	}

	user_url := "https://api.github.com/users/" + githubUser

	//? Get user data
	data, err := MakeRESTRequest(user_url, nil)

	var raw map[string]any
	if err := json.Unmarshal(data, &raw); err != nil {
		log.Println("Invalid payload :: ", err)
		response.SendServerError(c, err, nil)
		return
	}

	if status, ok := raw["status"].(string); ok && status == "404" {
		response.SendNotFoundError(c, "User not found", nil)
		return
	}

	var user User
	if err := json.Unmarshal(data, &user); err != nil {
		log.Println("Invalid payload :: ", err)
		response.SendServerError(c, err, nil)
		return
	}

	//? Profile Profile Card
	profileCard := ProfileCard{
		Name:        user.Name,
		AKA:         user.AKA,
		Avatar:      user.AvatarURL,
		CodingHabit: "",
		Location:    user.Location,
		GithubLink:  user.HTMLURL,
	}

	score := 0.0
	if user.Bio != "" {
		score += 2.5
	}
	if user.Email != "" {
		score += 2.5
	}
	if user.Portfolio != "" {
		score += 2.5
	}
	if user.PublicRepos > 20 {
		score += 2.5
	} else if user.PublicRepos > 10 {
		score += 1.25
	}

	//? Profile Bio
	bio := Bio{
		Name:         user.Name,
		Bio:          user.Bio,
		Location:     user.Location,
		Company:      user.Company,
		Email:        user.Email,
		Portfolio:    user.Portfolio,
		Followers:    user.Followers,
		Following:    user.Following,
		Joined:       user.Joined,
		PublicRepos:  user.PublicRepos,
		PublicGists:  user.PublicGists,
		ProfileScore: score,
	}

	var (
		wg            sync.WaitGroup
		reposChan     = make(chan []Repo)
		techStack     TechStack
		topRepos      []TopRepo
		contributions GraphQLResponse
		osc           OpenSource
		activities    []Events
		errChan       = make(chan error, 5)
	)
	wg.Add(4)

	go func() {
		repos, err := GetRepos(githubUser)
		if err != nil {
			errChan <- err
			return
		}
		reposChan <- repos
	}()

	select {
	case err := <-errChan:
		log.Fatal(err)
	case repos := <-reposChan:
		go func() {
			defer wg.Done()
			//? user tech stack
			techStack = GetTechStack(repos)
			//? user top repos
			topRepos = TopRepos(repos)
		}()
	}

	//? user contributions graph
	go func() {
		defer wg.Done()
		contributionsPtr, err := GetContributions(githubUser)
		if err != nil {
			errChan <- err
			return
		}
		contributions = *contributionsPtr
	}()

	//? user open source contributions
	go func() {
		defer wg.Done()
		oscPtr, err := GetOpenSourceContributions(githubUser)
		if err != nil {
			errChan <- err
			return
		}
		osc = *oscPtr

	}()

	//? user recent activity
	go func() {
		defer wg.Done()
		activities, err = GetRecentActivity(githubUser, &profileCard)
		if err != nil {
			errChan <- err
			return
		}
	}()

	select {
	case err := <-errChan:
		log.Fatal(err)
	default:
	}
	wg.Wait()

	response.SendJSON(c, gin.H{
		"profileCard":             profileCard,
		"bio":                     bio,
		"techStack":               techStack,
		"topRepos":                topRepos,
		"contributions":           contributions,
		"openSourceContributions": osc,
		"activities":              activities,
	}, nil)
}
