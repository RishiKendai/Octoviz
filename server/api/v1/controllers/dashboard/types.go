package dashboard

type PayloadStruct struct {
	GithubUser string `json:"github_user"`
}

type User struct {
	AKA         string `json:"login"`
	Name        string `json:"name"`
	Location    string `json:"location"`
	Email       string `json:"email"`
	Bio         string `json:"bio"`
	AvatarURL   string `json:"avatar_url"`
	HTMLURL     string `json:"html_url"`
	Type        string `json:"type"`
	Visibility  string `json:"user_view_type"`
	Portfolio   string `json:"blog"`
	PublicRepos int    `json:"public_repos"`
	Followers   int    `json:"followers"`
	Following   int    `json:"following"`
	Company     string `json:"company"`
	Joined      string `json:"created_at"`
	PublicGists int    `json:"public_gists"`
}

type ProfileCard struct {
	Name        string `json:"name"`
	Avatar      string `json:"avatar_url"`
	CodingHabit string `json:"coding_habit"`
	Score       int    `json:"score"`
	Location    string `json:"location"`
	GithubLink  string `json:"github_link"`
	AKA         string
}

type Gists struct {
	Name string `json:"name"`
}

type Starred struct {
	Name       string `json:"name"`
	Link       string `json:"html_url"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
	CloneURL   string `json:"clone_url"`
	StarCount  int    `json:"stargazers_count"`
	OpenIssues int    `json:"open_issues_count"`
	Language   string `json:"language"`
	Owner      struct {
		Name   string `json:"login"`
		Avatar string `json:"avatar_url"`
		URL    string `json:"html_url"`
		Type   string `json:"type"`
	} `json:"owner"`
}
type Bio struct {
	Name         string  `json:"name"`
	Bio          string  `json:"bio"`
	Location     string  `json:"location"`
	Company      string  `json:"company"`
	Email        string  `json:"email"`
	Portfolio    string  `json:"blog"`
	Followers    int     `json:"followers"`
	Following    int     `json:"following"`
	Joined       string  `json:"created_at"`
	PublicRepos  int     `json:"public_repos"`
	PublicGists  int     `json:"public_gists"`
	StarredRepos int     `json:"starred_repos"`
	ProfileScore float64 `json:"profile_score"`
}

type Language struct {
	Name       string  `json:"name"`
	Size       int     `json:"size"`
	Percentage float64 `json:"percentage"`
}

type TechStack struct {
	Languages   []Language `json:"languages"`
	GrowthTrend []Language `json:"growth_trend"`
}

type TopRepo struct {
	Name  string `json:"name"`
	Owner struct {
		Login  string `json:"login"`
		Avatar string `json:"avatar_url"`
		Url    string `json:"html_url"`
		Type   string `json:"type"`
	} `json:"owner"`
	Url         string         `json:"html_url"`
	Description string         `json:"description"`
	Stars       int            `json:"stargazers_count"`
	ForkCount   int            `json:"forks_count"`
	Fork        bool           `json:"fork"`
	Watchers    int            `json:"watchers_count"`
	Languages   map[string]int `json:"languages"`
	Language    string         `json:"language"`
	CreatedAt   string         `json:"created_at"`
	UpdatedAt   string         `json:"updated_at"`
	License     struct {
		Name string `json:"name"`
	} `json:"license"`
}

type CommitsAndForks struct {
	Commits []string `json:"commits"`
	Forks   []string `json:"forks"`
}

type RecentActivity struct {
	Activity []string `json:"activity"`
}

type Repo struct {
	Name  string `json:"name"`
	Owner struct {
		Login  string `json:"login"`
		Avatar string `json:"avatar_url"`
		Url    string `json:"html_url"`
		Type   string `json:"type"`
	} `json:"owner"`
	Url             string `json:"html_url"`
	Description     string `json:"description"`
	Fork            bool   `json:"fork"`
	LanguagesURL    string `json:"languages_url"`
	CreatedAt       string `json:"created_at"`
	UpdatedAt       string `json:"updated_at"`
	Size            int    `json:"size"`
	StargazersCount int    `json:"stargazers_count"`
	WatchersCount   int    `json:"watchers_count"`
	ForksCount      int    `json:"forks_count"`
	OpenIssuesCount int    `json:"open_issues_count"`
	Language        string `json:"language"`
	Languages       map[string]int
	License         struct {
		Name string `json:"name"`
	} `json:"license"`
}

type Events struct {
	Type  string `json:"type"`
	Actor struct {
		Login  string `json:"login"`
		Name   string `json:"display_login"`
		Avatar string `json:"avatar_url"`
	} `json:"actor"`
	Repo struct {
		Name string `json:"name"`
		Url  string `json:"url"`
	} `json:"repo"`
	Payload   any    `json:"payload"`
	CreatedAt string `json:"created_at"`
}

type OpenSource struct {
	TotalCount        int  `json:"total_count"`
	InCompleteResults bool `json:"incomplete_results"`
	Items             []struct {
		RepoURL string `json:"repository_url"`
		Title   string `json:"title"`
		User    struct {
			Login string `json:"login"`
		} `json:"user"`
		State     string `json:"state"`
		CreatedAt string `json:"created_at"`
		UpdatedAt string `json:"updated_at"`
	} `json:"items"`
}

type ContributionDay struct {
	Date              string `json:"date"`
	ContributionCount int    `json:"contributionCount"`
	Color             string `json:"color"`
}

type Week struct {
	ContributionDays []ContributionDay `json:"contributionDays"`
}

type ContributionCalendar struct {
	TotalContributions int    `json:"totalContributions"`
	Weeks              []Week `json:"weeks"`
}

type ContributionsCollection struct {
	ContributionCalendar ContributionCalendar `json:"contributionCalendar"`
}

type UserData struct {
	ContributionsCollection ContributionsCollection `json:"contributionsCollection"`
}

type GraphQLResponse struct {
	Data struct {
		User UserData `json:"user"`
	} `json:"data"`
}
