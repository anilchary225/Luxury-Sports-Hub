const { rmSync } = require('fs');

try {
  rmSync('package-lock.json', { force: true });
  rmSync('yarn.lock', { force: true });
} catch (error) {
  // ignore
}

const npmUserAgent = process.env.npm_config_user_agent || '';
if (!npmUserAgent.startsWith('pnpm/')) {
  console.error('Use pnpm instead');
  process.exit(1);
}
