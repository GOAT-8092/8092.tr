# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Astro-powered website for FRC Team 8092 "Greatest of All Times" from Tekirdağ, Turkey. Successfully converted from static HTML to modern Astro framework. Team 8092 is the first and only FRC team in Tekirdağ province.

## Architecture

- **Framework**: Astro v5.13.7 with TypeScript
- **Styling**: Tailwind CSS v4 with custom color scheme
- **Components**: Modular Astro components for each section
- **Assets**: Optimized images and icons in `/public`
- **Data**: TypeScript data files for team members

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

## Project Structure

```
src/
  components/
    - Navigation.astro     # Fixed navigation with smooth scroll
    - Hero.astro          # Landing section with animated elements
    - About.astro         # Complete club history 2019-2025
    - Team.astro          # Current members + mentors with TypeScript data
    - Projects.astro      # Team projects and initiatives
    - Gallery.astro       # Image gallery with Fancybox integration
    - Contact.astro       # Contact info and social links
  layouts/
    - Layout.astro        # Base HTML structure with global scripts
  pages/
    - index.astro         # Main page importing all components
  styles/
    - global.css          # Tailwind CSS and custom styles
  data/
    - teamMembers.ts      # TypeScript interfaces and team data
public/
  img/                    # All team photos and assets (200+ images)
```

## Key Features

1. **Responsive Design**: Mobile-first approach with Tailwind
2. **Interactive Gallery**: Fancybox lightbox functionality
3. **Smooth Scrolling**: Custom navigation with offset for fixed header
4. **Type Safety**: Full TypeScript support for team data
5. **Performance**: Astro's static site generation with islands

## Custom Color Scheme

- Primary: #512f75 (purple)
- Secondary: #673a8e (lighter purple)
- Accent: #7e46a8 (accent purple)

## Important Considerations

1. **Images**: 200+ team member and event photos require optimization
2. **Turkish Content**: All content is in Turkish - maintain proper encoding
3. **Gallery Dependencies**: Fancybox requires jQuery and specific data attributes
4. **Mobile Menu**: JavaScript toggle functionality for mobile navigation
5. **Smooth Scroll**: Custom scroll functions preserve original UX

## Team Data Structure

Team members are managed via TypeScript interfaces in `src/data/teamMembers.ts`:

- Current team members (2024-2025)
- Historical mentors (2019-2024)
- Captain designation and roles
- Helper functions for filtering and display

## FIRST Core Values #memory

We express the FIRST philosophies of Gracious Professionalism and Coopertition through our Core Values:

- **Discovery**: We explore new skills and ideas.
- **Innovation**: We use creativity and persistence to solve problems.
- **Impact**: We apply what we learn to improve our world.
- **Inclusion**: We respect each other and embrace our differences.
- **Teamwork**: We are stronger when we work together.
- **Fun**: We enjoy and celebrate what we do!

## External Dependencies

- Font Awesome 5.15.4 for icons
- Fancybox 5.0 for gallery functionality
- Atkinson Hyperlegible font for accessibility (aligns with FIRST Inclusion values)
- jQuery for legacy compatibility
- Update how project is managed in the Markdown files.
