import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

// Team management utilities with fallback to original data
export async function getAllTeamMembers() {
  try {
    return await getCollection('team');
  } catch {
    // Fallback to original data if CMS fails
    const { currentTeamMembers } = await import('../data/teamMembers');
    return [...currentTeamMembers].map(member => ({
      id: member.id,
      slug: member.id,
      collection: 'team' as const,
      data: {
        name: member.name,
        role: member.roles.join(', '),
        year: parseInt(member.year),
        team: 'current',
        isCaptain: member.isCaptain,
        image: member.image,
      },
      body: '',
      render: async () => ({ html: '' }),
    }));
  }
}

export async function getCurrentTeam() {
  try {
    const allMembers = await getCollection('team');
    return allMembers.filter(member => member.data.team === 'current');
  } catch {
    // Fallback to original data
    const { currentTeamMembers } = await import('../data/teamMembers');
    return currentTeamMembers.map(member => ({
      id: member.id,
      slug: member.id,
      collection: 'team' as const,
      data: {
        name: member.name,
        role: member.roles.join(', '),
        year: parseInt(member.year),
        team: 'current',
        isCaptain: member.isCaptain,
        image: member.image,
      },
      body: '',
      render: async () => ({ html: '', Content: '', headings: [], remarkPluginFrontmatter: {} }),
    }));
  }
}

export async function getAlumni() {
  try {
    const allMembers = await getCollection('team');
    return allMembers.filter(member => member.data.team === 'alumni');
  } catch {
    // Fallback to original data - no separate alumni array, return empty array
    return [];
  }
}

export async function getMentors() {
  try {
    const allMembers = await getCollection('team');
    return allMembers.filter(member => member.data.team === 'mentor');
  } catch {
    // Fallback to original data
    const { teamMentors } = await import('../data/teamMembers');
    return teamMentors.map(mentor => ({
      id: mentor.id,
      slug: mentor.id,
      collection: 'team' as const,
      data: {
        name: mentor.name,
        role: mentor.roles.join(', '),
        year: parseInt(mentor.year),
        team: 'mentor',
        isCaptain: mentor.isLeadMentor || false,
        image: mentor.image,
      },
      body: '',
      render: async () => ({ html: '', Content: '', headings: [], remarkPluginFrontmatter: {} }),
    }));
  }
}

export async function getTeamCaptains() {
  try {
    const allMembers = await getCollection('team');
    return allMembers.filter(member => member.data.isCaptain);
  } catch {
    // Fallback to original data
    const { currentTeamMembers } = await import('../data/teamMembers');
    return currentTeamMembers
      .filter(member => member.isCaptain)
      .map(member => ({
        id: member.id,
        slug: member.id,
        collection: 'team' as const,
        data: {
          name: member.name,
          role: member.roles.join(', '),
          year: parseInt(member.year),
          team: 'current',
          isCaptain: member.isCaptain,
          image: member.image,
        },
        body: '',
        render: async () => ({ html: '', Content: '', headings: [], remarkPluginFrontmatter: {} }),
      }));
  }
}

// Project management utilities with fallback
export async function getAllProjects() {
  try {
    return await getCollection('projects');
  } catch {
    // Return empty array for now - can be enhanced with project data fallback
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    const allProjects = await getCollection('projects');
    return allProjects.filter(project => project.data.status === 'completed');
  } catch {
    return [];
  }
}

export async function getProjectsByCategory(category: string) {
  try {
    const allProjects = await getCollection('projects');
    return allProjects.filter(project => project.data.category === category);
  } catch {
    return [];
  }
}

// Blog management utilities with fallback
export async function getAllBlogPosts() {
  try {
    return await getCollection('blog');
  } catch {
    return [];
  }
}

export async function getPublishedBlogPosts() {
  try {
    const allPosts = await getCollection('blog');
    return allPosts.filter(post => !post.data.draft);
  } catch {
    return [];
  }
}

export async function getFeaturedBlogPosts() {
  try {
    const allPosts = await getCollection('blog');
    return allPosts.filter(post => post.data.featured && !post.data.draft);
  } catch {
    return [];
  }
}

// Event management utilities with fallback
export async function getAllEvents() {
  try {
    return await getCollection('events');
  } catch {
    return [];
  }
}

export async function getUpcomingEvents() {
  try {
    const allEvents = await getCollection('events');
    const now = new Date();
    return allEvents.filter(event => event.data.date >= now);
  } catch {
    return [];
  }
}

export async function getPastEvents() {
  try {
    const allEvents = await getCollection('events');
    const now = new Date();
    return allEvents.filter(event => event.data.date < now);
  } catch {
    return [];
  }
}

// Search utilities
export interface SearchResult {
  type: 'team' | 'projects' | 'blog' | 'events';
  entry: CollectionEntry<'team' | 'projects' | 'blog' | 'events'> | any;
  relevance: number;
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const lowercaseQuery = query.toLowerCase();

  // Search team members
  const teamMembers = await getAllTeamMembers();
  teamMembers.forEach(member => {
    let relevance = 0;
    if (member.data.name.toLowerCase().includes(lowercaseQuery)) relevance += 10;
    // Search in roles (handle both array and string formats)
    const memberData = member.data as any;
    const roleString = memberData.roles
      ? Array.isArray(memberData.roles)
        ? memberData.roles.join(' ')
        : String(memberData.roles)
      : memberData.role || '';
    if (roleString.toLowerCase().includes(lowercaseQuery)) relevance += 5;
    // Note: Original team member data doesn't include bio or skills fields

    if (relevance > 0) {
      results.push({ type: 'team', entry: member, relevance });
    }
  });

  // Search projects
  const projects = await getAllProjects();
  projects.forEach(project => {
    let relevance = 0;
    if (project.data.title.toLowerCase().includes(lowercaseQuery)) relevance += 10;
    if (project.data.description.toLowerCase().includes(lowercaseQuery)) relevance += 5;
    if (
      project.data.tags &&
      project.data.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
    )
      relevance += 3;

    if (relevance > 0) {
      results.push({ type: 'projects', entry: project, relevance });
    }
  });

  // Search blog posts
  const blogPosts = await getAllBlogPosts();
  blogPosts.forEach(post => {
    let relevance = 0;
    if (post.data.title.toLowerCase().includes(lowercaseQuery)) relevance += 10;
    if (post.data.description.toLowerCase().includes(lowercaseQuery)) relevance += 5;
    if (
      post.data.tags &&
      post.data.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
    )
      relevance += 3;

    if (relevance > 0) {
      results.push({ type: 'blog', entry: post, relevance });
    }
  });

  // Search events
  const events = await getAllEvents();
  events.forEach(event => {
    let relevance = 0;
    if (event.data.title.toLowerCase().includes(lowercaseQuery)) relevance += 10;
    if (event.data.description.toLowerCase().includes(lowercaseQuery)) relevance += 5;
    if (event.data.location.toLowerCase().includes(lowercaseQuery)) relevance += 3;

    if (relevance > 0) {
      results.push({ type: 'events', entry: event, relevance });
    }
  });

  // Sort by relevance and return top results
  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
}

// Statistics utilities
export async function getContentStats() {
  const [team, projects, blog, events] = await Promise.all([
    getAllTeamMembers(),
    getAllProjects(),
    getAllBlogPosts(),
    getAllEvents(),
  ]);

  // Calculate team stats with fallback data
  let currentTeamCount = 0;
  let alumniCount = 0;
  let mentorsCount = 0;
  let captainsCount = 0;

  if (team.length > 0) {
    currentTeamCount = team.filter(m => m.data.team === 'current').length;
    alumniCount = team.filter(m => m.data.team === 'alumni').length;
    mentorsCount = team.filter(m => m.data.team === 'mentor').length;
    captainsCount = team.filter(m => m.data.isCaptain).length;
  } else {
    // Fallback to original data structure
    const { currentTeamMembers, teamMentors } = await import('../data/teamMembers');
    currentTeamCount = currentTeamMembers.length;
    alumniCount = 0; // No separate alumni array in the current structure
    mentorsCount = teamMentors.length;
    captainsCount = currentTeamMembers.filter(m => m.isCaptain).length;
  }

  const completedProjects = projects.filter(p => p.data.status === 'completed');
  const ongoingProjects = projects.filter(p => p.data.status === 'ongoing');

  const publishedPosts = blog.filter(b => !b.data.draft);

  const upcomingEvents = events.filter(e => e.data.status === 'upcoming');
  const pastEvents = events.filter(e => e.data.status === 'completed');

  return {
    team: {
      total: currentTeamCount + alumniCount + mentorsCount,
      current: currentTeamCount,
      alumni: alumniCount,
      mentors: mentorsCount,
      captains: captainsCount,
    },
    projects: {
      total: projects.length,
      completed: completedProjects.length,
      ongoing: ongoingProjects.length,
      planned: projects.filter(p => p.data.status === 'planned').length,
    },
    blog: {
      total: blog.length,
      published: publishedPosts.length,
      drafts: blog.filter(b => b.data.draft).length,
      featured: blog.filter(b => b.data.featured).length,
    },
    events: {
      total: events.length,
      upcoming: upcomingEvents.length,
      past: pastEvents.length,
      ongoing: events.filter(e => e.data.status === 'ongoing').length,
    },
  };
}
