import { Hono } from 'hono';
import { cors } from 'hono/cors';
import questions from './routes/questions';
import quiz from './routes/quiz';
import participants from './routes/participants';
import auth from './routes/auth';
import mizaj from './routes/mizaj';
import content from './routes/content';
import uploads from './routes/uploads';

type Bindings = {
	DB: D1Database;
	R2_ASSETS: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for frontend
app.use('*', cors({
	origin: ['http://localhost:5173', 'https://mizaj.pages.dev', 'https://mizaj.khibroh.com'],
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check
app.get('/', (c) => c.json({ status: 'ok', message: 'BioFITRA API v1.0' }));

// API routes
app.route('/api/questions', questions);
app.route('/api/quiz', quiz);
app.route('/api/participants', participants);
app.route('/api/auth', auth);
app.route('/api/mizaj', mizaj);
app.route('/api/content', content);
app.route('/api/uploads', uploads);

export default app;

