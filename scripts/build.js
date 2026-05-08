import { cpSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';

for (const target of ['dist', 'docs']) {
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  copyFileSync('index.html', `${target}/index.html`);
  cpSync('src', `${target}/src`, { recursive: true });
}
console.log('Static prototype copied to dist/ and docs/. Use docs/ for GitHub Pages branch deployment.');
