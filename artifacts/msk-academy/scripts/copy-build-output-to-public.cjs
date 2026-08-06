const fs = require("fs");
const path = require("path");

const src = path.resolve(process.cwd(), "dist", "public");
const dest = path.resolve(process.cwd(), "public");

function removeDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const entryPath = path.join(dir, entry);
    const stats = fs.lstatSync(entryPath);
    if (stats.isDirectory()) {
      removeDir(entryPath);
    } else {
      fs.unlinkSync(entryPath);
    }
  }
  fs.rmdirSync(dir);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const entry of fs.readdirSync(srcDir)) {
    const srcEntry = path.join(srcDir, entry);
    const destEntry = path.join(destDir, entry);
    const stats = fs.lstatSync(srcEntry);

    if (stats.isDirectory()) {
      copyDir(srcEntry, destEntry);
    } else {
      fs.copyFileSync(srcEntry, destEntry);
    }
  }
}

if (!fs.existsSync(src)) {
  console.error(`Source build directory not found: ${src}`);
  process.exit(1);
}

removeDir(dest);
copyDir(src, dest);
console.log(`Copied build output from ${src} to ${dest}`);
