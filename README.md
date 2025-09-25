# FRC Team 8092 "Greatest of All Times" Website

Welcome to the official website of FRC Team 8092 "Greatest of All Times" from Tekirdağ, Turkey. This modern, responsive website showcases our team's journey, members, projects, and achievements in the FIRST Robotics Competition.

## 🤖 About Team 8092

Team 8092 "Greatest of All Times" (G.O.A.T.) is Tekirdağ's first and only FRC team, founded in 2019. We are based at Veliköy OSB Mesleki ve Teknik Anadolu Lisesi in Çerkezköy, Tekirdağ, Turkey.

### FIRST Core Values

- **Discovery**: We explore new skills and ideas
- **Innovation**: We use creativity and persistence to solve problems
- **Impact**: We apply what we learn to improve our world
- **Inclusion**: We respect each other and embrace our differences
- **Teamwork**: We are stronger when we work together
- **Fun**: We enjoy and celebrate what we do!

## 🚀 Project Structure

This website is built with Astro v5.13.7 and features a modern, component-based architecture:

```text
/
├── public/                     # Static assets (images, icons, etc.)
│   └── img/
│       ├── team/             # Team member photos (renamed with convention)
│       ├── gallery/          # Gallery images (general-2024-XX.jpg)
│       └── logos/            # Sponsor and organization logos
├── src/
│   ├── components/            # Astro components
│   │   ├── Navigation.astro   # Fixed navigation with smooth scroll
│   │   ├── Hero.astro         # Landing section with animations
│   │   ├── About.astro        # Complete club history 2019-2025
│   │   ├── Team.astro         # Current members + mentors
│   │   ├── Projects.astro     # Team projects and initiatives
│   │   ├── Gallery.astro      # Image gallery with Fancybox
│   │   ├── Contact.astro      # Contact info and social links
│   │   └── Footer.astro       # Footer with accessibility info
│   ├── data/
│   │   ├── teamMembers.ts     # TypeScript team data and interfaces
│   │   └── gallery-data.json   # Gallery metadata and image info
│   ├── content/               # Markdown content for projects/team
│   │   ├── projects/          # Project documentation
│   │   └── team/              # Team member profiles
│   ├── layouts/
│   │   └── Layout.astro       # Base HTML structure
│   ├── pages/
│   │   ├── index.astro        # Main page
│   │   ├── admin/             # Admin pages
│   │   ├── api/               # API endpoints
│   │   └── en/                # English pages
│   └── styles/
│       └── global.css         # Tailwind CSS and custom styles
├── scripts/                   # Utility scripts
│   ├── rename-images.js       # Image renaming automation
│   └── update-references.js   # Code reference updates
└── package.json
```

## 🛠️ Technology Stack

- **Framework**: Astro v5.13.7 with TypeScript
- **Styling**: Tailwind CSS v4 with custom color scheme
- **Image Optimization**: Astro's built-in image optimization + Vercel automatic optimization
- **Icons**: Font Awesome 5.15.4
- **Gallery**: Fancybox 5.0 for lightbox functionality
- **Typography**: Atkinson Hyperlegible font for accessibility (aligns with FIRST Inclusion values)
- **Deployment**: Vercel with automatic deployments and preview environments

### Custom Color Scheme

- Primary: `#512f75` (purple)
- Secondary: `#673a8e` (lighter purple)
- Accent: `#7e46a8` (accent purple)

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npx astro check`         | Run TypeScript and Astro diagnostics             |

## 🔐 Environment Variables

The project uses environment variables for configuration:

### Local Development

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Set your local values in `.env`:
   ```env
   PORTAL_PASS=your_portal_password_here
   ```

### Production Deployment

The following environment variables must be configured in your deployment environment:

- `PORTAL_PASS`: Password for team portal access

**GitHub Repository Secrets:**

- Set `PORTAL_PASS` as a repository secret in GitHub Settings → Secrets and variables → Actions → Repository secrets

**Vercel Deployment:**

- Environment variables are automatically injected during CI/CD deployment

## 🌟 Key Features

1. **Responsive Design**: Mobile-first approach with Tailwind CSS
2. **Interactive Gallery**: Fancybox lightbox functionality for team photos
3. **Smooth Scrolling**: Custom navigation with offset for fixed header
4. **Type Safety**: Full TypeScript support for team data management
5. **Performance**: Astro's static site generation with component islands
6. **Accessibility**: Atkinson Hyperlegible font for improved readability
7. **SEO Optimized**: Proper meta tags and structured data

## 📸 Content Management

### Team Members

Team members are managed via TypeScript interfaces in `src/data/teamMembers.ts`:

- Current team members (2024-2025 season)
- Historical mentors (2019-2024)
- Captain designations and roles
- Helper functions for filtering and display
- Automatic image reference management

### Images

- **Team Photos**: Stored in `public/img/team/` with naming convention `team-[name]-[role].jpg`
- **Gallery Images**: Located in `public/img/gallery/` with naming `general-2024-XX.jpg`
- **Logos**: Stored in `public/img/` with naming `logo-[name].png`
- **Automatic Optimization**: Vercel handles image optimization automatically
- **Naming Convention**: All images follow consistent kebab-case with Turkish character normalization

### Image Management Scripts

- `scripts/rename-images.js`: Automated image renaming with Turkish character normalization
- `scripts/update-references.js`: Updates code references after image renaming
- **Workflow**: Rename images → Update references → Test build → Deploy

## 🏆 Team History

- **2019**: Team founded - First year, no official competition
- **2020**: First official competition - Rookie All Star Award
- **2021**: Online competitions during pandemic
- **2022**: Return to in-person competitions - Quarterfinals
- **2023**: Consistent performance improvements
- **2024**: Strengthened sponsor relationships
- **2025**: Return to FRC competition (REEFSCAPE season)

## 🤝 Sponsors & Partners

- BSH Türkiye
- Kodluyoruz
- Çetin Group
- Saray Alüminyum
- Fikret Yüksel Foundation
- FIRST

## 📞 Contact

- **Email**: iletisim@8092.tr
- **Location**: Veliköy OSB Mesleki ve Teknik Anadolu Lisesi, Çerkezköy, Tekirdağ, Turkey
- **Website**: [8092.tr](https://8092.tr)

### Social Media

- [Instagram](https://www.instagram.com/goat8092/)
- [Twitter](https://x.com/goat8092)
- [LinkedIn](https://www.linkedin.com/company/greatest-of-all-times-8092/)
- [YouTube](https://www.youtube.com/@greatestofalltimes8092)

## 🔧 Development Notes

### Important Considerations

1. **Images**: 177+ team member and event photos with consistent naming convention
2. **Turkish Content**: All content is in Turkish - maintain proper encoding and localization
3. **Gallery Dependencies**: Fancybox requires jQuery and specific data attributes
4. **Mobile Menu**: JavaScript toggle functionality for mobile navigation
5. **Smooth Scroll**: Custom scroll functions preserve original UX
6. **Image Management**: Use provided scripts for批量 renaming and reference updates
7. **Vercel Optimization**: No manual image optimization needed - handled automatically

### Image Naming Convention

- **Team Members**: `team-[firstname]-[role].jpg` (e.g., `team-halil-captain.jpg`)
- **Gallery Images**: `general-2024-[number].jpg` (e.g., `general-2024-04.jpg`)
- **Logos**: `logo-[organization].png` (e.g., `logo-frc.png`)
- **Turkish Characters**: Automatically normalized (ı→i, ğ→g, ü→u, ş→s, ö→o, ç→c)

### Contributing

This project follows FIRST values of **Gracious Professionalism** and **Coopertition**. When contributing:

- Maintain code quality and accessibility standards
- Follow the existing TypeScript patterns
- Ensure mobile responsiveness
- Test gallery functionality thoroughly
- Preserve Turkish language content accuracy

## 📄 License

© 2025 Greatest of All Times #8092. All rights reserved.

---

_Powered by [Astro](https://astro.build) - Built with 🤖 and ❤️ by Team 8092_
