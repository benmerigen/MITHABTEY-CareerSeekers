/**
 * This file contains the mapping of job fields to their hebrew translation and color.
 * The color is used to color the job field in the job field filter.
 */
export const jobFields: { [key: string]: { hebrew: string; color: string } } = {
    'Business': {
        hebrew: 'עסקים',
        color: 'rgba(117,169,255,0.6)',
    },
    'Outdoor': {
        hebrew: 'עבודה בחוץ',
        color: 'rgba(208,129,222,0.6)',
    },
    'Technology': {
        hebrew: 'טכנולוגיה',
        color: 'rgba(148,223,215,0.6)',
    },
    'General Culture': {
        hebrew: 'תרבות ',
        color: 'rgba(247,127,167,0.6)',
    },
    'Science': {
        hebrew: 'מדע',
        color: 'rgba(255,206,86,0.6)',
    },
    'Organization': {
        hebrew: 'אירגון',
        color: 'rgba(75,192,192,0.6)',
    },
    'Service': {
        hebrew: 'מתן שירות',
        color: 'rgba(153,102,255,0.6)',
    },
    'Arts And Entertainment': {
        hebrew: 'אומנות ובידור',
        color: 'rgba(255,159,64,0.6)',
    },
};
