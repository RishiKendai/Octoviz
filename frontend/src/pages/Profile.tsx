import { useQuery } from '@tanstack/react-query'
import ProfileCard from '../components/ProfileCard'
import Bio from '../components/Bio'
import Activity from '../components/Activity'
import TechStack from '../components/TechStack'

import './profile.css'
import TopRepo from '../components/TopRepo'
import ContributionGraph from '../components/ContributionGraph'
import Contribution from '../components/Contribution'

function Profile() {

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            // fetch('http://127.0.0.1:5673/profile/RishiKendai').then(
            fetch('https://c5t64pql-5673.inc1.devtunnels.ms/profile/RishiKendai').then(
                (res) => res.json(),
            ),
    })


    if (isLoading) return (
        <div className='flex flex-col align-center justify-center'>
            <span className="loader mb-2 mx-auto"></span>
            <p className='text-white'>Loading profile...</p>
        </div>
    )

    if (error) {
        return 'An error has occurred: ' + error
    }
    console.log(data)
    return (
        <>
            <main className='flex flex-col md:flex-row w-full'>
                <section data-layout-1 className='mr-2 w-100 flex-0 order-2 md:order-1 mb-6'>
                    <Bio bio={data.data.bio} />
                </section>
                <section data-layout-2 className='w-full md:w-100 flex-1 mr-2 order-1 md:order-2 mb-6'>
                    <div data-layout-2="layout1" className='flex flex-col overflow-hidden'>
                        <ContributionGraph contribution={data.data.contributions} />
                        <ProfileCard profile={data.data.profile} />
                        <TopRepo topRepos={data.data.topRepos} />
                        <Activity activity={data.data.activities} />
                    </div>
                </section>
                <section data-layout-3 className='md:w-100 flex-0 order-3 md:order-3'>
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