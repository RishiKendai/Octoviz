import { JSX } from 'react'

import './bio.css'
import moment from 'moment'

function TextWrapper({ title, value }: { title: string, value: string | null }): JSX.Element {
    return (
        <div className='txt-wrapper'>
            <span>{value || 'N/A'}</span>
            <p className='bg-[#7407fc35] w-fit px-1.5 py-0.5 text-[#9198a1]'>{title}</p>
        </div>
    )
}

interface Bio {
    name: string,
    location: string,
    bio: string,
    company: string,
    email: string,
    portfolio: string,
    created_at: string,
    followers: number,
    following: number,
    public_repos: number,
    public_gists: number,
    starred_repos: number,
}

function Bio({ bio }: { bio: Bio }): JSX.Element {
    return (
        <div className='bio card sticky top-1.5 md:min-w-[260px]'>
            <h5 className="mb-6">User Bio</h5>
            <TextWrapper title='Name' value={bio.name} />
            <TextWrapper title='Location' value={bio.location} />
            <TextWrapper title='Bio' value={bio.bio} />
            <TextWrapper title='Company' value={bio.company} />
            <TextWrapper title='Email' value={bio.email} />
            <TextWrapper title='Portfolio' value={bio.portfolio} />
            <TextWrapper title='Followers' value={bio.followers.toString()} />
            <TextWrapper title='Following' value={bio.following.toString()} />
            <TextWrapper title='Public Repos' value={bio.public_repos.toString()} />
            <TextWrapper title='Public Gists' value={bio.public_gists.toString()} />
            <TextWrapper title='Starred Repos' value={bio.starred_repos.toString()} />
            <TextWrapper title='Joined' value={moment(bio.created_at).format("MMM DD, YYYY")} />
        </div>
    )
}

export default Bio