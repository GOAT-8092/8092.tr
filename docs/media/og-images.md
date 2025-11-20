# Open Graph Image Guidelines for G.O.A.T. 8092

## Overview

This document provides guidelines for creating language-specific Open Graph (OG) images for the G.O.A.T. 8092 website. These images appear when the website is shared on social media platforms like Facebook, Twitter, LinkedIn, and WhatsApp.

## Image Specifications

### Technical Requirements

- **Dimensions**: 1200 x 630 pixels (Facebook/LinkedIn optimal)
- **Aspect Ratio**: 1.91:1
- **File Format**: PNG (preferred) or JPG
- **File Size**: Under 1 MB (ideally under 500 KB for fast loading)
- **Color Mode**: RGB
- **Resolution**: 72 DPI

### File Naming

- **Turkish Version**: `og-image-tr.png`
- **English Version**: `og-image-en.png`
- **Location**: `/public/` directory

## Design Guidelines

### Brand Colors

Use the official G.O.A.T. 8092 color palette:

- **Primary Purple**: #512f75
- **Secondary Purple**: #673a8e
- **Accent Purple**: #7e46a8
- **White**: #FFFFFF
- **Black/Dark Gray**: #1F2937
- **Light Gray**: #F3F4F6

### Content Elements

#### Must Include:

1. **Team Logo**: G.O.A.T. 8092 logo (logo-black.svg or logo-white.svg)
2. **Team Number**: #8092 (prominently displayed)
3. **Team Name**: "Greatest of All Times" or "G.O.A.T."
4. **Geographic Identifier**: "Tekirdağ" or "Tekirdağ, Turkey"
5. **FIRST Branding**: "FRC" or "FIRST Robotics Competition"

#### Optional Elements:

- Rookie All Star Award badge/icon
- Robot silhouette or photo
- Season year (2026 REBUILT)
- Team motto or tagline
- Background pattern or texture

### Layout Recommendations

#### Safe Zones

Social media platforms may crop OG images differently:

- **Top/Bottom**: Keep critical content 60px from edges
- **Left/Right**: Keep critical content 40px from edges
- **Center Focus**: Place most important elements in the center 800 x 418px area

#### Text Hierarchy

1. **Primary Text** (Team Name/Number): 60-80px font size, bold
2. **Secondary Text** (Location/Description): 30-45px font size, regular
3. **Tertiary Text** (Tagline): 20-30px font size, light

### Typography

- **Primary Font**: Atkinson Hyperlegible (for accessibility)
- **Alternate**: Inter, Arial, or Helvetica
- **Font Weight**: Bold (700) for headlines, Regular (400) for body text
- **Contrast**: Ensure WCAG AA compliance (4.5:1 minimum)

## Language-Specific Variations

### Turkish Version (`og-image-tr.png`)

**Primary Text:**

```
G.O.A.T. #8092
Greatest of All Times
```

**Secondary Text:**

```
Tekirdağ'ın İlk ve Tek FRC Takımı
FIRST Robotics Competition
```

**Optional Tagline:**

```
2019'dan Beri FIRST Değerleriyle
Rookie All Star 2020
```

**Sample Layout:**

```
┌─────────────────────────────────────────────┐
│  [Logo]                           FRC 2026  │
│                                              │
│         G.O.A.T. #8092                       │
│    Greatest of All Times                     │
│                                              │
│   Tekirdağ'ın İlk FRC Takımı                │
│   FIRST Robotics Competition                 │
│                                              │
│         [Robot Image/Silhouette]             │
│                                              │
│   🏆 Rookie All Star 2020                   │
└─────────────────────────────────────────────┘
```

### English Version (`og-image-en.png`)

**Primary Text:**

```
G.O.A.T. #8092
Greatest of All Times
```

**Secondary Text:**

```
Tekirdağ's First and Only FRC Team
FIRST Robotics Competition
```

**Optional Tagline:**

```
Building the Future Since 2019
Rookie All Star 2020
```

**Sample Layout:**

```
┌─────────────────────────────────────────────┐
│  [Logo]                           FRC 2026  │
│                                              │
│         G.O.A.T. #8092                       │
│    Greatest of All Times                     │
│                                              │
│   Tekirdağ's First FRC Team                 │
│   FIRST Robotics Competition                 │
│                                              │
│         [Robot Image/Silhouette]             │
│                                              │
│   🏆 Rookie All Star 2020                   │
└─────────────────────────────────────────────┘
```

## Design Tools

### Recommended Software:

- **Adobe Photoshop** (Professional)
- **Figma** (Web-based, collaborative)
- **Canva** (User-friendly, templates)
- **GIMP** (Free, open-source)
- **Sketch** (Mac only)

### Design Resources:

- Team logos: `/public/logo-black.svg`, `/public/logo-white.svg`
- Existing OG image: `/public/og-image.png` (reference)
- Robot photos: `/public/img/gallery/` directory
- Color palette: Defined in Tailwind config

## Implementation

### File Placement

After creating the images, place them in:

```
/public/og-image-tr.png  (Turkish version)
/public/og-image-en.png  (English version)
```

### Code Integration

The website is already configured to use language-specific OG images in `src/layouts/Layout.astro`:

```astro
<meta
  property="og:image"
  content={currentLang === 'en'
    ? 'https://www.8092.tr/og-image-en.png'
    : 'https://www.8092.tr/og-image-tr.png'}
/>
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="FRC Team 8092 - GOAT - Tekirdağ's First Robotics Team" />
```

### Testing

#### Validation Tools:

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Open Graph Checker**: https://www.opengraph.xyz/

#### Testing Checklist:

- [ ] Image displays correctly on Facebook
- [ ] Image displays correctly on Twitter
- [ ] Image displays correctly on LinkedIn
- [ ] Image displays correctly on WhatsApp
- [ ] Image loads quickly (< 1 second)
- [ ] Text is readable at thumbnail size
- [ ] Colors match brand guidelines
- [ ] Language-specific content is correct
- [ ] File size is optimized (< 500 KB)

## Quality Checklist

Before finalizing the OG images:

### Visual Quality

- [ ] Image is sharp and clear (no pixelation)
- [ ] Colors are vibrant and accurate
- [ ] Logo is crisp and recognizable
- [ ] Text is legible at all sizes
- [ ] Background enhances readability

### Brand Consistency

- [ ] Uses official team colors
- [ ] Logo placement is consistent
- [ ] Typography matches website
- [ ] Overall style aligns with team identity

### Technical Compliance

- [ ] Correct dimensions (1200 x 630 px)
- [ ] File size under 1 MB
- [ ] PNG or JPG format
- [ ] Proper file naming

### Content Accuracy

- [ ] Team number is correct (#8092)
- [ ] Team name spelling is correct
- [ ] Language-specific text is accurate
- [ ] No typos or grammatical errors

### Accessibility

- [ ] Sufficient color contrast (WCAG AA)
- [ ] Text size is readable
- [ ] Alt text is descriptive

## Maintenance

### When to Update:

- **New Season**: Update with current season year/theme (e.g., "FRC 2026 REBUILT")
- **Major Awards**: Add new awards or achievements
- **Branding Changes**: Update if team logo or colors change
- **Robot Redesign**: Feature new robot photos
- **Quarterly Review**: Check social media platform requirements

### Version Control:

Keep previous versions with date stamps:

```
og-image-tr-2025-11.png
og-image-en-2025-11.png
```

## Current Status

✅ **Layout.astro Updated**: Code is configured for language-specific images
❌ **Images Not Yet Created**: Need to design and create og-image-tr.png and og-image-en.png

## Next Steps

1. **Gather Assets**
   - Export high-resolution team logo
   - Select best robot photo from gallery
   - Prepare award badges/icons

2. **Design Images**
   - Create Turkish version (og-image-tr.png)
   - Create English version (og-image-en.png)
   - Follow guidelines above

3. **Optimize**
   - Compress images to < 500 KB
   - Ensure crisp rendering at 1200 x 630 px
   - Export in PNG format

4. **Deploy**
   - Place files in `/public/` directory
   - Test with social media validators
   - Share test posts on each platform

5. **Monitor**
   - Check analytics for social media traffic
   - Gather feedback on image appeal
   - Iterate based on performance

## Resources

### Templates

Consider using Canva templates for OG images:

- Search: "Facebook Cover 1200x630"
- Search: "Open Graph Image Template"

### Inspiration

Look at other successful FRC teams' OG images:

- Team 254 (Chezy Champs)
- Team 1114 (Simbotics)
- Team 2056 (OP Robotics)

### FIRST Branding Guidelines

- https://www.firstinspires.org/brand
- Ensure compliance with FIRST trademark usage

---

**Document Version**: 1.0
**Last Updated**: November 18, 2025
**Author**: Claude Code SEO Enhancement
**For**: G.O.A.T. 8092 - Greatest of All Times
