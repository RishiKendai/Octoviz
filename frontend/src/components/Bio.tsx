import { JSX } from 'react'

import './bio.css'
import type { Bio } from './types/bio'
import { formatNumber } from './utils/helper'


function TextWrapper({ title, value }: { title: string, value: string | null }): JSX.Element {
    return (
        <div className='txt-wrapper'>
            <span>
                <span>{value || 'N/A'}</span>
            </span>
            <p className='bg-[#7407fc35] w-fit px-1.5 py-0.5 text-[#9198a1]'>{title}</p>
        </div>
    )
}

function Bio({ bio }: { bio: Bio }): JSX.Element {
    return (
        <div className='bio card-dark card md:sticky top-1.5 md:min-w-[260px]'>
            <h5 className="mb-6">User Bio</h5>
            <TextWrapper title='Name' value={bio.name} />
            <TextWrapper title='Bio' value={bio.bio} />
            <TextWrapper title='Company' value={bio.company} />
            <TextWrapper title='Email' value={bio.email} />
            <TextWrapper title='Portfolio' value={bio.portfolio} />
            <TextWrapper title='Followers' value={formatNumber(bio.followers)} />
            <TextWrapper title='Following' value={formatNumber(bio.following)} />
            <TextWrapper title='Public Gists' value={formatNumber(bio.public_gists)} />
            <TextWrapper title='Starred Repos' value={formatNumber(bio.starred_repos)} />
        </div>
    )
}

export default Bio