export function formatNumber(num: number): string {
    const ranges = [
        { divider: 1_000_000_000_000, suffix: 'T' },
        { divider: 1_000_000_000, suffix: 'B' },
        { divider: 1_000_000, suffix: 'M' },
        { divider: 1_000, suffix: 'k' }
    ];

    for (const range of ranges) {
        if (num >= range.divider) {
            return (num / range.divider).toFixed(1).replace(/\.0$/, '') + range.suffix;
        }
    }

    return num.toString();
}
