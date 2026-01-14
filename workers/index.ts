import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';

type Bindings = {
  APP_NAME: string;
  APP_VERSION: string;
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('*', logger());
app.use('*', secureHeaders());
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// API Routes
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    app: c.env.APP_NAME || '割り勘の神様',
    version: c.env.APP_VERSION || '0.1.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/version', (c) => {
  return c.json({
    version: c.env.APP_VERSION || '0.1.0',
    name: c.env.APP_NAME || '割り勘の神様',
    description: 'レシート画像から簡単割り勘計算',
    features: [
      'レシートOCR（Gemini Vision API）',
      'ドラッグ&ドロップで割り当て',
      '参加者管理',
      '1円単位の正確な計算',
    ],
  });
});

// Static files are automatically served by Cloudflare Assets
// This catch-all forwards non-API requests to the assets binding
app.all('*', async (c) => {
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
