import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json' };
await stat(resolve(root, 'index.html')).catch(() => {
  console.error('Build não encontrado. Execute npm run build antes de npm start.');
  process.exit(1);
});

createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end();
    }
    let content;
    try {
      content = await readFile(file);
    } catch {
      if (extname(pathname) || !(req.headers.accept || '').includes('text/html')) {
        res.writeHead(404);
        return res.end('Não encontrado');
      }
      file = resolve(root, 'index.html');
      content = await readFile(file);
    }
    res.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': file.includes(`${sep}assets${sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch {
    res.writeHead(400);
    res.end('Requisição inválida');
  }
}).listen(Number(process.env.PORT) || 5000, '0.0.0.0', () => {
  console.log(`LYNN disponível em 0.0.0.0:${Number(process.env.PORT) || 5000}`);
});
