# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ZentraTek Landing Page** - A modern, professional static website for ZentraTek, a company specializing in automation, AI, and cloud solutions for SMBs and healthcare sector in Valle del Cauca, Colombia.

**Tech Stack**: HTML5, Tailwind CSS 3, Vanilla JavaScript, Lucide Icons

**Deployment**: DigitalOcean App Platform (Web Service with `serve` for static files)

## Project Architecture

### Build System
- **Tailwind CSS** processes `assets/css/input.css` → `dist/assets/css/tailwind.css`
- **Build output** goes to `/dist/` directory (served by `serve` package in production)
- **Dev workflow**: Watch mode compiles CSS on save
- **Production build**: Minifies CSS, copies HTML/JS/images to dist
- **Production server**: `serve` package serves static files from `/dist` on port assigned by DigitalOcean

### File Structure
```
/                       # Root
├── assets/            # Source files
│   ├── css/
│   │   └── input.css  # Tailwind source with @tailwind directives
│   ├── js/
│   │   └── main.js    # Interactive features (menu, scroll, form)
│   └── images/        # Static images
├── dist/              # Build output (generated, not in git)
├── index.html         # Main landing page
├── tailwind.config.js # Brand colors, custom utilities, animations
└── postcss.config.js  # Autoprefixer config
```

### Key HTML Sections (index.html)
1. **Hero Section** - Main CTA with gradient background
2. **Problem/Solution** - Pain points + solution showcase
3. **Services** (#servicios) - 6 service cards with hover effects
4. **Industries** (#industrias) - Target sectors
5. **Technologies** - Partner logos
6. **Testimonials** (#casos-exito) - Customer success stories
7. **Why Choose Us** - Value propositions
8. **Contact Form** (#contacto) - Lead capture with validation
9. **Footer** - Links and company info

### JavaScript Features (assets/js/main.js)
- **Mobile menu toggle** - Hamburger menu with accessibility
- **Smooth scrolling** - Anchor links with offset for fixed nav
- **Intersection Observer** - Fade-in animations on scroll (`.fade-in-element` class)
- **Form validation** - Email, required fields, character limits
- **Keyboard navigation** - ESC to close menu, focus management
- **Lazy loading** - Images with `data-src` attribute

### Styling System (Tailwind)

#### Brand Colors (tailwind.config.js)
- **Primary**: `#0066FF` (blue) - Main brand, CTAs
- **Secondary**: `#00D9B1` (mint green) - "Zen" accent
- **Accent**: `#FF9500` (orange) - Important CTAs
- **Neutral**: Gray scale for text/backgrounds

#### Custom Components (input.css)
- `.btn`, `.btn-primary`, `.btn-outline` - Button styles
- `.card`, `.card-hover` - Card with elevation effect
- `.section` - Consistent section padding
- `.gradient-text` - Primary→Secondary gradient text
- `.fade-in-element` - Animated elements (requires `.visible` class from JS)

#### Animations
- Custom keyframes: `fadeIn`, `slideUp`, `slideDown`, `scaleIn`
- Utility classes: `animate-fade-in`, `animate-slide-up`
- **Note**: Respects `prefers-reduced-motion`

## Common Development Commands

### Development
```bash
npm install           # Install dependencies (first time)
npm run dev          # Start Tailwind watch mode (for development)
```
Then open `index.html` in browser (use Live Server or similar).

### Production Build & Testing
```bash
npm run build        # Minify CSS, copy files to /dist
npm start            # Serve /dist folder on http://localhost:8080
```
The `serve` package is used to serve static files in production.

## Deployment to DigitalOcean

### Configuration
- **Resource Type**: Web Service (uses `serve` package to serve static files)
- **Build Command**: `npm run build`
- **Run Command**: `npm start` (auto-detected from package.json)
- **Branch**: `main`
- **Port**: Automatically assigned via `$PORT` environment variable

### How it Works
1. DigitalOcean runs `npm install` (installs both dev and production dependencies)
2. Runs `npm run build` (compiles Tailwind CSS, copies files to `/dist`)
3. Runs `npm start` (starts `serve` HTTP server on port assigned by DigitalOcean)
4. Site is accessible via the assigned URL

### Auto-Deploy
Push to `main` branch triggers automatic rebuild:
```bash
git add .
git commit -m "Update content"
git push origin main
```

### Environment
- Node.js 16+ required
- `$PORT` variable automatically provided by DigitalOcean

## Content Management

### Updating Services
Edit service cards in `index.html` around line 250-400 (search for `id="servicios"`).
Each service has: icon, title, description, and link.

### Updating Colors
Modify `tailwind.config.js` → `theme.extend.colors`.
Rebuild CSS after changes.

### Adding New Sections
1. Add HTML section in `index.html`
2. Add `.fade-in-element` class for scroll animation
3. Use semantic HTML5 tags (`<section>`, `<article>`, etc.)
4. Ensure mobile-responsive with Tailwind's responsive prefixes (`md:`, `lg:`)

### Form Handling
Currently frontend-only validation. To connect backend:
- Option 1: Use FormSubmit.co (no backend needed)
- Option 2: Add API endpoint and update `main.js` fetch call

## Performance & SEO

### SEO Checklist
- Meta tags in `<head>` (title, description, OG tags)
- Schema.org LocalBusiness markup
- Semantic HTML with proper heading hierarchy
- Alt text on all images
- Clean URLs (hash anchors for navigation)

### Performance Best Practices
- CSS is minified in production build
- Use `.fade-in-element` sparingly (unobserved after animation)
- Lazy load images: `<img data-src="..." class="loading-skeleton">`
- Tailwind purges unused CSS automatically

### Accessibility
- Skip to content link for keyboard users
- ARIA labels on interactive elements
- Sufficient color contrast (WCAG AA)
- Keyboard navigation (menu closes on ESC)
- Semantic HTML structure

## Code Style & Conventions

### HTML
- Semantic tags (`<nav>`, `<main>`, `<section>`, `<footer>`)
- BEM-like naming for IDs (`mobile-menu-button`, `contact-form`)
- Lucide icons via `data-lucide` attributes, initialized with `lucide.createIcons()`

### CSS/Tailwind
- Mobile-first responsive design
- Use Tailwind utilities over custom CSS
- Custom components in `@layer components` (input.css)
- Spacing: sections use `.section` class (py-16 md:py-24)

### JavaScript
- ES6+ syntax (arrow functions, const/let, template literals)
- Event delegation where applicable
- Accessibility-first (ARIA, keyboard support)
- Console welcome message (easter egg)

## Important Notes

### Do NOT Commit
- `/dist` folder (generated, in .gitignore)
- `node_modules/`
- `.env` files (if added later)

### When Adding Images
1. Place in `/assets/images/`
2. Optimize (WebP format recommended)
3. Add alt text for accessibility
4. Consider lazy loading for below-fold images

### When Updating Content
- Don't change the build system unless necessary
- Maintain existing class structure for consistency
- Test mobile view (DevTools responsive mode)
- Verify Lighthouse scores after major changes

### Brand Voice
- **Tone**: Professional but approachable, pragmatic
- **Key Message**: "Tecnología sencilla, equilibrada y eficiente"
- **Avoid**: Overly technical jargon, corporate-speak
- **Focus**: ROI, simplicity, real business value

## Troubleshooting

### CSS not updating
```bash
rm -rf dist && npm run build
```

### Icons not showing
Verify Lucide is loaded and initialized:
- Check CDN script tag in HTML
- Call `lucide.createIcons()` after DOM changes

### Build fails on DigitalOcean
- Check `package.json` is in root
- Verify Node.js version compatibility
- Review build logs in DO dashboard

### Animation glitches
- Check that elements have `.fade-in-element` class
- Verify Intersection Observer is running (check console for errors)
- Test in different browsers

## Company Context

**ZentraTek** is a Colombian company (Valle del Cauca) offering:
- Automation (Make, n8n, Python)
- WhatsApp + CRM (Kommo Partner)
- Cloud & DevOps (AWS, Azure, Terraform, Kubernetes)
- Applied AI (GPT-4, RAG, voice bots)
- Custom software development (Django, Node.js, React)
- Medical audit with AI

**Target Audience**: SMBs and healthcare sector in Colombia
**Differentiators**: Pragmatic approach, 24/7 support, measurable ROI
**Competitors for Inspiration**: Agencia IDP (Colombia), Pragma, OpenAI, Clay, Cohere

## Future Enhancements

Potential additions to consider:
- Blog section (posts about automation/AI)
- Case studies page (detailed success stories)
- Multi-language support (ES/EN)
- Dark mode toggle
- Analytics integration (Google Analytics, Plausible)
- Newsletter signup
- Live chat widget (WhatsApp Business integration)

---

**Last Updated**: 2025-10-28
