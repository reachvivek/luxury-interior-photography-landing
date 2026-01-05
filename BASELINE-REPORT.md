# TSUROV Photography - Baseline Report

**Date:** 2026-01-05
**Purpose:** Document current state before homepage restructuring
**Branch:** Creating `simplify-home-v1` for upcoming changes

---

## 1. CURRENT NAVIGATION STRUCTURE

### Desktop Navigation
**Layout:** Left logo + Right navigation (modern, left-aligned)

**Main Navigation Items:**
- Home (/)
- Portfolio (/#portfolio) - **Has Dropdown Mega Menu**
- Services (/#services)
- About (/#about)
- Blog (/blog)
- FAQ (/#faq)
- Contact (/contact)
- "Get in Touch" CTA button → /contact

### Portfolio Dropdown (Desktop Only)
**Type:** Mega menu with 4 main categories + subcategories

**Structure:**
1. **Residential** (/residential)
   - Luxury Villas
   - Apartments
   - Penthouses
   - Home Offices

2. **Hotels & Hospitality** (/hospitality)
   - Hotel Suites
   - Restaurants
   - Event Spaces

3. **Commercial & Industry** (/commercial)
   - Office Spaces
   - Co-working Spaces
   - Retail Stores
   - Showrooms

4. **Custom Interiors** (/custom-interiors)
   - Unique Architectural Elements
   - Custom Furniture Photography
   - Material Close-Ups
   - Design Details

**Total Subcategories:** 15 items across 4 main categories

### Mobile Navigation
**Layout:** 3-column header (logo, brand name, hamburger)

**Mobile Menu (Drawer):**
- All main navigation items in vertical list
- "Get in Touch" button at bottom
- Smooth slide-in animation from right
- Portfolio link goes to /#portfolio (no dropdown)

---

## 2. CURRENT HOMEPAGE SECTIONS (In Order)

### Current Section Flow:
1. **Hero Carousel** ✓ Recent update
   - 4 slides representing main service categories
   - Auto-rotation every 5 seconds
   - Left-aligned content
   - Bold Montserrat typography
   - "Order Now" CTAs → /contact

2. **About Us Section**
   - Decorative line divider
   - Main heading: "We capture your spaces with precision, artistry, and vision."
   - 2 paragraphs describing Tsurov's services
   - Center-aligned layout

3. **Trusted By Section**
   - Company logos in 3x2 grid (mobile) or 6-column (desktop)
   - Grayscale hover effect
   - Staggered fade-in animation
   - **Data Source:** `/data/trustedBy.ts`

4. **Portfolio Divider**
   - Large "Portfolio" heading with decorative borders
   - Description text
   - "150+ projects" stat

5. **Category Sections (4 sections):**
   - **Residential Spaces**
   - **Hotels & Hospitality**
   - **Commercial & Industry**
   - **Custom Interiors**

   **Each section includes:**
   - Category title
   - 4 clickable thumbnail cards (subcategories)
   - Large featured image (auto-rotates through subcategories)
   - Left/right navigation arrows
   - Click thumbnail → highlights + changes featured image
   - Auto-rotation every 8 seconds

   **Data Source:** `/data/categories.ts`
   - `residentialSpaces` (4 items)
   - `hospitalitySpaces` (3 items)
   - `commercialSpaces` (4 items)
   - `customInteriorsSpaces` (4 items)

6. **How It Works Section**
   - 3-column grid (3 steps)
   - Step 01: Consultation
   - Step 02: On-Site Shoot
   - Step 03: Curated Delivery
   - Serif numbers, light typography
   - Staggered fade-in animations

7. **Stats Section**
   - Component: `StatsSection.tsx`
   - Statistics about projects, clients, etc.

8. **Testimonials Section**
   - Component: `TestimonialsSection.tsx`
   - Client testimonials/reviews

9. **Final CTA Section**
   - Full-screen background image
   - "Ready to elevate your space?" heading
   - "Request Availability" button → /contact

10. **Footer**
    - Component: `Footer.tsx`
    - Navigation links, services links, contact info, social media

11. **Scroll to Top Button**
    - Component: `ScrollToTop.tsx`
    - Appears when scrolling down

---

## 3. CURRENT ROUTES/PAGES

### Existing Pages:
- `/` - Homepage (page.tsx)
- `/about` - About page (separate from homepage #about section)
- `/blog` - Blog listing page ✓ **Already exists**
- `/commercial` - Commercial photography page
- `/contact` - Contact page
- `/custom-interiors` - Custom interiors page
- `/hospitality` - Hospitality photography page
- `/portfolio` - Portfolio page (separate from category sections)
- `/residential` - Residential photography page
- `/services` - Services page (separate from homepage #services section)

### Notes:
- Blog page already exists and is functional
- Individual service category pages exist (residential, hospitality, commercial, custom-interiors)
- Some navigation items link to homepage anchors (#about, #services, #portfolio)
- Some have dedicated pages (/about, /services, /portfolio)

---

## 4. DATA SOURCES

### Services Data
**Location:** `/data/categories.ts`

**Type:** Hardcoded TypeScript arrays

**Structure:**
```typescript
export interface CategorySpace {
  title: string;
  image: string;
  href: string;
}

export const residentialSpaces: CategorySpace[] = [...];
export const hospitalitySpaces: CategorySpace[] = [...];
export const commercialSpaces: CategorySpace[] = [...];
export const customInteriorsSpaces: CategorySpace[] = [...];
```

**Total Items:**
- Residential: 4 items
- Hospitality: 3 items
- Commercial: 4 items
- Custom Interiors: 4 items

**Image Paths:** All use organized structure `/images/category/subcategory/descriptive-name.jpg` ✓ Recent update

### Hero Carousel Data
**Location:** `/constants/heroCarousel.ts`

**Type:** Hardcoded TypeScript array

**Structure:**
```typescript
export interface HeroSlide {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export const HERO_SLIDES: HeroSlide[] = [4 slides];
```

### Navigation Links
**Location:** `/constants/navigation.ts`

**Type:** Hardcoded TypeScript objects

**Structure:**
```typescript
NAV_LINKS.left = [Home, Portfolio, Services, About]
NAV_LINKS.right = [Blog, FAQ, Contact]
```

### Trusted By Logos
**Location:** `/data/trustedBy.ts`

**Type:** Hardcoded array of logo objects (src, alt)

### Blog Content
**Location:** `/app/blog/page.tsx`

**Type:** Hardcoded array in component file

**Structure:**
```typescript
const blogPosts = [
  {
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    slug: string;
  }
];
```

**Current Posts:** 6 blog posts (hardcoded, no CMS)

**Featured Images:** Using old `_DSC*.jpg` paths (need updating) ⚠️

**Individual Post Pages:** Not yet created (links to `/blog/[slug]` but pages don't exist)

---

## 5. BLOG IMPLEMENTATION STATUS

### ✅ What Exists:
- `/blog` page with listing layout
- 6 sample blog posts with metadata
- Featured post section (large card)
- Grid layout for recent posts (3 columns)
- Newsletter signup CTA section
- Blog link in main navigation

### ⚠️ Issues Found:
- Blog post images still use old `_DSC*.jpg` paths
- Need to update to new organized image structure
- Individual blog post pages (`/blog/[slug]`) don't exist yet
- Blog content is hardcoded in component (not scalable)

### ❌ What's Missing:
- Individual blog post detail pages
- Markdown or CMS integration
- Blog post content (currently just titles/excerpts)
- Blog preview section on homepage (not currently shown)

### 📝 Recommendation:
**Prompt 8** should:
1. Fix blog post image paths
2. Create individual blog post pages
3. Add blog preview section to homepage (show latest 3 posts)
4. Consider moving blog data to separate file or CMS

---

## 6. CONTACT FORM STATUS

### ✅ What Exists:
- `/contact` page route
- "Get in Touch" CTA button in navigation
- Multiple CTAs throughout homepage linking to /contact

### ❌ What's Missing:
- Actual contact form on /contact page
- Form validation
- Form submission handling
- Contact information display (email, phone, address)
- Google Maps integration (if needed)

### 📝 Recommendation:
**Prompt 9** should build the complete contact page with form

---

## 7. TYPOGRAPHY & STYLING

### Current Fonts:
- **Primary:** Montserrat (weights: 300-900) ✓ Recent update
- **Secondary:** Inter (weights: 300-700) ✓ Recent update
- **Loaded via:** Google Fonts API + Next.js font optimization

### Color Scheme:
- **Background:** Stone-50 (#FAFAF9), White
- **Text:** Stone-900 (dark), Stone-600 (body), Stone-500 (muted)
- **Accent:** Amber-600 (hovers), Amber-500 (links)
- **Premium Cream:** #EBE6E5 (used for accents)
- **Overlays:** Black with varying opacity

### Component Library:
- **Framework:** Tailwind CSS v4
- **UI Components:** Custom components (no shadcn/ui usage visible)
- **Animations:** Custom scroll animations via `useScrollAnimation` hook

---

## 8. KEY FINDINGS & OBSERVATIONS

### ✅ Strengths:
1. Clean, modern typography with bold Montserrat
2. Well-organized image structure (recently updated)
3. Responsive design with mobile considerations
4. Smooth animations and transitions
5. SEO-friendly image naming
6. Good component reusability (CategorySection)
7. Hero carousel working well with auto-rotation
8. Blog page foundation exists

### ⚠️ Areas Needing Work:
1. **Navigation Complexity:**
   - Portfolio mega menu has 15 subcategories
   - Creates decision paralysis for users
   - User wants to simplify to ONLY 4 main services

2. **Homepage Section Order:**
   - "Trusted By" appears very early (before portfolio)
   - No blog preview on homepage (despite blog being important)
   - No contact form section on homepage
   - Final CTA uses outdated image path

3. **Blog Issues:**
   - Blog post images need path updates
   - No individual post pages yet
   - Not featured on homepage (user said it's important)
   - Content is hardcoded (not scalable)

4. **Contact Form Missing:**
   - User emphasized "get in touch" is important
   - No form exists yet on /contact page

5. **Duplicate Routes:**
   - Some items have both anchor links and dedicated pages
   - Example: /#about AND /about page
   - Example: /#services AND /services page
   - Creates confusion about which to use

### 📋 Recommended Action Plan:

**Phase 1: Simplification (Prompts 1-3)**
- Remove portfolio mega menu
- Show only 4 service directions in navigation
- Reorder homepage sections per user's roadmap
- Polish hero carousel

**Phase 2: New Sections (Prompts 4-5)**
- Keep existing "How It Works" or enhance it
- Create new services menu section (choose best variant)

**Phase 3: Content Pages (Prompts 6-7)**
- Build/update individual service direction pages
- Move "Trusted By" section lower on homepage

**Phase 4: Blog & Contact (Prompts 8-9)** ⭐ HIGH PRIORITY
- Fix blog image paths
- Create blog preview section on homepage
- Build individual blog post pages
- Build complete contact form section on homepage
- Implement form submission

**Phase 5: Polish (Prompt 10)**
- Final QA and optimization

---

## 9. QUICK WINS IDENTIFIED

Before starting major restructuring, these quick fixes could be done:

1. **Fix Blog Image Paths** - Update 6 blog post images from `_DSC*.jpg` to organized paths
2. **Fix Final CTA Image** - Update `/images/_DSC7185.jpg` to new path
3. **Add Blog to Homepage** - Create simple 3-post preview section
4. **Clean Up Duplicate Routes** - Decide whether to use anchors or separate pages

---

## 10. BRANCH CREATION

**New Branch:** `simplify-home-v1`

This branch will contain all changes from Prompts 1-7:
- Navigation simplification
- Homepage restructuring
- New sections ("How We Work", Services Menu)
- Service direction pages
- "Trusted By" repositioning

**Separate Branches for:**
- `blog-integration` - Prompt 8 (Blog work)
- `contact-form` - Prompt 9 (Contact form)
- `final-polish` - Prompt 10 (QA & optimization)

---

## 11. NEXT STEPS

1. ✅ Create `simplify-home-v1` branch
2. ✅ Commit this baseline report
3. Start **Prompt 1:** Remove portfolio mega menu, show only 4 service directions
4. Wait for user approval before proceeding

---

## APPENDIX: Current File Structure

```
tsurov-photography/
├── app/
│   ├── about/
│   ├── blog/
│   │   └── page.tsx (Blog listing - 6 hardcoded posts)
│   ├── commercial/
│   ├── contact/
│   ├── custom-interiors/
│   ├── hospitality/
│   ├── portfolio/
│   ├── residential/
│   ├── services/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx (Homepage)
├── components/
│   ├── layout/
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── StatsSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── ui/
│   │   └── ScrollToTop.tsx
│   ├── CategorySection.tsx (Reusable)
│   ├── HeroCarousel.tsx
│   ├── Navigation.tsx
│   ├── PortfolioDropdown.tsx (Mega menu)
│   └── Preloader.tsx
├── constants/
│   ├── animation.ts
│   ├── heroCarousel.ts
│   └── navigation.ts
├── data/
│   ├── categories.ts (Residential, Hospitality, Commercial, Custom)
│   └── trustedBy.ts
├── hooks/
│   └── useScrollAnimation.ts
├── public/
│   └── images/
│       ├── residential/
│       ├── hospitality/
│       ├── commercial/
│       ├── custom/
│       └── hero/
└── IMPLEMENTATION.md (Roadmap - just created)
```

---

*End of Baseline Report*
*Ready to proceed with simplification and restructuring*
