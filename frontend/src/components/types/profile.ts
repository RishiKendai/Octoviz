import { GitHubEvent } from './activity'
import { Bio } from './bio'
import { ContributionProps } from './contribution'
import { ContributionGraphProps } from './contributionGraph'
import { ProfileCard } from './profileCard'
import { TechStack } from './techStack'
import { TopRepo } from './topRepos'

export type Profile = {
    action: null | string,
    status: string,
    data: {
        activities: GitHubEvent[],
        bio: Bio,
        contributions: ContributionGraphProps,
        openSourceContributions: ContributionProps,
        profile: ProfileCard,
        techStack: TechStack,
        topRepos: TopRepo[],
    }
}