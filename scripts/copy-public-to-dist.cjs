/**
 * Copy all files from public/ into dist/ after vite build.
 * Ensures images and static assets are always in the deploy output
 * (workaround for Netlify/build envs where Vite's publicDir copy may not run as expected).
 */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const distDir = path.join(process.cwd(), 'dist');

if (!fs.existsSync(publicDir)) {
  console.warn('copy-public-to-dist: public/ not found, skipping');
  process.exit(0);
}

if (!fs.existsSync(distDir)) {
  console.error('copy-public-to-dist: dist/ not found. Run "vite build" first.');
  process.exit(1);
}

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(publicDir, distDir);
console.log('copy-public-to-dist: copied public/ into dist/');
