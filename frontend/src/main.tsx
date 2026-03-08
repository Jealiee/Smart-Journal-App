import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (import.meta.env.DEV) {
  const w = new Worker(new URL('./workers/foodWorker.ts', import.meta.url), { type: 'module' });
  w.onmessage = (e) => console.log('[foodWorker]', e.data);
  w.postMessage({ type: 'load', modelPath: '/models/food' });
  (window as any).__food = (text: string) => w.postMessage({ type: 'extract', text });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);