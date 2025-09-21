#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');

// Mapping from old filenames to new filenames
const imageMap = {
  // Team members
  'Halil.png': 'team-halil-captain.jpg',
  'Mirac.png': 'team-mirac-member.jpg',
  'Miraç.jpg': 'team-mirac-member.jpg',
  'Emirhan.png': 'team-emirhan-member.jpg',
  'emirhan.jpeg': 'team-emirhan-member-2.jpg',
  'Alperen.png': 'team-alperen-member.jpg',
  'Alperen.jpg': 'team-alperen-member-1.jpg',
  'Huseyin.png': 'team-huseyin-member.jpg',
  'Toprak2.png': 'team-toprak2-member.jpg',
  'Elif.png': 'team-elif-member.jpg',
  'Elif.jpg': 'team-elif-member-1.jpg',
  'Nurettin2.png': 'team-nurettin2-member.jpg',
  'Hakan Hoca.jpg': 'team-hakan-hoca-mentor.jpg',
  'colak.jpg': 'team-colak-member.jpg',
  'yagiz.jpg': 'team-yagiz-member.jpg',
  'omer.jpg': 'team-omer-member.jpg',
  'omer.png': 'team-omer-member-1.jpg',
  'saruhan.jpg': 'team-saruhan-member.jpg',
  'selin2.jpg': 'team-selin2-member.jpg',
  'hasret.png': 'team-hasret-member.jpg',
  'bugra.jpg': 'team-bugra-member.jpg',

  // Gallery images - map resimX.jpg to general-2024-X.jpg (files are in gallery/ folder)
  'resim4.jpg': 'general-2024-04.jpg',
  'resim5.jpg': 'general-2024-05.jpg',
  'resim6.jpg': 'general-2024-06.jpg',
  'resim7.jpg': 'general-2024-07.jpg',
  'resim8.jpg': 'general-2024-08.jpg',
  'resim9.jpg': 'general-2024-09.jpg',
  'resim10.jpg': 'general-2024-10.jpg',
  'resim13.jpg': 'general-2024-13.jpg',
  'resim14.jpg': 'general-2024-14.jpg',
  'resim15.jpg': 'general-2024-15.jpg',
  'resim16.jpg': 'general-2024-16.jpg',
  'resim18.jpg': 'general-2024-18.jpg',
  'resim19.jpg': 'general-2024-19.jpg',
  'resim21.jpg': 'general-2024-21.jpg',
  'resim22.jpg': 'general-2024-22.jpg',
  'resim23.jpg': 'general-2024-23.jpg',
  'resim24.jpg': 'general-2024-24.jpg',
  'resim25.jpg': 'general-2024-25.jpg',
  'resim26.jpg': 'general-2024-26.jpg',
  'resim27.jpg': 'general-2024-27.jpg',
  'resim28.jpg': 'general-2024-28.jpg',
  'resim29.jpg': 'general-2024-29.jpg',
  'resim30.jpg': 'general-2024-30.jpg',
  'resim31.jpg': 'general-2024-31.jpg',
  'resim32.jpg': 'general-2024-32.jpg',
  'resim33.jpg': 'general-2024-33.jpg',
  'resim34.jpg': 'general-2024-34.jpg',
  'resim35.jpg': 'general-2024-35.jpg',
  'resim36.jpg': 'general-2024-36.jpg',
  'resim37.jpg': 'general-2024-37.jpg',
  'resim38.jpg': 'general-2024-38.jpg',
  'resim39.jpg': 'general-2024-39.jpg',
  'resim40.jpg': 'general-2024-40.jpg',
  'resim41.jpg': 'general-2024-41.jpg',
  'resim42.jpg': 'general-2024-42.jpg',
  'resim43.jpg': 'general-2024-43.jpg',
  'resim44.jpg': 'general-2024-44.jpg',
  'resim45.jpg': 'general-2024-45.jpg',
  'resim46.jpg': 'general-2024-46.jpg',
  'resim47.jpg': 'general-2024-47.jpg',
  'resim48.jpg': 'general-2024-48.jpg',
  'resim49.jpg': 'general-2024-49.jpg',
  'resim50.jpg': 'general-2024-50.jpg',
  'resim51.jpg': 'general-2024-51.jpg',
  'resim52.jpg': 'general-2024-52.jpg',
  'resim53.jpg': 'general-2024-53.jpg',
  'resim54.jpg': 'general-2024-54.jpg',
  'resim55.jpg': 'general-2024-55.jpg',
  'resim56.jpg': 'general-2024-56.jpg',
  'resim57.jpg': 'general-2024-57.jpg',
  'resim58.jpg': 'general-2024-58.jpg',
  'resim59.jpg': 'general-2024-59.jpg',
  'resim60.jpg': 'general-2024-60.jpg',
  'resim61.jpg': 'general-2024-61.jpg',
  'resim62.jpg': 'general-2024-62.jpg',
  'resim67.jpg': 'general-2024-67.jpg',
  'resim68.jpg': 'general-2024-68.jpg',
  'resim69.jpg': 'general-2024-69.jpg',
  'resim70.jpg': 'general-2024-70.jpg',
  'resim71.jpg': 'general-2024-71.jpg',
  'resim72.jpg': 'general-2024-72.jpg',
  'resim73.jpg': 'general-2024-73.jpg',
  'resim74.jpg': 'general-2024-74.jpg',
  'resim75.jpg': 'general-2024-75.jpg',
  'resim76.jpg': 'general-2024-76.jpg',
};

// Files to process
const filesToUpdate = ['src/data/teamMembers.ts', 'src/data/gallery-data.json'];

function updateFile(filePath) {
  const fullPath = path.join(projectRoot, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    let changes = 0;

    // Replace each old filename with new filename
    Object.entries(imageMap).forEach(([oldName, newName]) => {
      const regex = new RegExp(oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);

      if (matches) {
        content = content.replace(regex, newName);
        changes += matches.length;
        console.log(`  ${filePath}: ${oldName} → ${newName} (${matches.length} occurrences)`);
      }
    });

    if (changes > 0) {
      // Create backup
      const backupPath = fullPath + '.backup';
      fs.writeFileSync(backupPath, fs.readFileSync(fullPath));

      // Write updated content
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Updated ${filePath} (${changes} changes)`);
      return true;
    } else {
      console.log(`ℹ️  No changes needed in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}: ${error.message}`);
    return false;
  }
}

// Main execution
console.log('🔄 Updating Code References');
console.log('='.repeat(40));

let totalChanges = 0;
let filesUpdated = 0;

filesToUpdate.forEach(filePath => {
  if (updateFile(filePath)) {
    filesUpdated++;
    totalChanges++; // We'll count each file as at least 1 change
  }
});

console.log('\n📊 Summary:');
console.log(`  Files updated: ${filesUpdated}/${filesToUpdate.length}`);
console.log(`  Total reference changes: ${totalChanges}`);

if (filesUpdated > 0) {
  console.log('\n✅ Reference updates completed!');
  console.log('💡 Backup files created with .backup extension');
} else {
  console.log('\nℹ️  No reference updates were needed');
}
