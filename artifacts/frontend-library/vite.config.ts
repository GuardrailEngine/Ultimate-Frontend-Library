import path from 'path';
import { readFile } from 'node:fs/promises';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

const componentRoot = path.resolve(import.meta.dirname, 'public', 'components');
const gumroadUrl = 'https://simochakir.gumroad.com/l/szcvz';
const previewGuard = `
<script>
(() => {
  const gumroadUrl = ${JSON.stringify(gumroadUrl)};
  const redirect = () => window.location.replace(gumroadUrl);
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    redirect();
  }, true);
  document.addEventListener('selectstart', (event) => event.preventDefault(), true);
  document.addEventListener('copy', (event) => event.preventDefault(), true);
  document.addEventListener('cut', (event) => event.preventDefault(), true);
  document.addEventListener('dragstart', (event) => event.preventDefault(), true);
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const devToolsShortcut =
      event.key === 'F12' ||
      ((event.ctrlKey || event.metaKey) && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      ((event.ctrlKey || event.metaKey) && key === 'u') ||
      (event.metaKey && event.altKey && key === 'i');
    if (devToolsShortcut || ((event.ctrlKey || event.metaKey) && key === 'c')) {
      event.preventDefault();
      event.stopPropagation();
      redirect();
    }
  }, true);
})();
</script>`;

async function protectComponentRequest(
  req: { url?: string },
  res: {
    statusCode: number;
    setHeader: (name: string, value: string) => void;
    end: (body: string) => void;
  },
  next: () => void,
) {
  const pathname = req.url?.split('?')[0] ?? '';
  if (!pathname.startsWith('/components/') || !pathname.endsWith('.html')) {
    next();
    return;
  }

  const relativePath = decodeURIComponent(pathname.slice('/components/'.length));
  const filePath = path.resolve(componentRoot, relativePath);
  const relativeToRoot = path.relative(componentRoot, filePath);
  if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
    next();
    return;
  }

  try {
    const html = await readFile(filePath, 'utf8');
    const protectedHtml = html.replace(/<\/body>/i, `${previewGuard}</body>`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(protectedHtml);
  } catch {
    next();
  }
}

const protectComponentPreviews = {
  name: 'protect-component-previews',
  configureServer(server: { middlewares: { use: (middleware: typeof protectComponentRequest) => void } }) {
    server.middlewares.use(protectComponentRequest);
  },
  configurePreviewServer(server: { middlewares: { use: (middleware: typeof protectComponentRequest) => void } }) {
    server.middlewares.use(protectComponentRequest);
  },
};

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    protectComponentPreviews,
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
