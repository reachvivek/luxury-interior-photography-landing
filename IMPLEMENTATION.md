# TSUROV Photography - Implementation Roadmap

## Project Overview
Luxury interior photography portfolio website for TSUROV, showcasing 4 main service directions with modern, bold design and clear conversion paths.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Montserrat (primary), Inter (secondary)
- **Deployment:** Vercel

---

## ✅ COMPLETED TASKS

### Phase 1: Foundation & Typography ✓
- [x] Project setup with Next.js 15 + TypeScript
- [x] Install and configure Tailwind CSS v4
- [x] Replace fonts: Montserrat + Inter (modern, bold)
- [x] Configure font weights (300-900 for Montserrat)
- [x] Update global typography styles
- [x] Set up SEO metadata structure

### Phase 2: Image Organization ✓
- [x] Scan and categorize all 58 images
- [x] Create organized folder structure:
  - `/images/residential/` (villas, apartments, penthouses, home-offices)
  - `/images/hospitality/` (hotel-suites, restaurants, event-spaces)
  - `/images/commercial/` (office-spaces, coworking-spaces, retail-stores, showrooms)
  - `/images/custom/` (architectural-elements, custom-furniture, design-details, material-closeups)
  - `/images/hero/` (panoramic hero images)
- [x] Rename all images from `_DSC*.jpg` to descriptive SEO-friendly names
- [x] Update all code references to new image paths

### Phase 3: Hero Section Redesign ✓
- [x] Simplify from 15 slides to 4 main service categories
- [x] Add description field to each slide
- [x] Change CTA from "Explore" to "Order Now"
- [x] Implement 5-second auto-rotation
- [x] Update button styling: transparent bg with white border
- [x] Improve text visibility (stronger overlays, drop-shadows, blur zones)
- [x] Left-align hero content (instead of center)

### Phase 4: Navigation Redesign ✓
- [x] Change layout: logo left, navigation right
- [x] Update typography to bold Montserrat
- [x] Add amber/gold hover colors
- [x] Maintain sticky behavior on scroll

---

## 🚧 IN PROGRESS

### Phase 5: Homepage Restructuring (CURRENT FOCUS)

Following the 10-prompt roadmap with systematic branch-based approach:

#### **Prompt 0: Baseline Snapshot** 🔄 IN PROGRESS
- [ ] Run app locally and capture current structure
- [ ] Document current menu items (desktop + mobile)
- [ ] Document current homepage sections order
- [ ] Document where services data lives
- [ ] Document where blog content comes from
- [ ] Create baseline report
- [ ] Create new branch: `simplify-home-v1`

---

## 📋 PENDING TASKS

### Phase 6: Navigation Simplification
**Branch:** `simplify-home-v1` (after Prompt 0)

#### **Prompt 1: Remove Super Menu**
- [ ] Remove category pages from main navigation
- [ ] Show ONLY 4 service directions in menu:
  - Residential Photography
  - Hotels & Hospitality Photography
  - Commercial & Industry Photography
  - Custom Interiors Photography
- [ ] Update mobile menu to match
- [ ] Remove unused category page routes

### Phase 7: Homepage Section Reordering

#### **Prompt 2: Restructure Homepage**
New section order:
1. [ ] Hero Carousel (4 slides) ✓ Already done
2. [ ] "How We Work" Section (3 steps - NEW)
3. [ ] Services Menu (4 directions - NEW)
4. [ ] Blog Preview Section (latest 3 posts - NEW) **IMPORTANT**
5. [ ] "Trusted By" Section (move existing logos down)
6. [ ] Contact Form Section (NEW) **IMPORTANT**
7. [ ] Footer

#### **Prompt 3: Hero Slider Polish**
- [ ] Review current 4-slide implementation
- [ ] Optimize image loading and transitions
- [ ] Ensure descriptions are clear and compelling
- [ ] Test auto-rotation timing (currently 5s)
- [ ] Verify CTAs link correctly to contact

#### **Prompt 4: "How We Work" Section**
Add new section after hero with 3-step process:
- [ ] Design 3-column layout (mobile: stack)
- [ ] Create step cards with icons/numbers
- [ ] Content structure:
  - Step 1: Consultation & Planning
  - Step 2: Professional Photography Session
  - Step 3: Editing & Delivery
- [ ] Add subtle animations on scroll
- [ ] Match luxury brand aesthetic

#### **Prompt 5: Services Menu (2 Variants)**
Create 2 design options for user to choose:

**Variant A: Tabs Style**
- [ ] Horizontal tabs for 4 services
- [ ] Content area shows description + 4-6 image thumbnails
- [ ] Click thumbnail → opens lightbox/gallery
- [ ] Mobile: tabs become dropdown or stacked

**Variant B: Cards Grid**
- [ ] 4 large cards in 2x2 grid
- [ ] Each card: background image + overlay + title + description
- [ ] Hover reveals "View Portfolio" button
- [ ] Click → goes to dedicated service page
- [ ] Mobile: single column stack

- [ ] Implement both variants
- [ ] Deploy to separate preview URLs
- [ ] Get user feedback on which to keep

#### **Prompt 6: Service Direction Pages**
Create 4 dedicated pages with sub-navigation:

**Page Structure for each:**
- [ ] `/residential` - Villas, Apartments, Penthouses, Home Offices
- [ ] `/hospitality` - Hotel Suites, Restaurants, Event Spaces
- [ ] `/commercial` - Office Spaces, Coworking Spaces, Retail Stores, Showrooms
- [ ] `/custom` - Architectural Elements, Custom Furniture, Design Details

**Each page includes:**
- [ ] Hero banner with service-specific image
- [ ] Description of service offerings
- [ ] Sub-navigation tabs/pills for subcategories
- [ ] Masonry/grid gallery for each subcategory
- [ ] Lightbox for image viewing
- [ ] CTA section ("Ready to book? Get in touch")
- [ ] Related case studies/testimonials

#### **Prompt 7: "Trusted By" Section**
- [ ] Move existing company logos section lower on homepage
- [ ] Position after Services Menu, before Blog
- [ ] Ensure responsive layout
- [ ] Add subtle scroll animation

#### **Prompt 8: Blog Preview Section** ⭐ IMPORTANT
Add latest blog posts section to homepage:

- [ ] Create `/blog` directory structure in app
- [ ] Set up blog data source (Markdown files or CMS)
- [ ] Create blog post schema (title, excerpt, image, date, slug)
- [ ] Design blog preview component (3 latest posts)
- [ ] Layout: 3-column grid (mobile: single column)
- [ ] Each card: image, title, excerpt, date, "Read More" link
- [ ] Add "View All Posts" CTA
- [ ] Create individual blog post template
- [ ] Add blog posts to main navigation
- [ ] Style with luxury aesthetic matching brand

**Sample Blog Posts to Create:**
- [ ] "5 Tips for Preparing Your Space for Photography"
- [ ] "How Luxury Interior Photography Increases Property Value"
- [ ] "Behind the Scenes: Photographing the Flame Towers"

#### **Prompt 9: Contact Form Section** ⭐ IMPORTANT
Add "Get in Touch" section at bottom of homepage:

- [ ] Design contact form with luxury aesthetic
- [ ] Form fields:
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Service Interest (dropdown: 4 main services)
  - Project Type (dropdown: subcategories based on service)
  - Message (textarea)
  - Budget Range (optional dropdown)
- [ ] Add form validation
- [ ] Set up form submission (EmailJS, Formspree, or API route)
- [ ] Success message after submission
- [ ] Error handling
- [ ] Add contact info alongside form:
  - Email address
  - Phone number
  - Social media links
  - Office location (if applicable)
- [ ] Mobile responsive layout
- [ ] Add subtle background (gradient or image with overlay)

#### **Prompt 10: Final QA & Polish**
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsiveness check (320px to 1920px)
- [ ] Performance audit (Lighthouse score 90+)
- [ ] SEO audit (meta tags, alt texts, structured data)
- [ ] Accessibility check (WCAG 2.1 AA compliance)
- [ ] Image optimization (WebP format, lazy loading)
- [ ] Code cleanup (remove unused imports, console logs)
- [ ] Fix any TypeScript warnings
- [ ] Test all links and navigation
- [ ] Verify form submissions work
- [ ] Test blog post routing
- [ ] Check analytics integration
- [ ] Final client review

---

## 🎯 PRIORITY ORDER

Work through tasks in this exact order:

### Week 1: Core Structure
1. ✅ Baseline snapshot + branch creation (Prompt 0)
2. Navigation simplification (Prompt 1)
3. Homepage reordering (Prompt 2)
4. Hero polish (Prompt 3)

### Week 2: New Sections
5. "How We Work" section (Prompt 4)
6. Services menu - 2 variants (Prompt 5)
7. Get user decision on variant

### Week 3: Content Pages
8. Service direction pages (Prompt 6)
9. Move "Trusted By" section (Prompt 7)

### Week 4: Blog & Contact ⭐
10. Blog preview section (Prompt 8) - IMPORTANT
11. Contact form section (Prompt 9) - IMPORTANT

### Week 5: Polish
12. Final QA and launch prep (Prompt 10)

---

## 📝 BRANCH STRATEGY

Each major change gets its own branch for review:

- `main` - Production-ready code
- `simplify-home-v1` - Homepage restructuring (Prompts 0-7)
- `blog-integration` - Blog section (Prompt 8)
- `contact-form` - Contact form section (Prompt 9)
- `final-polish` - QA and polish (Prompt 10)

**Workflow:**
1. Create feature branch from `main`
2. Implement changes
3. Test locally
4. Deploy preview to Vercel
5. Get user approval
6. Merge to `main`
7. Deploy to production

---

## 🚀 DEPLOYMENT

**Current Status:**
- Production URL: `tsurov.vercel.app`
- Preview deployments: Auto-generated for each branch

**Next Deployments:**
1. Deploy `simplify-home-v1` for review
2. Deploy both services menu variants for comparison
3. Deploy blog integration preview
4. Deploy contact form preview
5. Final production deployment

---

## 📊 SUCCESS METRICS

**Performance Goals:**
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

**SEO Goals:**
- Lighthouse SEO Score: 100
- All images have alt text
- Proper heading hierarchy
- Schema.org markup implemented

**Business Goals:**
- Clear value proposition above fold
- Multiple conversion points (hero CTA, services CTAs, contact form)
- Blog content for SEO and engagement
- Easy navigation to 4 main services

---

## 📞 QUESTIONS FOR CLIENT

Before proceeding with certain tasks, need clarification on:

1. **Blog Content:**
   - Do you have existing blog posts?
   - Will you write content or need help?
   - Preferred CMS or Markdown files?

2. **Contact Form:**
   - Preferred email for form submissions?
   - Need CRM integration (HubSpot, etc.)?
   - Phone number and office address to display?

3. **Services Menu:**
   - Which variant do you prefer (tabs vs cards)?
   - Or should we build both for comparison?

4. **Social Media:**
   - Instagram, Facebook, LinkedIn URLs?
   - Twitter/X handle for metadata?

5. **Analytics:**
   - Google Analytics tracking ID?
   - Any other tracking pixels needed?

---

## 🛠️ DEVELOPMENT COMMANDS

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📄 LICENSE & CREDITS

**Client:** TSUROV Photography
**Developer:** Claude Code
**Framework:** Next.js 15
**Deployment:** Vercel

---

*Last Updated: 2026-01-05*
