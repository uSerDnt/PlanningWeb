import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({ hello: 'mom!!' });
});

app.get('/project/:projectId', (c) => {
  const { projectId } = c.req.param();
  return c.json({ projectId: projectId });
});

export const GET = handle(app);
