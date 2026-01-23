import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Submit quiz answers
app.post('/submit', async (c) => {
    const body = await c.req.json();
    const { participant, answers } = body;

    // Count answers by mizaj type
    const mizajCounts: Record<string, number> = {
        panas_lembab: 0,
        dingin_lembab: 0,
        panas_kering: 0,
        dingin_kering: 0
    };

    for (const answer of answers) {
        if (mizajCounts[answer.selected_mizaj] !== undefined) {
            mizajCounts[answer.selected_mizaj]++;
        }
    }

    // Determine dominant mizaj
    let dominantMizaj = 'panas_lembab';
    let maxCount = 0;
    let needsInterview = false;

    for (const [type, count] of Object.entries(mizajCounts)) {
        if (count > maxCount) {
            maxCount = count;
            dominantMizaj = type;
        }
    }

    // Check if needs interview (tie or close scores)
    const counts = Object.values(mizajCounts).sort((a, b) => b - a);
    if (counts[0] === counts[1]) {
        needsInterview = true;
    }

    // Create participant
    const participantId = crypto.randomUUID();
    await c.env.DB.prepare(`
    INSERT INTO participants (id, name, age, gender, email, phone, result_mizaj_type, needs_interview)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
        participantId,
        participant.name,
        participant.age,
        participant.gender,
        participant.email || null,
        participant.phone || null,
        dominantMizaj,
        needsInterview ? 1 : 0
    ).run();

    // Save individual answers
    for (const answer of answers) {
        await c.env.DB.prepare(`
      INSERT INTO answers (id, participant_id, question_id, selected_mizaj)
      VALUES (?, ?, ?, ?)
    `).bind(crypto.randomUUID(), participantId, answer.question_id, answer.selected_mizaj).run();
    }

    // Get mizaj result info
    const mizajResult = await c.env.DB.prepare(`
    SELECT * FROM mizaj_results WHERE mizaj_type = ?
  `).bind(dominantMizaj).first();

    return c.json({
        participant: {
            id: participantId,
            name: participant.name,
            age: participant.age,
            gender: participant.gender,
            result_mizaj_type: dominantMizaj,
            needs_interview: needsInterview,
            answer_counts: mizajCounts
        },
        mizaj_result: mizajResult
    });
});

export default app;
