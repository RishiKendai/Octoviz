
import moment from 'moment'
import './ContributionGraph.css'
import { ContributionGraphProps } from './types/contributionGraph';
import { formatNumber } from './utils/helper';

// Define the days of the week
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatDate = (date: string) => moment(date).format("MMMM Do")

function ContributionGraph({ contribution }: { contribution: ContributionGraphProps }) {
    const { weeks } = contribution.data.user.contributionsCollection.contributionCalendar;

    const monthPair: [string, number][] = []

    let currentMonth = new Date(contribution.data.user.contributionsCollection.contributionCalendar.weeks[0].contributionDays[0].date).getMonth() + 1
    let currentSpan = 0;
    const yearCounts: Record<number, number> = {};

    contribution.data.user.contributionsCollection.contributionCalendar.weeks.forEach((week, i) => {
        for (let j = 0; j < week.contributionDays.length; j++) {
            const date = new Date(week.contributionDays[j].date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            yearCounts[year] = (yearCounts[year] || 0) + 1;

            if (month === currentMonth) {
                continue;
            } else {
                const totalSpan = i - currentSpan;
                if (totalSpan > 0) {
                    monthPair.push([MONTHS[currentMonth - 1], totalSpan])
                }
                currentMonth = month;
                currentSpan = i;
            }
        }
    })

    const totalContributions = formatNumber(contribution.data.user.contributionsCollection.contributionCalendar.totalContributions || 0)
    const currentYear = new Date().getFullYear();
    const prevYear = currentYear - 1;

    const isCurrentYearDominant = (yearCounts[currentYear] || 0) >= (yearCounts[prevYear] || 0);
    const contributionLabel = isCurrentYearDominant
        ? 'Contributions this year'
        : 'Contributions in the last year';

    return (
        // <div className='card card-dark w-[733px] max-w-[733px]'>
        <div className='card card-dark mb-6 w-full overflow-x-auto md:w-fit lg:w-full md:mx-auto'>
            <div className='flex items-start sticky left-0 mb-6'>
                <h5 className='text-base'>{totalContributions} {contributionLabel}</h5>
                <span className='ml-auto px-2 py-[3px] border border-[#3d444d] rounded-[0.375rem] text-xs bg-[#212830] text-(--text-light-500)'>{new Date().getFullYear()}</span>
            </div>
            <table className='contribution-graph'>
                <thead className='mb-1 relative'>
                    <tr className='h-[13px] leading-[18px] relative'>
                        <td className='w-7'></td>
                        {
                            Array.from(monthPair.values()).map((month: [string, number], i) => {
                                return (
                                    <td className='w-7 text-xs bottom-[-3px]' colSpan={month[1]} key={i}>
                                        <span>{month[0]}</span>
                                    </td>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        [...Array(7).keys()].map((_, dayIndex) => {
                            return (
                                <tr key={dayIndex} className='h-2.5'>
                                    <td className='w-7 min-w-7 contribution-calendar-label'>
                                        <span style={{ clipPath: dayIndex & 1 ? 'none' : 'Circle(0)' }}>{DAYS[dayIndex]}</span>
                                    </td>
                                    {
                                        weeks.map((week, weekIndex) => {
                                            const day = week.contributionDays[dayIndex];
                                            if (!day) return ''
                                            const tooltipText = `${day.contributionCount > 0 ? day.contributionCount : "No"} contributions on ${formatDate(day.date)}`;
                                            return (
                                                <td title={tooltipText} key={weekIndex} className='contribution-calendar-day w-2.5 min-w-2.5' style={{ backgroundColor: day.color === '#ebedf0' ? '#CBCCCD18' : day.color, border: day.color === '#ebedf0' ? '0.5px solid #ffffff0d' : 'none' }}>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}

export default ContributionGraph