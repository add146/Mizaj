import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Admin login
app.post('/login', async (c) => {
    const body = await c.req.json();
    const { email, password } = body;

    // Simple auth - in production use proper password hashing
    const admin = await c.env.DB.prepare(`
    SELECT * FROM admins WHERE email = ?
  `).bind(email).first();

    if (!admin) {
        return c.json({ error: 'Invalid credentials' }, 401);
    }

    // For demo, accept any password matching "admin123"
    // In production, use bcrypt to compare hashed passwords
    if (password !== 'admin123') {
        return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Generate simple token (in production use JWT)
    const token = btoa(JSON.stringify({ adminId: admin.id, email: admin.email, exp: Date.now() + 86400000 }));

    return c.json({
        token,
        admin: {
            id: admin.id,
            email: admin.email,
            name: admin.name
        }
    });
});

// Verify token
app.get('/verify', async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ valid: false }, 401);
    }

    try {
        const token = authHeader.substring(7);
        const decoded = JSON.parse(atob(token));

        if (decoded.exp < Date.now()) {
            return c.json({ valid: false, error: 'Token expired' }, 401);
        }

        return c.json({ valid: true, admin: { id: decoded.adminId, email: decoded.email } });
    } catch {
        return c.json({ valid: false }, 401);
    }
});

export default app;
