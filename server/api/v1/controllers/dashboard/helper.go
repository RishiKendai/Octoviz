package dashboard

import (
	"encoding/json"
	"fmt"
	"sort"
	"time"
)

const (
	GitHubRESTBaseURL    = "https://api.github.com"
	GitHubGraphqlBaseURL = "https://api.github.com/graphql"
)

func GetRepos(username string) ([]Repo, error) {
	page := 1

	var result []Repo
	for {
		url := fmt.Sprintf("%s/users/%s/repos?per_page=100&page=%d&sort=updated", GitHubRESTBaseURL, username, page)
		reposData, err := MakeRESTRequest(url, nil)
		if err != nil {
			return nil, err
		}
		var repos []Repo
		if err := json.Unmarshal(reposData, &repos); err != nil {
			return nil, err
		}
		if len(repos) == 0 {
			break
		}
		result = append(result, repos...)
		page++
	}
	return result, nil
}

func sortLanguages(languages []Language) {
	sort.Slice(languages, func(i, j int) bool {
		return languages[i].Size > languages[j].Size
	})
}

func accumulateLanguage(repos []Repo) (map[string]int, map[string]int) {
	var lm = make(map[string]int)
	var gt = make(map[string]int)

	for i, r := range repos {
		B, err := MakeRESTRequest(r.LanguagesURL, nil)
		if err != nil {
			fmt.Println(err)
			continue
		}
		var repoLanguages map[string]int

		if err := json.Unmarshal(B, &repoLanguages); err != nil {
			fmt.Println(err)
			continue
		}
		for language, size := range repoLanguages {
			if language == r.Language {
				lm[r.Language] += size
				if i <= 7 {
					gt[r.Language] += size
				}
			}
		}
		repos[i].Languages = repoLanguages
	}
	return lm, gt
}

func GetTechStack(repos []Repo) TechStack {
	lm, gt := accumulateLanguage(repos)
	var languages []Language
	total := 0
	for language, size := range lm {
		languages = append(languages, Language{Name: language, Size: size})
		total += size
	}
	sortLanguages(languages)
	for i := range languages {
		languages[i].Percentage = float64(languages[i].Size) / float64(total) * 100
	}

	var growthTrend []Language
	total = 0
	for language, size := range gt {
		growthTrend = append(growthTrend, Language{Name: language, Size: size})
		total += size
	}
	sortLanguages(growthTrend)
	for i := range growthTrend {
		growthTrend[i].Percentage = float64(growthTrend[i].Size) / float64(total) * 100
	}

	return TechStack{Languages: languages, GrowthTrend: growthTrend[:min(3, len(growthTrend))]}
}

func TopRepos(repos []Repo) []TopRepo {
	ans := make([]TopRepo, 0, len(repos))
	for _, repo := range repos {
		topRepos := TopRepo{
			Name:        repo.Name,
			Description: repo.Description,
			Stars:       repo.StargazersCount,
			ForkCount:   repo.ForksCount,
			Fork:        repo.Fork,
			Languages:   repo.Languages,
			Language:    repo.Language,
			Url:         repo.Url,
			UpdatedAt:   repo.UpdatedAt,
			CreatedAt:   repo.CreatedAt,
			Owner: struct {
				Login  string `json:"login"`
				Avatar string `json:"avatar_url"`
				Url    string `json:"html_url"`
				Type   string `json:"type"`
			}{
				Login:  repo.Owner.Login,
				Avatar: repo.Owner.Avatar,
				Url:    repo.Owner.Url,
				Type:   repo.Owner.Type,
			},
			Watchers: repo.WatchersCount,
			License: struct {
				Name string `json:"name"`
			}{
				Name: repo.License.Name,
			},
			Homepage: repo.Homepage,
		}
		ans = append(ans, topRepos)
	}
	sort.SliceStable(ans, func(i, j int) bool {
		// Sort by stars (descending)
		if ans[i].Stars != ans[j].Stars {
			return ans[i].Stars > ans[j].Stars
		}

		// If stars are equal, sort by watchers (descending)
		if ans[i].Watchers != ans[j].Watchers {
			return ans[i].Watchers > ans[j].Watchers
		}

		// If watchers are equal, sort by forks (descending)
		if ans[i].ForkCount != ans[j].ForkCount {
			return ans[i].ForkCount > ans[j].ForkCount
		}

		// If all are equal, maintain original order (which is by updated_at)
		return false
	})

	return ans[:min(5, len(ans))]
}

func GetOpenSourceContributions(un string) (*OpenSource, error) {
	url := fmt.Sprintf("%s/search/issues?q=author:%s+type:pr+is:merged&sort=updated&order=desc&per_page=6&page=1", GitHubRESTBaseURL, un)
	data, err := MakeRESTRequest(url, nil)
	if err != nil {
		return nil, err
	}

	var contributions OpenSource
	if err := json.Unmarshal(data, &contributions); err != nil {
		fmt.Println(err)
		return nil, err
	}
	return &contributions, nil
}

func classifyCodingHabit(events []Events) string {
	now := time.Now()
	const (
		fifteenDays = 15 * 24 * time.Hour
		thirtyDays  = 30 * 24 * time.Hour
	)

	var (
		recent15Count int
		recent30Count int
		allWithin15   = true
		timeBuckets   = map[string]int{
			"Night Owl":        0,
			"Early Bird":       0,
			"Sun Chaser":       0,
			"Evening Wanderer": 0,
		}
	)

	for _, e := range events {
		createdAtTime, err := time.Parse(time.RFC3339, e.CreatedAt)
		if err != nil {
			fmt.Println("Error parsing time:", err)
			continue
		}
		age := now.Sub(createdAtTime)
		if age > fifteenDays {
			allWithin15 = false
		} else {
			recent15Count++
		}

		if age <= thirtyDays {
			recent30Count++
		}

		// Categorize by time of day
		createdAtTime, err = time.Parse(time.RFC3339, e.CreatedAt)
		if err != nil {
			fmt.Println("Error parsing time:", err)
			continue
		}
		hour := createdAtTime.Hour()
		switch {
		case hour >= 22 || hour < 4:
			timeBuckets["Night Owl"]++
		case hour >= 4 && hour < 10:
			timeBuckets["Early Bird"]++
		case hour >= 10 && hour < 16:
			timeBuckets["Sun Chaser"]++
		case hour >= 16 && hour < 22:
			timeBuckets["Evening Wanderer"]++
		}
	}
	// If all events are within 15 days, classify by active time-of-day habit
	if allWithin15 && len(events) > 0 {
		maxCategory := ""
		maxCount := 0
		for category, count := range timeBuckets {
			if count > maxCount {
				maxCategory = category
				maxCount = count
			}
		}
		return maxCategory
	}

	if recent15Count < 10 {
		return "Code Sleeper"
	}
	if recent30Count < 10 {
		return "Frozen Dev"
	}
	return "Repo Ghost"
}

func GetRecentActivity(username string, pc *ProfileCard) ([]Events, error) {
	url := fmt.Sprintf("%s/users/%s/events?per_page=50&page=1", GitHubRESTBaseURL, username)
	eventsData, err := MakeRESTRequest(url, nil)
	if err != nil {
		return nil, err
	}

	var events []Events
	if err := json.Unmarshal(eventsData, &events); err != nil {
		return nil, err
	}

	pc.CodingHabit = classifyCodingHabit(events)
	return events[:min(5, len(events))], nil
}

func GetContributions(un string) (*GraphQLResponse, error) {
	query := `
		query {
			user(login: "` + un + `") {
				contributionsCollection {
					contributionCalendar {
						totalContributions
						weeks {
							contributionDays {
								date
								contributionCount
								color
							}
						}
					}
				}
			}
		}`

	data, err := MakeGraphqlRequest(GitHubGraphqlBaseURL, query)
	if err != nil {
		return nil, err
	}
	var contributions GraphQLResponse
	if err := json.Unmarshal(data, &contributions); err != nil {
		return nil, err
	}
	return &contributions, nil
}
