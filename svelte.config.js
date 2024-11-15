import adapter from '@sveltejs/adapter-auto';
import path from 'path';

const config = {
  kit: {
    adapter: adapter(),
    alias: {
      // مسیر را به پوشه src هدایت می‌کند
      '~': path.resolve('src'),
    },
  },
};

export default config;
