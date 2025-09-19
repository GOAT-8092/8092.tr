import { defineCollection, z } from 'astro:content';

const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    roles: z.array(z.string()), // Updated to match actual data structure
    year: z.number().int().min(2019).max(2030),
    team: z.enum(['current', 'alumni', 'mentor']),
    isCaptain: z.boolean().default(false),
    isLeadMentor: z.boolean().default(false), // Added for mentors
    bio: z.string().optional(),
    skills: z.array(z.string()).optional(),
    image: z.string().optional(),
    socialMedias: z
      .object({
        // Updated to match actual property name
        github: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        instagram: z.string().url().optional(),
        twitter: z.string().url().optional(),
        website: z.string().url().optional(),
        facebook: z.string().url().optional(),
      })
      .optional(),
  }),
});

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number().int().min(2019).max(2030),
    status: z.enum(['completed', 'ongoing', 'planned']),
    category: z.enum(['robot', 'outreach', 'education', 'competition']),
    tags: z.array(z.string()),
    image: z.string().optional(),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    achievements: z.array(z.string()).optional(),
    teamMembers: z.array(z.string()).optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const eventCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    location: z.string(),
    type: z.enum(['competition', 'workshop', 'outreach', 'meeting']),
    status: z.enum(['upcoming', 'ongoing', 'completed']),
    image: z.string().optional(),
    registrationLink: z.string().url().optional(),
    maxParticipants: z.number().int().optional(),
  }),
});

export const collections = {
  team: teamCollection,
  projects: projectCollection,
  blog: blogCollection,
  events: eventCollection,
};
