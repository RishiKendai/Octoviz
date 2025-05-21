import { useQuery } from '@tanstack/react-query'
import ProfileCard from '../components/ProfileCard'
import Bio from '../components/Bio'
import Activity from '../components/Activity'
import TechStack from '../components/TechStack'

import './profile.css'
import TopRepo from '../components/TopRepo'
import ContributionGraph from '../components/ContributionGraph.tsx'
import Contribution from '../components/Contribution'
import Notfound from './Notfound'
import { useParams } from 'react-router-dom'
import type { Profile } from '../components/types/profile'


const fetchData = async (github_user: string): Promise<Profile> => {
    const apiURL = import.meta.env.VITE_API_URL
    console.log(`${apiURL}/profile/${github_user}`)
    const response = await fetch(`${apiURL}/profile/${github_user}`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('User not found');
        } else {
            throw new Error(`Request failed: ${response.statusText}`);
        }
    }
    return response.json();
};

function Profile() {
    const { github_user } = useParams<{ github_user?: string }>();

    const queryKey = ['repoData', github_user];

    const { isLoading, error, data } = useQuery({
        queryKey,
        queryFn: () => fetchData(github_user!),
    })

    if (isLoading) return (
        <div className='fixed inset-0 flex flex-col items-center justify-center'>
            <div className='flex flex-col align-center justify-center'>
                <span className="loader mb-2 mx-auto"></span>
                <p className='text-white'>Loading profile...</p>
            </div>
        </div>
    )

    if (error || !data) {
        return <>
            <Notfound />
        </>
    }

    return (
        <>
            <main className='flex flex-col lg:flex-row w-full py-3 px-2 z-20'>
                <section data-layout-1 className='mr-2 w-100 flex-0 order-2 lg:order-1 mb-6'>
                    <Bio bio={data.data.bio} />
                </section>
                <section data-layout-2 className='w-full lg:w-100 flex-1 mr-2 order-1 lg:order-2 mb-6'>
                    <div data-layout-2="layout1" className='flex flex-col overflow-hidden'>
                        <ContributionGraph contribution={data.data.contributions} />
                        <ProfileCard profile={data.data.profile} />
                        <TopRepo topRepos={data.data.topRepos} />
                        <Activity activity={data.data.activities} />
                    </div>
                </section>
                <section data-layout-3 className='lg:w-100 flex-0 order-3 lg:order-3 min-w-[300px]'>
                    <div className='flex flex-col'>
                        <Contribution contribution={data.data.openSourceContributions} />
                        <TechStack techStack={data.data.techStack} />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Profile