import ReactGA from 'react-ga4';

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID

export const initGA = (): void => {
    ReactGA.initialize(GA4_MEASUREMENT_ID);
};

export const trackPageView = (path: string): void => {
    ReactGA.send({ hitType: 'pageview', page: path });
};