# Contributing to FRC Team 8092 Website

Welcome to the FRC Team 8092 "Greatest of All Times" website project! We're excited that you want to contribute. This document provides guidelines and information for contributors.

## 🤖 FIRST Values

This project follows FIRST values of **Gracious Professionalism** and **Coopertition**:

- **Discovery**: We explore new skills and ideas
- **Innovation**: We use creativity and persistence to solve problems
- **Impact**: We apply what we learn to improve our world
- **Inclusion**: We respect each other and embrace our differences
- **Teamwork**: We are stronger when we work together
- **Fun**: We enjoy and celebrate what we do!

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/GOAT-8092/website.git
   cd website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:4321`

## 🛠️ Development Workflow

### Code Quality

We use several tools to maintain code quality:

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Husky**: Git hooks for pre-commit checks

#### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run type-check       # Run TypeScript checks
npm run clean            # Clean build artifacts
npm run analyze          # Analyze bundle size
npm run perf-audit       # Performance audit with Lighthouse
```

### Pre-commit Hooks

Pre-commit hooks automatically run when you commit:

- ESLint checks and fixes
- Prettier formatting
- TypeScript validation

### Branch Structure

- `main`: Production-ready code
- `develop`: Development branch (if applicable)
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates

## 📝 Commit Messages

We follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```
feat(team): add new team member profile component
fix(gallery): resolve image loading issues
docs(readme): update installation instructions
```

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint rules
- Use meaningful variable names
- Add JSDoc comments for complex functions

### Astro Components

- Use `.astro` extension for Astro components
- Keep components focused and single-purpose
- Use TypeScript in frontmatter
- Follow Astro best practices

### CSS/Styling

- Use Tailwind CSS utility classes
- Custom styles in `src/styles/global.css`
- Follow mobile-first responsive design
- Maintain accessibility (WCAG 2.1 AA)

### Images

- **Automatic Optimization**: Vercel handles image optimization automatically
- **Naming Convention**: Use kebab-case with Turkish character normalization
- **Team Photos**: Store in `public/img/team/` with format `team-[name]-[role].jpg`
- **Gallery Images**: Store in `public/img/gallery/` with format `general-2024-[number].jpg`
- **Logos**: Store in `public/img/` with format `logo-[name].png`
- **Alt Text**: Always provide descriptive alt text for accessibility
- **Turkish Characters**: Use automated scripts for proper normalization

### Image Management Workflow

1. **Adding New Images**:

   ```bash
   # Place images in appropriate directory
   # Follow naming convention
   # Update data files if needed
   # Test build: npm run build
   ```

2. **Bulk Renaming (when needed)**:

   ```bash
   # Preview renaming plan
   node scripts/rename-images.js preview

   # Execute renaming (when ready)
   node scripts/rename-images.js rename
   ```

3. **Update References**:
   ```bash
   # Update all code references after renaming
   node scripts/update-references.js
   ```

## 🖼️ Image Guidelines

### Team Member Photos

- **Format**: JPG (recommended) or PNG
- **Size**: Minimum 400x400px, square ratio preferred
- **Naming**: `team-[firstname]-[role].jpg` (e.g., `team-halil-captain.jpg`)
- **Location**: `public/img/team/`
- **Turkish Names**: Use automated script for character normalization

### Gallery Images

- **Format**: JPG (recommended)
- **Size**: Maximum 1920px width, maintain aspect ratio
- **Quality**: High quality originals
- **Naming**: `general-2024-[number].jpg` (e.g., `general-2024-04.jpg`)
- **Location**: `public/img/gallery/`
- **Metadata**: Update `src/data/gallery-data.json` with titles and descriptions

### Logos and Sponsor Images

- **Format**: PNG with transparency preferred
- **Naming**: `logo-[organization].png` (e.g., `logo-frc.png`)
- **Location**: `public/img/`
- **Optimization**: Vercel handles automatic optimization

### Image Optimization

Images are automatically optimized by Vercel:

- Converted to modern formats (WebP/AVIF)
- Responsive sizing and compression
- CDN delivery for global performance
- No manual optimization required

## 🌐 Internationalization

- **Primary Language**: Turkish
- **Character Encoding**: UTF-8
- **Future**: English translation support planned
- **Content**: Maintain cultural context and accuracy

## ♿ Accessibility

We strive for WCAG 2.1 AA compliance:

- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Maintain color contrast ratios
- Use Atkinson Hyperlegible font for readability

## 🧪 Testing

Currently using:

- TypeScript type checking
- ESLint for code quality
- Astro check for component validation

Future additions planned:

- Unit tests with Vitest
- Visual regression testing
- Lighthouse CI for performance

## 📱 Browser Support

Target browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

- **Platform**: Vercel with enterprise-grade infrastructure
- **Process**: Automatic deployment on push to `main`
- **Preview**: Automatic preview deployments for PRs
- **Performance**: Global CDN, automatic optimization, and edge caching
- **Monitoring**: Built-in analytics and performance monitoring
- **Security**: HTTPS, DDoS protection, and web application firewall

### Deployment Workflow

1. **Development**: Work on feature branches
2. **Testing**: Use preview deployments for review
3. **Code Review**: PR review with automated checks
4. **Merge**: Merge to `main` triggers production deployment
5. **Monitoring**: Monitor performance and errors post-deployment

## 📞 Contact & Support

- **Team Email**: iletisim@8092.tr
- **Issues**: Use GitHub Issues
- **Questions**: Ask in discussions or issues

## 🏆 Recognition

Contributors will be recognized in:

- GitHub contributors list
- Website credits (if significant contribution)
- Team acknowledgments

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to the FRC Team 8092 website! Together, we build not just code, but the future. 🤖⚡
