#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Gallery directory path
const galleryDir = path.join(__dirname, '../public/img/gallery');
const dataFile = path.join(__dirname, '../src/data/gallery-data.json');

// Read all image files from gallery directory
function getGalleryImages() {
  try {
    const files = fs.readdirSync(galleryDir);
    return files
      .filter(file => file.match(/\.(jpg|jpeg|png)$/i))
      .sort((a, b) => {
        // Sort by numeric part of filename
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });
  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return [];
  }
}

// Load existing gallery data
function loadGalleryData() {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      galleryItems: [],
      categories: {
        robots: { tr: 'Robotlar', en: 'Robots' },
        team: { tr: 'Takım', en: 'Team' },
        competitions: { tr: 'Yarışmalar', en: 'Competitions' },
        outreach: { tr: 'Toplum Hizmeti', en: 'Outreach' },
      },
    };
  }
}

// Save gallery data
function saveGalleryData(data) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    console.log('✅ Gallery data saved successfully!');
  } catch (error) {
    console.error('Error saving gallery data:', error);
  }
}

// Generate template for missing images
function generateTemplate() {
  const images = getGalleryImages();
  const data = loadGalleryData();

  console.log('\n📸 Gallery Images Found:', images.length);
  console.log('='.repeat(50));

  // Create a map of existing filenames
  const existingFiles = new Set(data.galleryItems.map(item => item.filename));

  // Find missing images
  const missingImages = images.filter(img => !existingFiles.has(img));

  if (missingImages.length === 0) {
    console.log('✅ All images have descriptions!');
    return;
  }

  console.log('\n📝 Missing descriptions for these images:');
  console.log('-'.repeat(50));

  const newItems = missingImages.map((filename, index) => {
    console.log(`${index + 1}. ${filename}`);

    return {
      filename: filename,
      title: {
        tr: `Görüntü ${filename}`,
        en: `Image ${filename}`,
      },
      subtitle: {
        tr: 'Görüntü açıklamasını buraya yazın',
        en: 'Write image description here',
      },
      category: 'robots', // Default category
    };
  });

  // Add new items to existing data
  data.galleryItems.push(...newItems);
  saveGalleryData(data);

  console.log('\n✨ Template entries added to gallery-data.json');
  console.log('💡 Edit the file to add proper titles and descriptions');
}

// List all images with their current status
function listImages() {
  const images = getGalleryImages();
  const data = loadGalleryData();

  console.log('\n📸 Gallery Image Status:');
  console.log('='.repeat(80));

  images.forEach((filename, index) => {
    const existingItem = data.galleryItems.find(item => item.filename === filename);
    const status = existingItem ? '✅' : '❌';
    const title = existingItem ? existingItem.title.tr : 'No description';

    console.log(`${String(index + 1).padStart(2, ' ')}. ${status} ${filename}`);
    if (existingItem) {
      console.log(`     Title: ${title}`);
      console.log(`     Category: ${existingItem.category}`);
    }
    console.log('');
  });
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'list':
    listImages();
    break;
  case 'template':
    generateTemplate();
    break;
  default:
    console.log('🖼️  Gallery Helper Script');
    console.log('Usage:');
    console.log('  node scripts/gallery-helper.js list     - List all images and their status');
    console.log(
      '  node scripts/gallery-helper.js template - Generate template for missing descriptions'
    );
    break;
}
