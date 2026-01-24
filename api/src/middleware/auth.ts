import { Context, Next } from 'hono';

export const authMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    try {
        const token = authHeader.substring(7);
        const decoded = JSON.parse(atob(token));

        if (decoded.exp < Date.now()) {
            return c.json({ error: 'Token expired' }, 401);
        }

        // Attach admin info to context if needed
        c.set('admin', decoded);

        await next();
    } catch (e) {
        return c.json({ error: 'Invalid token' }, 401);
    }
};
