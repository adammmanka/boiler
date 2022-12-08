import {routes} from './routes';

export const fetcher = async (url: string) => {
    const res = await fetch(routes.getVaults, {
        method: 'GET',
    });
    const data = await res.json();
    return data;
};