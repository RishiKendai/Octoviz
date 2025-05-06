export type Item = {
    created_at: string,
    repository_url: string,
    state: string,
    title: string,
    updated_at: string,
    user: {
        login: string,
    }
}

export type ContributionProps = {
    incomplete_results: boolean,
    items: Item[],
    total_count: number,
}
