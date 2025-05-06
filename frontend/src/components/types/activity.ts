export interface GitHubEventBase {
    id: string;
    type: string;
    actor: {
        id: number;
        login: string;
        display_login?: string;
        avatar_url: string;
        url: string;
    };
    repo: {
        id: number;
        name: string;
        url: string;
    };
    payload: PushEventPayload | PullRequestEventPayload | IssuesEventPayload | ForkEventPayload | WatchEventPayload; // narrowed below
    public: boolean;
    created_at: string;
}

export interface CreateEventPayload {
    ref: string;           // branch or tag name
    ref_type: "repository" | "branch" | "tag";
    master_branch: string;
    description: string;
}

export interface PushEventPayload {
    ref: string;
    before: string;
    head: string;
    commits: {
        sha: string;
        message: string;
        url: string;
        author: {
            email: string;
            name: string;
        };
    }[];
}

export interface PullRequestEventPayload {
    action: string;
    number: number;
    pull_request: {
        url: string;
        id: number;
        title: string;
        user: {
            login: string;
            avatar_url: string;
        };
        merged: boolean;
        state: string;
    };
}

export interface IssuesEventPayload {
    action: string;
    issue: {
        number: number;
        title: string;
        url: string;
        user: {
            login: string;
            avatar_url: string;
        };
        state: string;
    };
}

export interface ForkEventPayload {
    forkee: {
        full_name: string;
        html_url: string;
    };
}

export interface WatchEventPayload {
    action: "started";
}

export type GitHubEvent =
    | (GitHubEventBase & { type: "CreateEvent"; payload: CreateEventPayload })
    | (GitHubEventBase & { type: "PushEvent"; payload: PushEventPayload })
    | (GitHubEventBase & { type: "PullRequestEvent"; payload: PullRequestEventPayload })
    | (GitHubEventBase & { type: "IssuesEvent"; payload: IssuesEventPayload })
    | (GitHubEventBase & { type: "ForkEvent"; payload: ForkEventPayload })
    | (GitHubEventBase & { type: "WatchEvent"; payload: WatchEventPayload })
    | GitHubEventBase; // fallback for unknown event types
