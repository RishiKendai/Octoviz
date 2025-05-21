
import { JSX } from 'react';
import './profileCard.css'
import type { ProfileCard } from './types/profileCard';
import GhProfile from '../assets/gh-profile.png';
import moment from 'moment';
import { formatNumber } from './utils/helper';

const codingStyleInfo = {
    'Night Owl':
    {
        title: 'Most activity between 10 PM – 4 AM',
        description: 'You tend to be most productive late at night, often working during quiet hours.'
    },
    'Early Bird':
    {
        title: 'Most activity between 4 AM – 10 AM',
        description: "You're an early riser and prefer to start your day with coding before most people are awake."
    },
    'Sun Chaser':
    {
        title: 'Most activity between 10 AM – 4 PM',
        description: "You follow the typical daytime schedule for coding, working during regular business hours."
    },
    'Evening Wanderer':
    {
        title: 'Most activity between 4 PM – 10 PM',
        description: "Your coding sessions are mostly in the evening, where you find your energy to be the highest."
    },
    'Frozen Dev':
    {
        title: 'Low activity (30 days)',
        description: "You haven't been active much lately—your development activity has been frozen for a while."
    },
    'Code Sleeper':
    {
        title: 'Low activity (15 days)',
        description: `You've been somewhat active, but your recent activity has slowed down—a bit like "sleeping" from coding.`
    },
    'Repo Ghost':
    {
        title: 'Active but scattered',
        description: `Are you still active, but your coding times and consistency are unclear, like a "ghost" who haunts the repo.`
    }
}


function ProfileCard({ profile }: { profile: ProfileCard }): JSX.Element {
    return (
        <div className='mb-6 flex flex-col'>
            <h5 className="title text-white font-semibold text-[38px] text-center mb-3"><span>Dev</span> Profile</h5>
            <div id="profileCard" className="profile-card mx-auto flex max-md:scale-90">
                <div data-layout="left" className='mr-2 overflow-hidden basis-[40%] shrink-1'>
                    <div className="avatar h-20 w-20 rounded-full overflow-hidden mb-2">
                        <img src={profile.avatar_url || GhProfile} alt="avatar" className='h-full w-full object-cover' />
                    </div>
                    <span className='flex items-start mb-1.5'>
                        <span>
                            <svg className="inline mr-1.5" fill='currentColor' viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path></svg>
                        </span>
                        <span className='text-xs leading-6'>{profile.location || 'Somewhere on Earth'}</span>
                    </span>
                    <span className='flex bg-white text-black w-fit rounded-lg border border-gray-400 px-2.5 py-1 items-center'>
                        <span>
                            <svg height="22" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="22" data-view-component="true" className="mr-2 inline">
                                <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z"></path>
                            </svg>
                        </span>
                        <a href={profile.github_link} className="text-sm font-medium leading-[24px]">GitHub</a>
                    </span>
                </div>
                <div data-layout="right" className="basis-[60%]">
                    <h6 className='mb-0 text-lg'>{profile.name || '<Undefined />'}</h6>
                    <span className='block mb-1.5 wrap-break-word text-xs text-(--text-light-100)'>@{profile.aka}</span>
                    <span className='text-md font-semibold text-(--clr-accent)'>
                        {profile.coding_habit}
                        <svg className='inline ml-2 font-bold relative coding-habit-icon' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
                            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(3,3)"><path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM25,11c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3zM21,21v2h1h1v13h-1h-1v2h1h1h4h1h1v-2h-1h-1v-15h-1h-4z"></path></g></g>
                        </svg>

                        <span className='coding-style-info'>
                            <span className='title'>{codingStyleInfo[profile.coding_habit as keyof typeof codingStyleInfo].title}</span>
                            <span className='description'>{codingStyleInfo[profile.coding_habit as keyof typeof codingStyleInfo].description}</span>
                        </span>
                    </span>
                    <div className='flex mt-4'>
                        <span className='border-r border-[#9198a136] pr-3'>
                            <span className='block text-base'>{formatNumber(profile.repos)}</span>
                            <span className='text-xs text-(--text-light-100)'>Repositories</span>
                        </span>
                        <span className='pl-3'>
                            <span className='block text-base'>{moment(profile.joined).format('MMM DD, YYYY')}</span>
                            <span className='text-xs text-(--text-light-100)'>Joined</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard