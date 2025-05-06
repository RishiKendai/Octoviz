import moment from 'moment';
import languageColors from '../data/colors.json';
import type { TopRepo } from './types/topRepos';
import { formatNumber } from './utils/helper';

function TopRepo({ topRepos }: { topRepos: TopRepo[] }) {
    if (!topRepos || !topRepos.length) return (
        <div className='card mb-6 w-full'>
            <h5 className='text-lg mb-6'>Top Repositories</h5>
            <p className='text-center text-(--text-light-100) text-sm'>No such repositories found</p>
        </div>
    )
    topRepos.length = 5
    return (
        <div className='card mb-6 w-full'>
            <h5 className='text-lg'>Top Repositories</h5>
            <ul className='repos-list'>
                {
                    topRepos.map((repo: TopRepo, index: number) => {
                        return (
                            <li className={` flex repo-item py-6  ${index === topRepos.length - 1 ? '' : 'border-b border-[#ffffff1a]'}`} key={repo.html_url}>
                                <Repo repo={repo} />
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}

export default TopRepo


const Repo: React.FC<{ repo: TopRepo }> = ({ repo }) => {

    const formatDate = (date: string) => {
        const now = moment();
        const inputDate = moment(date);
        const diffInDays = now.diff(inputDate, 'days');

        if (diffInDays <= 30) {
            return `Updated ${inputDate.fromNow()}`;  // e.g., "Updated 5 days ago"
        } else {
            return `Updated on ${inputDate.format('MMM D, YYYY')}`; // e.g., "Updated on Nov 30, 2024"
        }
    }

    const getColorCode = (language: string) => {
        return languageColors[language as keyof typeof languageColors] || '--clr-secondary';
    }

    const language = (repo.language && repo.language.trim()) ||
        Object.keys(repo.languages ?? {})[0] ||
        ''
    return (
        <div className="repo-item flex flex-col justify-between items-start w-full">
            <div className="mb-2">
                <div className="repo-name">
                    <a className='text-xl wrap-anywhere text-[#4493f8] hover:underline hover:underline-offset-4' href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                    <span className="repo-visibility text-xs border border-[#3d444d] text-(--text-light-100) px-1.5 leading-[18px] rounded-full ml-1 mb-1">{repo.fork ? 'Forked' : 'Owner'}</span>
                </div>
                {repo.description && <div className="repo-description mt-2 mb-1 text-sm text-(--text-light-500)">{repo.description}</div>}
                {repo.homepage && <span className='text-sm  py-[3px] hover:text-[#4493f8] hover:underline hover:underline-offset-4 mr-2 leading-[21px] '>
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" fill='white' className="inline mr-2">
                        <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
                    </svg>
                    <a href={repo.homepage} className='w-fit' target="_blank" rel="noopener noreferrer">Homepage</a>
                </span>}
                <div className="block mt-2">
                    {language && <span className='repo-language-name mr-4'>
                        <span className="repo-language-color h-3 w-3 top-0.5 list-disc rounded-full border inline-block relative border-[#ffffff56] mr-1" style={{ backgroundColor: getColorCode(language) }}></span>
                        <span className="text-sm/[18px] text-(--text-light-100)">{language}</span>
                    </span>}
                    {repo.license.name &&
                        <span className="repo-license-name mr-4 list-disc inline-block text-sm/[18px] text-(--text-light-100)">
                            {/* <span className="mr-1"> */}
                            <svg className='mr-2 inline-block align-middle' aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" fill='currentColor' width="16" >
                                <path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"></path>
                            </svg>
                            {/* </span> */}
                            {repo.license.name}
                        </span>}
                    <span className="repo-updated-at text-sm/[18px] list-disc text-(--text-light-100)">{formatDate(repo.updated_at)}</span>
                </div>
            </div>
            <div className="repo-details flex flex-wrap">
                <span className="repo-watchers flex items-center justify-center px-2 py-[3px] border border-[#3d444d] rounded-[0.375rem] text-xs bg-[#212830] text-(--text-light-500) mr-2 leading-[21px] mb-2">
                    <span className='mr-1'>
                        <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16" fill="#9198a1" className="gh-icon gh-eye mr-2">
                            <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"></path></svg>
                    </span>
                    Watchers
                    <span className='ml-2 px-1.5 border border-[#3d444d] rounded-xl bg-[#2f3742] leading-[18px] h-5 text-center align-top'>{formatNumber(repo.watchers_count)}</span>
                </span>
                <span className="repo-forks flex items-center justify-center px-2 py-[3px] border border-[#3d444d] rounded-[0.375rem] text-xs bg-[#212830] text-(--text-light-500) mr-2 leading-[21px] mb-2">
                    <span className='mr-1'>
                        <svg aria-hidden="true" focusable="false" height="16" fill="#9198a1" viewBox="0 0 16 16" version="1.1" width="16" className="gh-icon gh-repo-forked mr-2">
                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                        </svg>
                    </span>
                    Forks
                    <span className='ml-2 px-1.5 border border-[#3d444d] rounded-xl bg-[#2f3742] leading-[18px] h-5 text-center align-top'>{formatNumber(repo.forks_count)}</span>
                </span>
                <span className="repo-stars flex items-center justify-center px-2 py-[3px] border border-[#3d444d] rounded-[0.375rem] text-xs bg-[#212830] text-(--text-light-500) mr-2 leading-[21px] mb-2">
                    <span className='mr-1'>
                        <svg aria-hidden="true" focusable="false" height="16" fill="#9198a1" viewBox="0 0 16 16" version="1.1" width="16" className="gh-icon gh-star d-inline-block mr-2">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                        </svg>
                    </span>
                    Stars
                    <span className='ml-2 px-1.5 border border-[#3d444d] rounded-xl bg-[#2f3742] leading-[18px] h-5 text-center align-top'>{formatNumber(repo.stargazers_count)}</span>
                </span>
            </div>
        </div>
    )
    {/* Repo name :Link  */ } {/* Stars >> Forks >> WatchersCount */ }
    {/* Description */ }
    {/* Language >> UpdatedAt */ }

}