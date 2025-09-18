#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_DIR = join(__dirname, '../src/images');
const OUTPUT_DIR = join(__dirname, '../src/images/optimized');

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_WIDTH = 1920;
const QUALITY = 85;

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function getFiles(dir, fileList = []) {
  const files = await readdir(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await getFiles(filePath, fileList);
    } else if (SUPPORTED_FORMATS.includes(extname(file).toLowerCase())) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function optimizeImage(inputPath, outputDir) {
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  const relativePath = inputPath.replace(INPUT_DIR, '').substring(1);
  const outputPath = join(outputDir, dirname(relativePath), name);

  // Ensure output directory exists
  await ensureDir(join(outputDir, dirname(relativePath)));

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Skip if already optimized
    if (metadata.width <= MAX_WIDTH && metadata.format === 'webp') {
      console.log(`Skipping ${relativePath} (already optimized)`);
      return;
    }

    // Optimize to WebP
    await image
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: QUALITY })
      .toFile(`${outputPath}.webp`);

    // Also create AVIF for even better compression
    await image
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .avif({ quality: QUALITY - 10 })
      .toFile(`${outputPath}.avif`);

    console.log(`Optimized ${relativePath}`);
  } catch (error) {
    console.error(`Error optimizing ${relativePath}:`, error.message);
  }
}

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');

  await ensureDir(OUTPUT_DIR);
  const imageFiles = await getFiles(INPUT_DIR);

  console.log(`Found ${imageFiles.length} images to optimize`);

  for (const file of imageFiles) {
    await optimizeImage(file, OUTPUT_DIR);
  }

  console.log('✅ Image optimization complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  optimizeImages().catch(console.error);
}

export { optimizeImages };
