# TSUROV Hero Design Rationale

**Status:** FINAL AND LOCKED ✅
**Date:** 2026-01-05
**Design Philosophy:** Luxury Editorial, Premium Photography Portfolio

---

## Hero CTA Strategy: Why "View Portfolio" (Not "Book Now")

### Short Answer
**Yes** — this hero is aligned with what Tsurov wanted.
He did **not** want a "Book now / Order now" style hero.

---

## What Tsurov ACTUALLY Wanted

### 1. He Wanted Simplification, Not Selling Pressure

**From the client feedback:**
- "Website is completely over"
- "Too much options"
- "Decision for client must be easy"
- "Main page we need only four main directions"

**This tells us:**
👉 He wants **clarity and structure first**, not conversion-first CTAs.

A "Book now / Order now" hero is a **conversion-first pattern**.
He never asked for that.

---

### 2. He Wanted the Hero to Define Direction, Not Force Action

**What he repeatedly emphasized:**
- Main page = show directions
- Details go inside service pages
- Hero → explain what kind of photography this is
- Let the client choose calmly

**That maps to:**
- ✅ Category label (Hotels & Hospitality)
- ✅ Strong emotional headline
- ✅ Light, editorial CTA (Explore / View portfolio)

**NOT:**
- ❌ "Book a shoot"
- ❌ "Order now"
- ❌ "Get price"

---

### 3. He Explicitly Cared About How It Feels, Not How Fast It Converts

**Key signal from client:**
> "The design… you can do how you prefer."

This line is important. It means:
- He trusts taste
- He's not micromanaging buttons
- He's reacting emotionally, not tactically

**And emotionally, the thing he kept reacting against was:**
- Clutter
- Overload
- Pressure

---

## Correct User Funnel

Based on client intent, the correct funnel is:

```
Hero → Portfolio → Service Page → Get in Touch
```

**NOT:**
```
Hero → Book Now ❌
```

### Homepage Role (According to Tsurov)
1. Show 4 directions
2. Show quality
3. Show professionalism
4. Reduce confusion

### Service Pages Role
1. Explain sub-categories
2. Show galleries
3. Where decisions mature

### Contact / Booking
- Comes after trust
- Not the first interaction

---

## Does the Current Hero Match This Vision?

### Current Hero Elements:
- ✅ Clear category: "HOTELS & HOSPITALITY"
- ✅ Aspirational headline: "Elevating Guest Experiences"
- ✅ Editorial tone
- ✅ CTA: "View Portfolio"

**This hero:**
- Reduces cognitive load
- Signals quality
- Lets the client explore without pressure

👉 This matches Tsurov's thinking far more than a "Book now" button ever would.

---

## What the Client Did NOT Ask For

Nowhere in:
- Client transcript
- Design document
- Feedback loop

Did he say:
- ❌ "We need booking on hero"
- ❌ "We need strong CTA"
- ❌ "We need order button"
- ❌ "We need leads immediately"

In fact, **every complaint he had was about too much, not too little.**

---

## Final Conclusion

### Tsurov Wanted:
- ✅ Directional hero
- ✅ Editorial, calm, premium feel
- ✅ Clear service identity
- ✅ Reduced pressure

### He Did NOT Want:
- ❌ Booking-first hero
- ❌ Aggressive CTA
- ❌ Sales language

**Therefore:**
👉 This hero is **much closer** to what he wanted than anything with "Book / Order / Buy" on it.

---

## Design Decisions - Final Polish

### Typography System
- **Headline Font:** Cormorant Garamond 400 (luxury serif)
- **Line Height:** 1.05 (tight, editorial)
- **Category Label:** 10px/xs, 65% opacity, 0.4em tracking
- **Description:** 95% opacity for maximum readability
- **CTA:** xs, font-normal, tracking-widest, rounded-full

### Visual Hierarchy
1. **Category Label** - Small, subtle, uppercase
2. **Headline** - Massive, serif, center-aligned
3. **Description** - Supporting context, light weight
4. **CTA** - Transparent, soft border, premium feel

### Navigation Controls
- **Arrows:** 60% opacity by default, 100% on hover
- **Positioning:** Edge-aligned at center vertical
- **Philosophy:** Controls don't compete with content

### Color & Contrast
- **Text:** White with strong drop-shadows
- **Overlays:** Subtle gradients (black/50-60)
- **Buttons:** Transparent with white/70 border
- **Hover States:** Full white background, stone-900 text

---

## What NOT to Touch ❌

**DO NOT:**
- ❌ Change font family (Cormorant Garamond is locked)
- ❌ Increase headline weight (400 is correct)
- ❌ Add more text or animations
- ❌ Reword headlines or CTAs
- ❌ Add "Book now" or "Order now" CTAs
- ❌ Make arrows more prominent
- ❌ Add aggressive conversion elements

**This hero is already saying enough.**

---

## Approved Hero Slides

### 1. Residential
- **Category:** RESIDENTIAL
- **Headline:** Luxury Living Redefined
- **CTA:** View Portfolio → /residential

### 2. Hotels & Hospitality
- **Category:** HOTELS & HOSPITALITY
- **Headline:** Elevating Guest Experiences
- **CTA:** View Portfolio → /hospitality

### 3. Commercial & Industry
- **Category:** COMMERCIAL & INDUSTRY
- **Headline:** Professional Spaces Captured
- **CTA:** View Portfolio → /commercial

### 4. Custom Interiors
- **Category:** CUSTOM INTERIORS
- **Headline:** Architectural Artistry
- **CTA:** View Portfolio → /custom-interiors

---

## Where Booking SHOULD Be Placed

**NOT on hero.** The correct placement:

1. **Service Pages** - After user sees portfolio
2. **Contact Page** - Dedicated conversion page
3. **Navigation** - "Get in Touch" CTA (top-right)
4. **Footer** - Secondary contact CTA

**Conversion happens after trust is established.**

---

## Key Takeaway

**From here on: Think editor, not designer.**

- Less change = more authority
- The brand now feels premium without trying to prove it
- Editorial aesthetic achieved ✓

---

## Files Modified (Final Polish)

**Branch:** `simplify-home-v1`

### Core Components:
- `components/HeroCarousel.tsx` - Hero section layout, typography, arrows
- `components/Navigation.tsx` - Lightweight navigation styling
- `components/PortfolioDropdown.tsx` - Simplified to 4 options
- `constants/heroCarousel.ts` - Hero slide content and CTAs
- `app/layout.tsx` - Added Cormorant Garamond font
- `app/globals.css` - Typography definitions

### Final Commit:
```
polish: final micro-adjustments for luxury editorial hero

1) Headline spacing: leading-[1.05]
2) Description opacity: 95%
3) Arrow opacity: 60% default, 100% hover
4) CTA consistency: "View Portfolio" across all slides
```

---

## Status: LOCKED ✅

**Hero design is complete and approved.**
**No further changes needed.**

*Last Updated: 2026-01-05*
