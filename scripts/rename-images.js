#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, '../public/img');

// Turkish character mapping
const turkishMap = {
  ı: 'i',
  ğ: 'g',
  ü: 'u',
  ş: 's',
  ö: 'o',
  ç: 'c',
  İ: 'I',
  Ğ: 'G',
  Ü: 'U',
  Ş: 'S',
  Ö: 'O',
  Ç: 'C',
};

// Normalize filename
function normalizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[ığüşöçİĞÜŞÖÇ]/g, char => turkishMap[char] || char)
    .replace(/[^a-z0-9\-._]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get image info from filename
function getImageInfo(filename) {
  const name = path.parse(filename).name;
  // ext variable removed as unused

  // Team member patterns
  if (
    [
      'halil',
      'mirac',
      'emirhan',
      'alperen',
      'huseyin',
      'toprak',
      'elif',
      'nurettin',
      'hakan',
      'yagiz',
      'kagan',
      'omer',
      'hasret',
      'bugra',
      'selin',
      'ahmet',
      'mustafa',
      'buse',
    ].some(name => filename.toLowerCase().includes(name))
  ) {
    let baseName = normalizeFilename(name);
    let role = 'member';

    // Special role detection
    if (baseName.includes('hoca') || baseName.includes('mentor')) {
      role = 'mentor';
    } else if (baseName.includes('captain') || baseName === 'halil') {
      role = 'captain';
    }

    return {
      type: 'team',
      newName: `team-${baseName}-${role}.jpg`,
      category: 'team',
    };
  }

  // Gallery patterns
  if (filename.startsWith('resim') && /^\d+$/.test(name.replace('resim', ''))) {
    const number = name.replace('resim', '');
    return {
      type: 'gallery',
      newName: `gallery-general-2024-${number.padStart(2, '0')}.jpg`,
      category: 'gallery',
    };
  }

  // Logo patterns
  if (
    filename.toLowerCase().includes('logo') ||
    ['frc', 'goat', 'bsh', 'cemobsan', 'yilmaz', 'kalip', 'teknopark', 'tubitak'].some(keyword =>
      filename.toLowerCase().includes(keyword)
    )
  ) {
    const baseName = normalizeFilename(name.replace(/logo/i, '').replace(/[-_]+$/, ''));
    return {
      type: 'logo',
      newName: `logo-${baseName}.png`,
      category: 'logo',
    };
  }

  // Event/general images
  if (
    ['hourofcode', 'sokakhayvanlari', 'makerslab', 'genclikmerkezi'].some(keyword =>
      filename.toLowerCase().includes(keyword)
    )
  ) {
    const baseName = normalizeFilename(name);
    return {
      type: 'event',
      newName: `event-${baseName}.jpg`,
      category: 'event',
    };
  }

  // Default: person names (assume team members)
  if (name.length < 30 && /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(name)) {
    const baseName = normalizeFilename(name);
    return {
      type: 'team',
      newName: `team-${baseName}-member.jpg`,
      category: 'team',
    };
  }

  // Uncategorized
  return {
    type: 'general',
    newName: `general-${normalizeFilename(name)}.jpg`,
    category: 'general',
  };
}

// Process directory recursively
function processDirectory(dir = imgDir, renameMap = []) {
  const files = fs.readdirSync(dir);

  if (dir === imgDir) {
    console.log('📸 Image Rename Analysis');
    console.log('='.repeat(50));
  }

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      processDirectory(fullPath, renameMap);
    } else if (stat.isFile() && file.match(/\.(jpg|jpeg|png)$/i)) {
      const relativePath = path.relative(imgDir, fullPath);
      const relativeDir = path.dirname(relativePath);

      let info = getImageInfo(file);

      // Special handling for gallery files
      if (relativeDir === 'gallery') {
        // Remove "gallery-" prefix from newName since we're already in gallery folder
        info.newName = path.join('gallery', info.newName.replace('gallery-', ''));
      }

      if (info.newName !== file) {
        renameMap.push({
          old: relativePath,
          new: info.newName,
          type: info.type,
          category: info.category,
          fullPath: fullPath,
        });
      }
    }
  });

  // Only show summary at the top level
  if (dir === imgDir) {
    // Group by category
    const byCategory = {};
    renameMap.forEach(item => {
      if (!byCategory[item.category]) byCategory[item.category] = [];
      byCategory[item.category].push(item);
    });

    // Display organized rename plan
    Object.entries(byCategory).forEach(([category, items]) => {
      console.log(`\n📁 ${category.toUpperCase()} (${items.length} files):`);
      console.log('-'.repeat(40));
      items.forEach(item => {
        console.log(`  ${item.old} → ${item.new}`);
      });
    });

    console.log(`\n📊 Summary:`);
    console.log(`  Total files to rename: ${renameMap.length}`);
    console.log(`  Categories: ${Object.keys(byCategory).join(', ')}`);
  }

  return renameMap;
}

// Execute rename operation
function renameFiles(renameMap) {
  console.log('\n🔄 Renaming files...');

  renameMap.forEach((item, index) => {
    const oldPath = item.fullPath || path.join(imgDir, item.old);
    const newPath = path.join(imgDir, item.new);

    try {
      // Create directory if it doesn't exist
      const newDir = path.dirname(newPath);
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }

      // Handle duplicates by adding counter
      let finalPath = newPath;
      let counter = 1;

      while (fs.existsSync(finalPath)) {
        const parsed = path.parse(newPath);
        finalPath = path.join(parsed.dir, `${parsed.name}-${counter}${parsed.ext}`);
        counter++;
      }

      if (finalPath !== newPath) {
        console.log(`⚠️  Duplicate detected: ${item.new} → ${path.basename(finalPath)}`);
      }

      fs.renameSync(oldPath, finalPath);
      console.log(`${index + 1}. ✅ ${item.old} → ${item.new}`);
    } catch (error) {
      console.error(`${index + 1}. ❌ Failed to rename ${item.old}: ${error.message}`);
    }
  });

  console.log('✅ Rename operation completed!');
}

// Main execution
const action = process.argv[2];

if (action === 'rename') {
  const renameMap = processDirectory();

  console.log('\n⚠️  WARNING: This will rename files in your image directory.');
  console.log('Make sure you have a backup before proceeding.');
  console.log('Type "yes" to continue or anything else to cancel:');

  process.stdin.once('data', data => {
    if (data.toString().trim().toLowerCase() === 'yes') {
      renameFiles(renameMap);
    } else {
      console.log('❌ Rename operation cancelled.');
    }
    process.exit(0);
  });
} else {
  console.log('🖼️  Image Rename Script');
  console.log('Usage:');
  console.log('  node scripts/rename-images.js preview  - Show rename plan');
  console.log('  node scripts/rename-images.js rename   - Execute renaming');
  console.log('');
  processDirectory();
}
