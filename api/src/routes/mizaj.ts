import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Get all mizaj types
app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(`
    SELECT * FROM mizaj_results
  `).all();
    return c.json(results);
});

// Get specific mizaj type info
app.get('/:type', async (c) => {
    const type = c.req.param('type');
    const result = await c.env.DB.prepare(`
    SELECT * FROM mizaj_results WHERE mizaj_type = ?
  `).bind(type).first();

    if (!result) {
        return c.json({ error: 'Mizaj type not found' }, 404);
    }

    return c.json(result);
});

// Update mizaj content (admin)
app.put('/:type', async (c) => {
    const type = c.req.param('type');
    const body = await c.req.json();

    await c.env.DB.prepare(`
    UPDATE mizaj_results 
    SET title = ?, description = ?, characteristics = ?, 
        dietary_recommendations = ?, lifestyle_recommendations = ?, image_url = ?
    WHERE mizaj_type = ?
  `).bind(
        body.title,
        body.description,
        body.characteristics,
        body.dietary_recommendations,
        body.lifestyle_recommendations,
        body.image_url,
        type
    ).run();

    return c.json({ message: 'Mizaj content updated' });
});

export default app;
