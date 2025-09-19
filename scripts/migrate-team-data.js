#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Import existing team data
const teamMembersPath = path.join(process.cwd(), 'src/data/teamMembers.ts');
const outputDir = path.join(process.cwd(), 'src/content/team');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read existing team data file content
let teamData = { currentTeam: [], alumni: [], mentors: [] };
try {
  const teamDataContent = fs.readFileSync(teamMembersPath, 'utf8');

  // Extract currentTeam data from the file
  const currentTeamMatch = teamDataContent.match(
    /export const currentTeam: TeamMember\[\] = \[(.*?)\];/s
  );
  if (currentTeamMatch) {
    teamData.currentTeam = parseTeamMembers(currentTeamMatch[1]);
  }

  // Extract alumni data from the file
  const alumniMatch = teamDataContent.match(/export const alumni: TeamMember\[\] = \[(.*?)\];/s);
  if (alumniMatch) {
    teamData.alumni = parseTeamMembers(alumniMatch[1]);
  }

  // Extract mentors data from the file
  const mentorsMatch = teamDataContent.match(/export const mentors: Mentor\[\] = \[(.*?)\];/s);
  if (mentorsMatch) {
    teamData.mentors = parseTeamMembers(mentorsMatch[1], true);
  }
} catch {
  console.log('Team data file not found or error reading it. Using empty data.');
}

// Parse team members from TypeScript array syntax
function parseTeamMembers(arrayContent, isMentor = false) {
  const members = [];

  // Remove comments and split by object patterns
  const cleanContent = arrayContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const objectMatches = cleanContent.match(/\{[^}]+\}/g);

  if (objectMatches) {
    objectMatches.forEach(match => {
      try {
        // Convert TypeScript object syntax to JSON
        const jsonStr = match
          .replace(/(\w+):/g, '"$1":')
          .replace(/'/g, '"')
          .replace(/,\s*}/g, '}');

        const member = JSON.parse(jsonStr);

        // Add mentor-specific field if needed
        if (isMentor && member.isLeadMentor) {
          member.isCaptain = member.isLeadMentor;
        }

        members.push(member);
      } catch {
        console.log('Error parsing member:', match);
      }
    });
  }

  return members;
}

// Convert team member to frontmatter format
function convertTeamMember(member) {
  const slug = `${member.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')}-${member.year}`;

  const frontmatter = `---
name: "${member.name}"
role: "${member.role}"
year: ${member.year}
team: ${member.teamType === 'current' ? 'current' : member.teamType === 'alumni' ? 'alumni' : 'mentor'}
isCaptain: ${member.isCaptain || false}
${member.bio ? `bio: "${member.bio}"` : ''}
${member.skills ? `skills: [${member.skills.map(skill => `"${skill}"`).join(', ')}]` : ''}
${member.image ? `image: "${member.image}"` : ''}
${
  member.social
    ? `social:
  ${member.social.github ? `github: "${member.social.github}"` : ''}
  ${member.social.linkedin ? `linkedin: "${member.social.linkedin}"` : ''}
  ${member.social.instagram ? `instagram: "${member.social.instagram}"` : ''}
  ${member.social.twitter ? `twitter: "${member.social.twitter}"` : ''}`
    : ''
}
---
`;

  const content = `# ${member.name}

${member.bio || `${member.role}, FRC Team 8092`}

## Yetenekler
${member.skills ? member.skills.map(skill => `- ${skill}`).join('\n') : '- Robotik\n- Takım Çalışması'}

## Sosyal Medya
${member.social?.github ? `- GitHub: [${member.social.github}](${member.social.github})` : ''}
${member.social?.linkedin ? `- LinkedIn: [${member.social.linkedin}](${member.social.linkedin})` : ''}
${member.social?.instagram ? `- Instagram: [${member.social.instagram}](${member.social.instagram})` : ''}
${member.social?.twitter ? `- Twitter: [${member.social.twitter}](${member.social.twitter})` : ''}

---

*${member.teamType === 'current' ? 'Mevcut takım üyesi' : member.teamType === 'alumni' ? 'Mezun üye' : 'Mentor'}, ${member.year}*
`;

  return { slug, content: frontmatter + content };
}

// Process all team members
const migratedMembers = [];

// Process current team
if (teamData.currentTeam) {
  teamData.currentTeam.forEach(member => {
    const { slug, content } = convertTeamMember({
      ...member,
      teamType: 'current',
      isCaptain: false,
    });
    const filePath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(filePath, content, 'utf8');
    migratedMembers.push({ name: member.name, file: `${slug}.md` });
  });
}

// Process alumni
if (teamData.alumni) {
  teamData.alumni.forEach(member => {
    const { slug, content } = convertTeamMember({
      ...member,
      teamType: 'alumni',
      isCaptain: false,
    });
    const filePath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(filePath, content, 'utf8');
    migratedMembers.push({ name: member.name, file: `${slug}.md` });
  });
}

// Process mentors
if (teamData.mentors) {
  teamData.mentors.forEach(member => {
    const { slug, content } = convertTeamMember({
      ...member,
      teamType: 'mentor',
      isCaptain: false,
    });
    const filePath = path.join(outputDir, `${slug}.md`);
    fs.writeFileSync(filePath, content, 'utf8');
    migratedMembers.push({ name: member.name, file: `${slug}.md` });
  });
}

console.log('✅ Team data migration completed!');
console.log(`📁 Migrated ${migratedMembers.length} team members to: ${outputDir}`);
console.log('📋 Migrated members:');
migratedMembers.forEach(member => {
  console.log(`   - ${member.name} (${member.file})`);
});

// Create sample project data
const projectsDir = path.join(process.cwd(), 'src/content/projects');
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

const sampleProjects = [
  {
    title: '2024 Robot Competition',
    description: 'FRC 2024 sezonu için tasarladığımız robot ve yarışma stratejimiz',
    year: 2024,
    status: 'completed',
    category: 'robot',
    tags: ['robot', 'competition', '2024'],
    achievements: ['Regional Participation', 'Innovation Award Nominee'],
    teamMembers: ['Current Team Members'],
  },
  {
    title: 'STEM Outreach Program',
    description: 'Lise öğrencilerine STEM eğitimi veren topluluk hizmeti projemiz',
    year: 2024,
    status: 'ongoing',
    category: 'outreach',
    tags: ['STEM', 'education', 'outreach', 'community'],
    achievements: ['Reached 500+ Students', 'School Partnership'],
  },
  {
    title: 'CAD Training Workshop',
    description: 'Takım üyeleri için SolidWorks ve CAD tasarım atölyesi',
    year: 2023,
    status: 'completed',
    category: 'education',
    tags: ['CAD', 'training', 'SolidWorks', 'design'],
    achievements: ['15 Team Members Certified', 'Improved Design Skills'],
  },
];

sampleProjects.forEach(project => {
  const slug = project.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const frontmatter = `---
title: "${project.title}"
description: "${project.description}"
year: ${project.year}
status: "${project.status}"
category: "${project.category}"
tags: [${project.tags.map(tag => `"${tag}"`).join(', ')}]
${project.achievements ? `achievements: [${project.achievements.map(achievement => `"${achievement}"`).join(', ')}]` : ''}
${project.teamMembers ? `teamMembers: [${project.teamMembers.map(member => `"${member}"`).join(', ')}]` : ''}
---
`;

  const content = `# ${project.title}

${project.description}

## Proje Detayları
- **Yıl**: ${project.year}
- **Durum**: ${project.status === 'completed' ? 'Tamamlandı' : project.status === 'ongoing' ? 'Devam Ediyor' : 'Planlandı'}
- **Kategori**: ${project.category === 'robot' ? 'Robot' : project.category === 'outreach' ? 'Topluluk Hizmeti' : project.category === 'education' ? 'Eğitim' : 'Yarışma'}

## Etiketler
${project.tags.map(tag => `- ${tag}`).join('\n')}

${project.achievements ? `\n## Başarılar\n${project.achievements.map(achievement => `- ${achievement}`).join('\n')}` : ''}

${project.teamMembers ? `\n## Takım Üyeleri\n${project.teamMembers.map(member => `- ${member}`).join('\n')}` : ''}

---

*FRC Team 8092 "Greatest of All Times"*
`;

  const filePath = path.join(projectsDir, `${slug}.md`);
  fs.writeFileSync(filePath, frontmatter + content, 'utf8');
  console.log(`📁 Created sample project: ${slug}.md`);
});

console.log('\n✅ Sample projects created!');
console.log('🎯 Migration completed successfully!');
console.log('\n📝 Next steps:');
console.log('1. Review the migrated content in src/content/ directory');
console.log('2. Update components to use the new CMS functions');
console.log('3. Test the new content management features');
console.log('4. Set up authentication for admin pages');
