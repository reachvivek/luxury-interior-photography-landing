# Nashray Interior Photography

A modern, high-performance landing page for luxury interior photography services specializing in residential, hospitality, commercial, and custom interior spaces in Dubai and the UAE.

## Overview

Nashray is a premium interior photography portfolio website built with Next.js 16, featuring immersive full-screen galleries, authentic client testimonials, and seamless WhatsApp integration for instant booking inquiries. The application showcases professional photography work with elegant animations, optimized performance, and a focus on visual storytelling.

## Tech Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.26** - Animation library
- **Lucide React** - Modern icon library

### Additional Libraries
- **React Hook Form** - Form validation and management
- **Vercel Analytics** - Performance and visitor analytics

## Project Structure

```
tsurov-photography/
├── app/                          # Next.js App Router pages
│   ├── about/                    # About page
│   ├── blog/                     # Blog listing
│   ├── commercial/               # Commercial photography
│   ├── contact/                  # Contact form
│   ├── custom-interiors/         # Custom interiors portfolio
│   ├── faq/                      # FAQ page
│   ├── hospitality/              # Hospitality photography
│   ├── residential/              # Residential photography
│   ├── services/                 # Services overview
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
│
├── components/                   # Reusable components
│   ├── blog/                     # Blog components
│   ├── cards/                    # Card components
│   ├── hero/                     # Hero sections
│   ├── layout/                   # Layout components
│   ├── portfolio/                # Portfolio displays
│   ├── sections/                 # Page sections
│   ├── services/                 # Service components
│   ├── ui/                       # Base UI components
│   ├── HeroCarousel.tsx          # Homepage carousel
│   ├── MobileServicesShowcase.tsx # Mobile services
│   ├── Navigation.tsx            # Main navigation
│   └── WhatsAppButton.tsx        # Floating WhatsApp button
│
├── constants/                    # Application constants
│   ├── animation.ts              # Animation timings
│   ├── heroCarousel.ts           # Carousel config
│   ├── navigation.ts             # Navigation structure
│   └── theme.ts                  # Theme configuration
│
├── data/                         # Static content
│   ├── categories.ts             # Portfolio categories
│   ├── contact.ts                # Contact information
│   ├── features.ts               # Service features
│   ├── gallery.ts                # Gallery images
│   ├── journalPosts.ts           # Blog posts
│   ├── portfolio.ts              # Portfolio items
│   ├── processSteps.ts           # Process steps
│   ├── services.ts               # Service offerings
│   ├── stats.ts                  # Statistics
│   ├── testimonials.ts           # Client testimonials
│   └── trustedBy.ts              # Client logos
│
├── hooks/                        # Custom React hooks
│   ├── useScrollAnimation.ts     # Scroll animations
│   └── useScrollPosition.ts      # Scroll tracking
│
├── lib/                          # Utility libraries
│   └── utils.ts                  # Helper functions
│
├── public/                       # Static assets
│   └── images/                   # Portfolio images
│       ├── residential/          # Residential category
│       ├── hospitality/          # Hospitality category
│       ├── commercial/           # Commercial category
│       └── custom/               # Custom interiors
│
├── types/                        # TypeScript definitions
│   └── index.ts                  # Global types
│
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

## Key Features

### User Experience
- **Full-Screen Mobile Services**: Each service category displayed in immersive full-viewport cards on mobile
- **Animated Hero Carousel**: Auto-rotating image carousel with smooth transitions
- **Scroll Animations**: Intersection Observer-based animations trigger as content enters viewport
- **WhatsApp Integration**: Floating contact button with pre-filled booking messages
- **Authentic Testimonials**: Client reviews with profile photos and company affiliations featuring Dubai landmarks

### Technical Features
- **Server-Side Rendering**: Fast initial page loads with Next.js App Router
- **Optimized Images**: Next.js Image component with automatic WebP conversion and lazy loading
- **Type Safety**: Full TypeScript coverage across components and data
- **Responsive Design**: Mobile-first approach with tailored layouts for all screen sizes
- **Performance Optimized**: Code splitting, lazy loading, and minimal JavaScript bundle

### Content Management
- **Centralized Data**: All content stored in typed data files for easy maintenance
- **Reusable Components**: Card components for features, process steps, and journal posts
- **Portfolio Categories**: Four main service categories with subcategory support
- **Gallery System**: Dual-row infinite scroll galleries with 40 unique images

## Application Flow

```
Homepage Flow:
├── Hero Carousel (Visual Impact)
├── How It Works (4-Step Process)
├── Services (Mobile: Full-Screen, Desktop: Grid)
├── Why Choose Us (Feature Cards)
├── About Us (Brand Story)
├── Trusted By (Client Logos)
├── Statistics (Quantified Results)
├── Testimonials (Client Reviews)
├── Journal (Blog Posts)
├── Portfolio Gallery (Selected Work)
├── Contact Form (WhatsApp Integration)
└── Final CTA (Full-Screen)

Navigation Structure:
├── Home
├── Services Dropdown
│   ├── Residential
│   ├── Hospitality
│   ├── Commercial
│   └── Custom Interiors
├── About
├── Blog
├── FAQ
└── Contact
```

## Setup & Installation

### Prerequisites
```bash
Node.js 18+ or 20+
npm or yarn
```

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/reachvivek/luxury-interior-photography-landing.git
cd tsurov-photography

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP=971502060674

# Instagram Configuration
NEXT_PUBLIC_INSTAGRAM=dubai.tsurov

# Designer Contact
NEXT_PUBLIC_DESIGNER_WHATSAPP=971501480042

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://nashray.com
```

## Configuration

### next.config.ts
Configured for remote image patterns to support profile photos from randomuser.me API:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
    ],
  },
};
```

### tailwind.config.ts
Custom Tailwind configuration with:
- Stone color palette for luxury aesthetic
- Custom fonts: Cormorant Garamond (serif), Montserrat, Inter
- Extended animations for infinite scroll effects
- Mobile-first breakpoints

## Design System

### Color Palette
- **Primary**: Stone palette (50-900) for neutral luxury aesthetic
- **Accent**: Amber for highlights and decorative elements
- **Text**: Stone-900 for headings, Stone-600 for body

### Typography
- **Headings**: Cormorant Garamond (serif) with light weights (300-400)
- **Body**: Montserrat or Inter with normal weights (300-500)
- **Tracking**: Generous letter-spacing for luxury feel

### Animation Principles
- **Timing**: 700-1000ms durations for smooth, luxurious transitions
- **Easing**: ease-out for natural deceleration
- **Scroll Triggers**: 0.15-0.2 viewport threshold
- **Stagger**: 100-150ms delays between sequential animations

## Performance

### Optimization Strategies
- Next.js Image component with responsive sizes
- Priority loading for above-the-fold images
- Lazy loading for below-the-fold content
- Code splitting by route
- Minimal JavaScript bundle size

### Image Optimization
- Automatic WebP conversion
- Responsive image sizes based on viewport
- Proper alt text for accessibility
- Lazy loading with intersection observer

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Development Guidelines

### Component Structure
- Functional components with React hooks
- TypeScript interfaces for all props
- Separation of concerns (presentation vs logic)
- Reusable components in `components/` directory

### Code Style
- ESLint for code quality
- TypeScript strict mode
- Consistent naming conventions
- Meaningful variable and function names

### Git Workflow
- Feature branch development
- Descriptive commit messages
- Clean commit history

## License

Proprietary - All rights reserved

## Contact

For inquiries or support:
- Website: https://nashray.com
- WhatsApp: +971502060674
- Instagram: @dubai.tsurov

---

Built with Next.js 16, TypeScript, and Tailwind CSS 4
