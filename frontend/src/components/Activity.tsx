import { CreateEventPayload, ForkEventPayload, GitHubEvent, IssuesEventPayload, PullRequestEventPayload, PushEventPayload } from './activityTypes'
import moment from 'moment';

import './activity.css'

function Activity({ activity }: { activity: GitHubEvent[] }) {
    return (
        <div className='flex flex-col card transparent'>
            <h5 className='mb-6'>Recent Activity</h5>
            <ul className='list'>
                {
                    activity.map((event: GitHubEvent, index: number) => {
                        return (
                            <li className='timeline-item' key={index}>
                                <div className='timeline-badge'>
                                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="event-dot-fill mb-2">
                                        <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                                    </svg>
                                </div>
                                <EventItem event={event} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Activity

interface Props {
    event: GitHubEvent
}


const EventItem: React.FC<Props> = ({ event }) => {
    switch (event.type) {
        case "CreateEvent": {
            const payload = event.payload as CreateEventPayload;
            return (
                <div className='timeline-body'>
                    <div className="timeline-timestamp">{moment(event.created_at).fromNow()}</div>
                    <div className='timeline-event'>{event.actor.login} created {payload.ref_type} {payload.ref ? payload.ref + ' in ' : ''} {event.repo.name}</div>
                </div>
            )
        }
        case "PushEvent": {
            const payload = event.payload as PushEventPayload;
            return (
                <div className="timeline-body">
                    <div className="timeline-timestamp">{moment(event.created_at).fromNow()}</div>
                    <div className='timeline-event'>{event.actor.login} pushed {payload.commits.length} commits to {event.repo.name}</div>
                </div>
            )
        }

        case "PullRequestEvent": {
            const payload = event.payload as PullRequestEventPayload;
            return (
                <div className="timeline-body">
                    <div className="timeline-timestamp">{moment(event.created_at).fromNow()}</div>
                    <div className='timeline-event'>{event.actor.login} {payload.action} pull request: {payload.pull_request.title}</div>
                </div>
            )
        }

        case "IssuesEvent": {
            const payload = event.payload as IssuesEventPayload
            return (
                <div className="timeline-body">
                    <div className="timeline-timestamp">{moment(event.created_at).fromNow()}</div>
                    <div className='timeline-event'>{event.actor.login} {payload.action} issue: {payload.issue.title}</div>
                </div>
            )
        }

        case "ForkEvent": {
            const payload = event.payload as ForkEventPayload
            return (
                <div className="timeline-body">
                    <div className="timeline-timestamp">{moment(event.created_at).fromNow()}</div>
                    <div className='timeline-event'>{event.actor.login} forked repo to {payload.forkee.full_name}</div>
                </div>
            )
        }

        case "WatchEvent": {
            return (
                <div className="timeline-body">
                    <div className="timeline-timestamp">{moment(event.created_at).fromNow()}</div>
                    <div className='timeline-event'>{event.actor.login} starred {event.repo.name}</div>
                </div>

            )
        }

        default:
            return (
                <div className="timeline-body">
                    <div className="timeline-timestamp">{moment(event.created_at).fromNow()}</div>
                    <div className='timeline-event'>{event.actor.login} did something on {event.repo.name}</div>
                </div>
            )
    }
};
