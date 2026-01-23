import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Get all participants (admin)
app.get('/', async (c) => {
    const { results } = await c.env.DB.prepare(`
    SELECT p.*, m.title as mizaj_title
    FROM participants p
    LEFT JOIN mizaj_results m ON p.result_mizaj_type = m.mizaj_type
    ORDER BY p.created_at DESC
    LIMIT 100
  `).all();

    return c.json(results);
});

// Get participant by ID with full details
app.get('/:id', async (c) => {
    const id = c.req.param('id');

    const participant = await c.env.DB.prepare(`
    SELECT * FROM participants WHERE id = ?
  `).bind(id).first();

    if (!participant) {
        return c.json({ error: 'Participant not found' }, 404);
    }

    // Get mizaj result
    const mizajResult = await c.env.DB.prepare(`
    SELECT * FROM mizaj_results WHERE mizaj_type = ?
  `).bind(participant.result_mizaj_type).first();

    // Get answers with question details
    const { results: answers } = await c.env.DB.prepare(`
    SELECT a.*, q.question_text
    FROM answers a
    JOIN questions q ON a.question_id = q.id
    WHERE a.participant_id = ?
  `).bind(id).all();

    // Calculate answer counts
    const answerCounts: Record<string, number> = {
        panas_lembab: 0,
        dingin_lembab: 0,
        panas_kering: 0,
        dingin_kering: 0
    };
    for (const answer of answers) {
        const type = answer.selected_mizaj_type as string;
        if (answerCounts[type] !== undefined) {
            answerCounts[type]++;
        }
    }

    return c.json({
        participant: {
            ...participant,
            answer_counts: answerCounts
        },
        mizaj_result: mizajResult,
        answers
    });
});

// Update participant status (admin)
app.put('/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();

    await c.env.DB.prepare(`
    UPDATE participants SET needs_interview = ?, result_mizaj_type = ?
    WHERE id = ?
  `).bind(body.needs_interview ? 1 : 0, body.result_mizaj_type, id).run();

    return c.json({ message: 'Participant updated' });
});

export default app;
