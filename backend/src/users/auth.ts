import { Request, Response, NextFunction } from 'express';

const exceptions = [
    { path: '/login', method: 'POST', exact: true },
    { path: '/users', method: 'POST', exact: true },
    { path: '/users/', method: 'GET', exact: false },
    { path: '/posts', method: 'GET', exact: false },
    { path: '/search', method: 'GET', exact: false },
    { path: '/songs/', method: 'GET', exact: false },
];

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.profile) {
        next();
    } else {
        for (const route of exceptions) {
            if ((!route.exact && req.path.startsWith(route.path) || req.path === route.path)
                && req.method === route.method) {
                next();
                return;
            }
        }
        res.status(401).send('Not logged in');
    }
}