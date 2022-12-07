// Routing for application, add pages and urls here
// Look up best solutions for routes and implement with templates in mind

export const routes = {
register: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
login: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
getVaults: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getvaults`,
logout: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
};