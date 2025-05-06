import moment from 'moment'
import './contribution.css'
import { ContributionProps, Item } from './types/contribution'

function Contribution({ contribution }: { contribution: ContributionProps }) {
  if (!contribution || !contribution.items.length) return (
    <div className="card mb-6">
      <h5 className='mb-6'>Recent Contribution</h5>
      <p className="text-center text-(--text-light-100) text-sm">No contribution yet...</p>
    </div>

  )

  return (
    <div className="card mb-6">
      <h5 className='mb-6'>Recent Contribution</h5>
      <ul className="list">
        {contribution.items.map((item: Item, index: number) => {
          const repo = item.repository_url.split('repos/')[1]
          const repoURL = `https://github.com/${repo}`
          return (<li className="flex relative pb-5 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-white/10 before:content-['']" key={index}>
            <div className="timeline-badge">
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="event-dot-fill mb-2">
                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
              </svg>
            </div>
            <div className="timeline-body">
              <div className='timeline-timestamp'>Updated {moment(item.updated_at).fromNow()}</div>
              <div className="timeline-event">{item.title}</div>
              <div className='mt-0.5'>
                <span>
                  <a className='text-[#4493f8] hover:underline hover:underline-offset-4' href={repoURL}>{repo}</a>
                </span>
              </div>
              <div className='mt-2 flex flex-wrap gap-y-2'>
                <span className='mr-4 bg-[#7407FC86] capitalize text-white border border-[#3d444d] px-2 py-[3px] text-xs rounded-[0.375rem]'>{item.state}</span>
                <span className='text-sm/[18px] whitespace-nowrap text-(--text-light-100)'>Created on {moment(item.created_at).format('MMM D, YYYY')}</span>
              </div>
            </div>
          </li>)
        })}
      </ul>
    </div>
  )
}

export default Contribution
