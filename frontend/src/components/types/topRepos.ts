export type TopRepo = {
    name: string;
    description: string;
    forks_count: number;
    fork: boolean;
    html_url: string;
    language: string;
    languages: {
        [key: string]: number
    }
    stargazers_count: number;
    watchers_count: number;
    updated_at: string;
    created_at: string;
    license: {
        name: string
    };
    homepage: string
}