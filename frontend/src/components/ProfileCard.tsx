
import { JSX } from 'react';
import './profileCard.css'

interface Profile {
    name: string;
    location: string;
    avatar_url: string;
    coding_habit: string;
    github_link: string;
}

function ProfileCard({ profile }: { profile: Profile }): JSX.Element {
    return (
        <div className='mb-6 flex flex-col'>
            <h5 className="title text-white font-semibold text-[38px] text-center mb-3"><span>Dev</span> Profile</h5>
            <div id="profileCard" className="profile-card mx-auto">
                <h5 className="text-(--clr-accent) font-semibold text-center mb-4">Dev Card</h5>
                <div className="flex">
                    <div className="left flex-1 flex flex-col justify-center">
                        <p className="text-white text-sm leading-[24px]">{profile.name}</p>
                        <p className="text-white text-sm leading-[24px]">{profile.location}</p>
                        <a href={profile.github_link} className="text-[#4493f8] text-sm leading-[24px]">GitHub Link</a>
                    </div>
                    <div className="right">
                        <div className="avatar h-20 w-20 rounded-full overflow-hidden mb-2">
                            <img src={profile.avatar_url} alt="avatar" className='h-full w-full object-cover' />
                        </div>
                        <span>{profile.coding_habit}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard