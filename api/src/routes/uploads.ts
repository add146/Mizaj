import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
    R2_ASSETS: R2Bucket;
};

const app = new Hono<{ Bindings: Bindings }>();

// Upload image to R2
app.post('/upload', async (c) => {
    try {
        const formData = await c.req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return c.json({ error: 'No file provided' }, 400);
        }

        // Generate unique filename
        const ext = file.name.split('.').pop() || 'png';
        const filename = `${crypto.randomUUID()}.${ext}`;

        // Upload to R2
        const arrayBuffer = await file.arrayBuffer();
        await c.env.R2_ASSETS.put(filename, arrayBuffer, {
            httpMetadata: {
                contentType: file.type
            }
        });

        // Return public URL
        const publicUrl = `https://assets.khibroh.com/${filename}`;

        return c.json({
            success: true,
            filename,
            url: publicUrl
        });
    } catch (error) {
        console.error('Upload error:', error);
        return c.json({ error: 'Upload failed' }, 500);
    }
});

// Get image from R2 (public access)
app.get('/:filename', async (c) => {
    const filename = c.req.param('filename');

    const object = await c.env.R2_ASSETS.get(filename);

    if (!object) {
        return c.json({ error: 'Not found' }, 404);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new Response(object.body, { headers });
});

// Delete image from R2
app.delete('/:filename', async (c) => {
    const filename = c.req.param('filename');
    await c.env.R2_ASSETS.delete(filename);
    return c.json({ success: true });
});

export default app;
