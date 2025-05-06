import { PieChart } from '@mui/x-charts/PieChart';
import { defaults } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

import languageColors from '../data/colors.json';
import './techStack.css'
import type { Language, TechStack } from './types/techStack';

defaults.maintainAspectRatio = false
defaults.responsive = true
defaults.plugins.title.display = true
defaults.plugins.title.align = 'start'
defaults.plugins.title.color = 'black'
defaults.plugins.title.font = {
    size: 16,
    weight: 600
}

function Language({ languages }: { languages: Language[] }) {

    if (!languages || !languages.length) {
        return (
            <div className='card mb-6'>
                <h5 className='mb-6'>Most used languages</h5>
                <p className='text-center text-(--text-light-100) text-sm'>No languages found</p>
            </div>
        )
    }

    const data = languages.map((lang: Language) => {
        return {
            id: lang.name,
            value: lang.percentage,
            label: lang.name
        }
    })
    data.length = 10
    const colors = languages.map(language => languageColors[language.name as keyof typeof languageColors] || '--clr-secondary');
    return (
        <div className='card mb-6'>
            <h5>Most used languages</h5>
            <PieChart
                colors={colors}
                series={[
                    {
                        data,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        paddingAngle: 4,
                    }
                ]}
                width={200}
                height={200}

            />
        </div>
    )
}


function GrowthTrend({ languages }: { languages: Language[] }) {
    if (!languages || !languages.length) {
        return (
            <div className='card'>
                <h5 className='mb-6'>Growth trend</h5>
                <p className='text-center text-(--text-light-100) text-sm'>No growth trend found</p>
            </div>
        )
    }
    languages.sort((a, b) => a.percentage - b.percentage)
    const xAxis = languages.map((lang: Language) => lang.name)
    const data = languages.map((lang: Language) => lang.size)

    return (
        <div className='card'>
            <div className="chart-wrapper h-[300px]">
                <Line
                    height={300}
                    width={400}
                    data={{
                        labels: xAxis,
                        datasets: [
                            {
                                label: 'Bytes used',
                                data: data,
                                borderColor: '#7407FC',
                                backgroundColor: '#7407FC',
                            },
                        ],
                    }}
                    options={{
                        backgroundColor: '#fff',
                        elements: {
                            line: {
                                backgroundColor: '#fff',
                                tension: 0.4,
                            }
                        },
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top' as const,
                            },
                            title: {
                                display: true,
                                text: 'Growth trend',
                                color: '#fff',
                            }
                        },
                        scales: {
                            y: {
                                stacked: true,
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

function TechStack({ techStack }: { techStack: TechStack }) {
    return (
        <>
            <Language languages={techStack.languages} />
            <GrowthTrend languages={techStack.growth_trend} />
        </>
    )
}

export default TechStack