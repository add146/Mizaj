import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Get all site content
app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(`
    SELECT key, value, type FROM site_content
  `).all();

    // Convert to object for easier frontend usage
    const content: Record<string, string> = {};
    for (const row of results as { key: string; value: string }[]) {
        content[row.key] = row.value;
    }

    return c.json(content);
});

// Get single content item
app.get('/:key', async (c) => {
    const key = c.req.param('key');
    const result = await c.env.DB.prepare(`
    SELECT value, type FROM site_content WHERE key = ?
  `).bind(key).first();

    if (!result) {
        return c.json({ error: 'Content not found' }, 404);
    }

    return c.json(result);
});

// Update content item (admin)
app.put('/:key', async (c) => {
    const key = c.req.param('key');
    const body = await c.req.json();
    const { value, type = 'text' } = body;

    // Upsert - insert or update
    await c.env.DB.prepare(`
    INSERT INTO site_content (key, value, type, updated_at)
    VALUES (?, ?, ?, unixepoch())
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, type = excluded.type, updated_at = unixepoch()
  `).bind(key, value, type).run();

    return c.json({ key, value, message: 'Content updated' });
});

// Batch update multiple content items (admin)
app.put('/', async (c) => {
    const body = await c.req.json();
    const items: { key: string; value: string; type?: string }[] = body.items;

    for (const item of items) {
        await c.env.DB.prepare(`
      INSERT INTO site_content (key, value, type, updated_at)
      VALUES (?, ?, ?, unixepoch())
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, type = excluded.type, updated_at = unixepoch()
    `).bind(item.key, item.value, item.type || 'text').run();
    }

    return c.json({ message: `${items.length} items updated` });
});

// Delete content item (admin)
app.delete('/:key', async (c) => {
    const key = c.req.param('key');
    await c.env.DB.prepare('DELETE FROM site_content WHERE key = ?').bind(key).run();
    return c.json({ message: 'Content deleted' });
});

export default app;
