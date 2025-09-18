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
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript checks
npm run optimize-images  # Optimize images
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

- Optimize images before committing
- Use descriptive alt text
- Follow naming conventions: `kebab-case.jpg`
- Store team photos in `src/images/team/`

## 🖼️ Image Guidelines

### Team Member Photos

- **Format**: JPG or PNG
- **Size**: Minimum 400x400px
- **Naming**: `firstname-lastname.jpg` or `FirstnameLastname.jpg`
- **Location**: `src/images/team/`

### Gallery Images

- **Format**: JPG (will be converted to WebP/AVIF)
- **Size**: Maximum 1920px width
- **Quality**: High quality originals (optimization is automated)
- **Location**: `src/images/` or subdirectories

### Optimization

Images are automatically optimized during build:

- Converted to WebP and AVIF formats
- Resized to appropriate dimensions
- Compressed for web delivery

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

- **Platform**: Vercel
- **Process**: Automatic deployment on push to `main`
- **Preview**: Automatic preview deployments for PRs

## 📞 Contact & Support

- **Team Email**: goat8092@gmail.com
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
