import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Get all active questions with options
app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(`
    SELECT q.id, q.question_text, q.order_index, q.shuffle_options, q.is_active,
           o.id as option_id, o.mizaj_type, o.option_text
    FROM questions q
    LEFT JOIN options o ON q.id = o.question_id
    WHERE q.is_active = 1
    ORDER BY q.order_index, o.mizaj_type
  `).all();

    // Group options by question
    const questionsMap = new Map();
    for (const row of results) {
        if (!questionsMap.has(row.id)) {
            questionsMap.set(row.id, {
                id: row.id,
                question_text: row.question_text,
                order_index: row.order_index,
                shuffle_options: row.shuffle_options,
                is_active: !!row.is_active,
                options: []
            });
        }
        if (row.option_id) {
            questionsMap.get(row.id).options.push({
                id: row.option_id,
                mizaj_type: row.mizaj_type,
                option_text: row.option_text
            });
        }
    }

    return c.json(Array.from(questionsMap.values()));
});

// Admin ONLY routes below
app.use('*', authMiddleware);

// Get ALL questions (admin) including inactive
app.get('/all', async (c) => {
    const { results } = await c.env.DB.prepare(`
    SELECT q.id, q.question_text, q.order_index, q.shuffle_options, q.is_active,
           o.id as option_id, o.mizaj_type, o.option_text
    FROM questions q
    LEFT JOIN options o ON q.id = o.question_id
    ORDER BY q.order_index, o.mizaj_type
  `).all();

    // Group options by question
    const questionsMap = new Map();
    for (const row of results) {
        if (!questionsMap.has(row.id)) {
            questionsMap.set(row.id, {
                id: row.id,
                question_text: row.question_text,
                order_index: row.order_index,
                shuffle_options: row.shuffle_options,
                is_active: !!row.is_active,
                options: []
            });
        }
        if (row.option_id) {
            questionsMap.get(row.id).options.push({
                id: row.option_id,
                mizaj_type: row.mizaj_type,
                option_text: row.option_text
            });
        }
    }

    return c.json(Array.from(questionsMap.values()));
});

// Get single question
app.get('/:id', async (c) => {
    const id = c.req.param('id');
    const question = await c.env.DB.prepare(`
    SELECT * FROM questions WHERE id = ?
  `).bind(id).first();

    if (!question) {
        return c.json({ error: 'Question not found' }, 404);
    }

    const { results: options } = await c.env.DB.prepare(`
    SELECT * FROM options WHERE question_id = ?
  `).bind(id).all();

    return c.json({ ...question, options });
});

// Admin ONLY routes below
app.use('*', authMiddleware);

// Create question (admin)
app.post('/', async (c) => {
    const body = await c.req.json();
    const id = crypto.randomUUID();

    await c.env.DB.prepare(`
    INSERT INTO questions (id, question_text, order_index, is_active, shuffle_options)
    VALUES (?, ?, ?, ?, ?)
  `).bind(id, body.question_text, body.order_index || 0, body.is_active ?? true, body.shuffle_options ?? true).run();

    // Insert options
    if (body.options) {
        for (const opt of body.options) {
            await c.env.DB.prepare(`
        INSERT INTO options (id, question_id, mizaj_type, option_text)
        VALUES (?, ?, ?, ?)
      `).bind(crypto.randomUUID(), id, opt.mizaj_type, opt.option_text).run();
        }
    }

    return c.json({ id, message: 'Question created' }, 201);
});

// Update question (admin)
app.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();

    await c.env.DB.prepare(`
    UPDATE questions SET question_text = ?, order_index = ?, is_active = ?, shuffle_options = ?
    WHERE id = ?
  `).bind(body.question_text, body.order_index, body.is_active, body.shuffle_options, id).run();

    // Update options
    if (body.options) {
        for (const opt of body.options) {
            await c.env.DB.prepare(`
        UPDATE options SET option_text = ? WHERE id = ?
      `).bind(opt.option_text, opt.id).run();
        }
    }

    return c.json({ message: 'Question updated' });
});

// Delete question (admin)
app.delete('/:id', async (c) => {
    const id = c.req.param('id');
    await c.env.DB.prepare('DELETE FROM options WHERE question_id = ?').bind(id).run();
    await c.env.DB.prepare('DELETE FROM questions WHERE id = ?').bind(id).run();
    return c.json({ message: 'Question deleted' });
});

export default app;
