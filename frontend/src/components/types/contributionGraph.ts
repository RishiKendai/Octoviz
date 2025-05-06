export type ContributionGraphProps = {
    data: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: {
                        contributionDays: {
                            contributionCount: number;
                            date: string;
                            color: string;
                        }[];
                    }[];
                }
            }
        }
    }
}