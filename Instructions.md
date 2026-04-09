# Cravings — Static HTML/CSS/Bootstrap Build Instructions

> **Who is this for?** Entry-level students building a pixel-perfect static copy of the Cravings food-delivery website using only HTML, CSS, and Bootstrap. No JavaScript required — forms do nothing, buttons do nothing, links navigate between pages using anchor `<a>` tags.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Color Palette](#2-color-palette)
3. [Folder Structure](#3-folder-structure)
4. [Shared Components — Navbar & Footer](#4-shared-components--navbar--footer)
5. [Page Breakdown](#5-page-breakdown)
6. [Navigation Reference](#6-navigation-reference)
7. [General Tips](#7-general-tips)

---

## 1. Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Framework | Bootstrap 5 |
| Custom Styles | CSS3 |
| Typography | Google Fonts — **Inter** |
| Icons | Bootstrap Icons (use nearest match if exact icon unavailable) |

**CDN links to include in every page `<head>`:**
- Bootstrap 5 CSS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css`
- Bootstrap Icons: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css`
- Google Fonts Inter: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap`
- Your custom CSS: `css/style.css`

**Script to include before every `</body>`:**
- Bootstrap 5 JS Bundle: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js`

---

## 2. Color Palette

Add these CSS variables at the top of `css/style.css` and use them everywhere via `var(--variable-name)`:

```css
:root {
  --color-primary:          #c2410c;  /* Brand orange-red */
  --color-primary-content:  #ffffff;  /* Text on primary background */
  --color-secondary:        #6b7280;  /* Muted gray text */
  --color-neutral:          #3f3f46;  /* Dark sections (footer, bars) */
  --color-neutral-content:  #f4f4f5;  /* Text on dark backgrounds */
  --color-base-100:         #fff8f1;  /* Warm white page background */
  --color-base-200:         #f5ede5;  /* Slightly darker warm white */
  --color-base-300:         #e7d9c9;  /* Borders and dividers */
  --color-base-content:     #2d1b10;  /* Default dark text */
  --color-error:            #ef4444;  /* Red for error states */
  --color-success:          #22c55e;  /* Green for success states */
}
```

**When to use each color:**

| Variable | Use it for |
|----------|-----------|
| `--color-primary` | Navbar bg, primary buttons, icon accents, highlighted heading words |
| `--color-neutral` | Footer bg, dark stat bars, dark CTA sections |
| `--color-neutral-content` | All text placed on dark/neutral backgrounds |
| `--color-base-100` | Main page background, card backgrounds |
| `--color-base-200` | Hover states on light backgrounds, accordion header hover |
| `--color-base-300` | Card borders, dividers, input borders |
| `--color-secondary` | Body paragraph text, subheadings, captions |
| `--color-base-content` | Bold/main text on light backgrounds |

---

## 3. Folder Structure

```
cravings-static/
│
├── index.html              ← Home page
├── about.html              ← About page
├── order-now.html          ← Browse restaurants
├── contact.html            ← Contact form
├── feedback.html           ← Feedback form
├── help-center.html        ← FAQ + support ticket
├── login.html              ← Login form
├── register.html           ← Registration form
├── privacy-policy.html     ← Privacy Policy
├── terms-of-service.html   ← Terms of Service
├── sitemap.html            ← Site Map
│
├── css/
│   └── style.css           ← All custom styles
│
└── images/
    ├── logo-light.png          ← White logo (navbar)
    ├── logo-circle.png         ← Round logo (footer & about hero)
    ├── hero-bg.jpg             ← Home hero background
    ├── about-bg.jpg            ← About hero background
    ├── contact-bg.jpg          ← Contact page full-screen background
    ├── feedback-bg.jpg         ← Feedback page full-screen background
    ├── help-bg.jpg             ← Help Center hero background
    └── restaurant-card.jpg     ← Placeholder image for all restaurant cards
```

> Free food images: [https://unsplash.com/s/photos/food](https://unsplash.com/s/photos/food)

---

## 4. Shared Components — Navbar & Footer

Include these on **every** page.

### Navbar

- **Position:** Sticky top (stays visible when scrolling)
- **Height:** 64px
- **Background:** `--color-primary` (orange-red)
- **Left side:** Logo image (`images/logo-light.png`), links to `index.html`
- **Right side (desktop):** "Login" text link → `login.html` · "Register" outlined pill button → `register.html`
- **Mobile:** Links collapse into a hamburger menu (Bootstrap handles this with `navbar-toggler`)
- All text and icons are white

### Footer

- **Background:** `--color-neutral` (dark)
- **Text color:** `--color-neutral-content`
- **Layout:** 5-column grid on desktop, stacks on mobile

| Column | Content |
|--------|---------|
| 1 | Round logo image (`logo-circle.png`) |
| 2 | **Quick Links** — Home, About, Order Now |
| 3 | **For Restaurants** — Partner With Us (→ `register.html`) |
| 4 | **For Riders** — Become a Rider (→ `register.html`) |
| 5 | **Feedback & Support** — Give Feedback, Help Center, Contact Us |

- **Bottom bar** (below a horizontal rule): copyright text on the left · Privacy Policy, Terms of Service, Site Map links on the right
- All footer links: muted opacity, hover color changes to `--color-primary`

---

## 5. Page Breakdown

### 5.1 `index.html` — Home

#### Section 1 — Hero
- Full viewport height (`min-height: 85vh`), food background image
- Dark overlay: `rgba(0,0,0,0.4)` covering the entire section
- All content is centered, white text:
  - **Heading:** "Your Favorite Food, Delivered Fast"
  - **Subtext:** "Order from thousands of restaurants and get it delivered to your doorstep"
  - **Two side-by-side buttons:** *Sign Up* (primary color bg, white text → `register.html`) · *Order Now* (white bg, dark text → `order-now.html`)
  - **Search bar** below buttons: white rounded bar, max-width ~700px, search icon on the left, placeholder "Search restaurants or dishes..."

#### Section 2 — Restaurant Cards Grid
- Background: gradient from `--color-primary` (top) fading to white (bottom)
- **Heading:** "Featured Restaurants" (white)
- **Subtext:** "6 restaurants available" (white, semi-transparent)
- **Grid:** 3 columns on desktop, 2 on tablet, 1 on mobile
- Show **6 hardcoded cards**, each containing:
  - Restaurant image (top, fixed height ~180px, `object-fit: cover`)
  - Restaurant name (bold, dark)
  - Short description (muted gray)
  - Star rating: ⭐ 4.5 · 120 reviews
  - Cuisine tag badges (pill-shaped, light background)
  - City name with a map-pin icon
- Cards have a subtle shadow, rounded corners, and scale up slightly on hover

---

### 5.2 `about.html` — About

#### Section 1 — Hero
- Background image, `rgba(0,0,0,0.55)` dark overlay
- Centered white content: round logo (80×80px) · heading "About **Cravings**" (the word "Cravings" in primary color) · subtext "Connecting hungry hearts with amazing food — one delivery at a time."

#### Section 2 — Stats Bar
- Background: `--color-neutral` (dark)
- 4 equal columns (2×2 on mobile):
  - **50K+** Happy Customers
  - **1,200+** Partner Restaurants
  - **3,500+** Active Riders
  - **4.8** ⭐ Average Rating
- Each stat: large bold number in `--color-primary`, small label below in `--color-neutral-content`

#### Section 3 — Our Story
- Two-column layout (stacks on mobile)
- **Left:** small all-caps label "OUR STORY" in primary color · heading "Born from a love of great food" · two paragraphs about Cravings starting in 2022
- **Right:** 2×2 grid of small icon cards, each with an icon, bold label, and description:
  - 🍴 Restaurants — "Diverse cuisines from local gems"
  - 🏍️ Riders — "Fast, reliable delivery partners"
  - 🏪 Partners — "Businesses that grow with us"
  - ❤️ Community — "People at the heart of everything"

#### Section 4 — Our Values
- 3 equal cards in a row (stacks on mobile), each with a large icon, bold title, and short description:
  - ❤️ **Passion for Food** — "We believe great food brings people together."
  - 🌿 **Fresh & Local** — "We partner with local restaurants to bring you the freshest meals."
  - 🛡️ **Safe & Reliable** — "Secure payments, real-time tracking, and verified riders."

#### Section 5 — Meet the Team
- Centered heading: "Meet the Team"
- 4-column row of team member cards:
  - Circular avatar (80×80px, `--color-primary` background, white initials)
  - Name below
  - Role below (muted gray, small font)
  - Members: **SR** Sofia Reyes — CEO & Co-Founder · **ML** Marcus Lim — CTO & Co-Founder · **AP** Aisha Patel — Head of Operations · **JO** James Owusu — Head of Design

#### Section 6 — CTA Banner
- Background: `--color-neutral` (dark), centered white text
- Heading: "Ready to experience Cravings?"
- Two buttons: *Order Now* → `order-now.html` · *Join as Partner* → `register.html`

---

### 5.3 `order-now.html` — Order Now

#### Section 1 — Page Header
- Light background (`--color-base-200`), centered
- **Heading:** "Order Now"
- **Subtext:** "Find your favourite restaurant and order in seconds"
- Search bar (same style as Home, but on a light background)

#### Section 2 — Category Filter Pills
- Horizontal row of 5 pill-shaped buttons, centered:
  - 🍽️ **All** (active — primary color bg, white text)
  - 🥗 Vegetarian
  - 🍖 Non-Veg
  - 🍰 Desserts
  - 🍱 Others
- Inactive pills: outlined/secondary style
- Active pill: `--color-primary` background, white text

#### Section 3 — Restaurant Grid
- Same card design as the Home page
- Show **9 hardcoded cards** (3 rows × 3 columns)

---

### 5.4 `contact.html` — Contact

- The page is **full-screen** (no separate hero) — background image fills `90vh`
- Background: `images/contact-bg.jpg`, `cover`, centered
- A **white form card** sits on the **left side** of the page
  - Max-width ~420px, white background, rounded corners, drop shadow
  - Scrollable if content overflows (`overflow-y: auto`, `max-height: 85vh`)
- **Card heading:** "Contact Us" (primary color), subtext "Have a question? We'd love to hear from you."
- **Form fields (in order):**
  1. Text — Full Name
  2. Email — Email Address
  3. Tel — Phone Number *(optional)*
  4. Text — Subject
  5. Textarea (4 rows) — Message
  6. Full-width submit button: **Send Message** (primary color)

---

### 5.5 `feedback.html` — Feedback

- Same full-screen background layout as Contact, but the form card is on the **right side**
- **Card heading:** "Share Feedback", subtext "Help us improve your Cravings experience."
- **Form fields (in order):**
  1. Text — Full Name
  2. Email — Email
  3. Dropdown select — Category: Food Quality · Delivery Experience · App & Website · Customer Support · Pricing & Value
  4. Star rating — display 5 empty star icons (☆☆☆☆☆) — static, no interaction needed
  5. Textarea (4 rows) — Your Feedback
  6. Full-width submit button: **Submit Feedback** (primary color)

---

### 5.6 `help-center.html` — Help Center

#### Section 1 — Hero
- Background image with dark overlay
- Centered: icon · heading **"Help Center"** · subtext "Get answers to your questions"

#### Section 2 — FAQ Accordion
- Use Bootstrap's built-in accordion component (works without any custom JS)
- Max-width ~700px, centered on the page
- **4 questions:**
  1. How do I track my order? → "Go to your dashboard → Orders and click on the active order to see live tracking."
  2. How do I get a refund? → "Submit a ticket below with your Order ID and our team will process it within 2–3 business days."
  3. My rider is late. What do I do? → "You can contact your rider directly via the order page or raise a support ticket."
  4. How do I update my account info? → "Navigate to your dashboard → Settings to update your profile details."
- Each question button has an icon on the left and bold text

#### Section 3 — Support Ticket Form
- White card, centered, max-width ~600px
- **Form fields:** Full Name · Email · Issue Category (dropdown) · Order ID *(optional)* · Description (textarea)
- Submit button: **Submit Ticket** (primary color)

---

### 5.7 `login.html` — Login

- **Two-column layout** (stacks on mobile):
  - **Left column** *(hidden on mobile)*: decorative panel with `--color-primary` background, a large food icon, heading "Welcome Back!", short subtext
  - **Right column**: light background (`--color-base-100`), form centered vertically
- **Form fields:**
  1. Email
  2. Password — with a static 👁 eye icon on the right (decorative only)
  3. Checkbox — Remember me
  4. Full-width submit button: **Login** (primary color)
- **Below form:** "Don't have an account? **Register**" → `register.html`

---

### 5.8 `register.html` — Register

- Same two-column layout as Login, but **flipped**: form on the **left**, decorative panel on the **right**
- Decorative panel text: "Join Cravings Today!", subtext about being a customer, restaurant, or rider
- **Top of form — User Type Selector** (tab-style, 3 equal segments):
  - Customer *(default active — primary bg, white text)* · Restaurant · Rider
- **Form fields:**
  1. User type selector (above)
  2. Text — Full Name
  3. Email
  4. Phone Number
  5. Password
  6. Confirm Password
  7. Checkbox — I agree to the Terms and Conditions (link → `terms-of-service.html`)
  8. Full-width submit button: **Create Account** (primary color)
- **Below form:** "Already have an account? **Login**" → `login.html`

---

### 5.9 `privacy-policy.html` — Privacy Policy

#### Section 1 — Hero
- Dark overlay on background image (or use `--color-neutral` as solid background)
- Centered: 🛡️ shield icon · heading "Privacy **Policy**" · subtext · "Last updated: April 9, 2026"

#### Section 2 — Intro
- Centered paragraph, max-width ~700px
- Text: "This Privacy Policy describes how Cravings collects, uses, and shares information about you when you use our services. By using Cravings, you agree to the practices described in this policy."

#### Section 3 — Accordion (6 items)
Bootstrap accordion, max-width ~750px, centered. Each item button shows an icon + section title:

| # | Icon | Title | Key bullet points |
|---|------|-------|-------------------|
| 1 | database icon | Information We Collect | Account info, profile data, order history, device/usage data, location data |
| 2 | shield icon | How We Use Your Information | Process orders, personalise experience, send updates, improve platform, legal compliance |
| 3 | user-lock icon | Sharing Your Information | Restaurants, riders, payment processors, analytics (anonymized), law enforcement only |
| 4 | cookie icon | Cookies & Tracking | Essential cookies, analytics cookies, browser opt-out, third-party services |
| 5 | database icon | Data Retention | Active accounts, 5-year order history, deletion on request, anonymized analytics |
| 6 | user-lock icon | Your Rights | Access, correction, deletion, portability, opt-out of marketing |

#### Section 4 — Contact CTA
- Background: `--color-neutral`
- Centered: email icon · heading "Questions about your privacy?" · pill-button link: **privacy@cravings.com**

---

### 5.10 `terms-of-service.html` — Terms of Service

Same structure as Privacy Policy.

#### Section 1 — Hero
- Icon: 📄 file-contract icon · heading "Terms of **Service**" · subtext · "Last updated: April 9, 2026"

#### Section 2 — Intro
- Text: "These Terms of Service govern your access to and use of the Cravings platform. By creating an account or placing an order, you agree to be bound by these Terms."

#### Section 3 — Accordion (7 items)

| # | Icon | Title | Key bullet points |
|---|------|-------|-------------------|
| 1 | user-check icon | 1. User Accounts | Must be 18+, keep credentials confidential, provide accurate info, one account per person |
| 2 | shopping-cart icon | 2. Orders & Payments | Prices include tax, order confirmed after payment, cancel within 2 mins, refunds in 3–5 days |
| 3 | motorcycle icon | 3. Rider Terms | Valid licence required, independent contractor not employee, weekly payouts, min 3.5 star rating |
| 4 | store icon | 4. Restaurant Partners | Keep menu updated, comply with food safety laws, Cravings commission applies |
| 5 | ban icon | 5. Prohibited Conduct | No scraping, no fake reviews, no spam/malware, no impersonation, no fraudulent chargebacks |
| 6 | balance-scale icon | 6. Limitation of Liability | Cravings is a marketplace not the food provider; liability limited to order value |
| 7 | x-circle icon | 7. Termination | Close account anytime via Settings; Cravings may suspend accounts that breach terms |

#### Section 4 — Privacy Cross-link
- Small centered paragraph: "Your use of Cravings is also governed by our **Privacy Policy**." with a link → `privacy-policy.html`

#### Section 5 — Contact CTA
- Same dark CTA block as Privacy Policy, email: **legal@cravings.com**

---

### 5.11 `sitemap.html` — Site Map

#### Section 1 — Hero
- Map icon · heading "Site **Map**" · subtext "A complete overview of every page on the Cravings platform."

#### Section 2 — 4-Column Link Grid
- Max-width ~1000px, centered
- 4 columns (2×2 on mobile)
- Column headings: uppercase, small font, `--color-primary`, letter-spacing, with a bottom border line

| Column | Heading | Links |
|--------|---------|-------|
| 1 | MAIN | Home · About Cravings · Order Now |
| 2 | SUPPORT | Contact Us · Feedback · Help Center |
| 3 | ACCOUNT | Login · Register as Customer · Register as Restaurant · Register as Rider |
| 4 | LEGAL | Privacy Policy · Terms of Service · Site Map |

- Each link has a small icon to its left (at ~60% opacity)
- Link color: `--color-secondary`, hover: `--color-primary`

#### Section 3 — Footer Note
- Background: `--color-neutral`
- Centered small text: "Can't find what you're looking for? **Visit our Help Center**" → `help-center.html`

---

## 6. Navigation Reference

| Page | File name | href value |
|------|-----------|-----------|
| Home | index.html | `index.html` |
| About | about.html | `about.html` |
| Order Now | order-now.html | `order-now.html` |
| Contact | contact.html | `contact.html` |
| Feedback | feedback.html | `feedback.html` |
| Help Center | help-center.html | `help-center.html` |
| Login | login.html | `login.html` |
| Register | register.html | `register.html` |
| Privacy Policy | privacy-policy.html | `privacy-policy.html` |
| Terms of Service | terms-of-service.html | `terms-of-service.html` |
| Site Map | sitemap.html | `sitemap.html` |

> Register as Customer, Restaurant, and Rider all go to the same `register.html`. The user-type tab at the top of that page handles the selection.

---

## 7. General Tips

### Always Use CSS Variables
Never hardcode color values like `#c2410c` — always use `var(--color-primary)`. This keeps every page consistent and makes it easy to adjust the palette in one place.

### Useful Bootstrap Classes

| Task | Bootstrap class |
|------|----------------|
| Center text | `text-center` |
| Bold / semi-bold text | `fw-bold` / `fw-semibold` |
| Rounded corners | `rounded-3` |
| Card shadow | `shadow-sm` / `shadow` |
| Responsive 3-col grid | `col-12 col-md-6 col-lg-4` |
| Vertical centering | `d-flex align-items-center` |
| Full-width button | `btn w-100` |
| Remove list bullets | `list-unstyled` |
| Sticky navbar | `sticky-top` |
| Hide on mobile | `d-none d-md-block` |
| Spacing utilities | `mt-3 mb-4 py-5 px-3 gap-2` |

### Responsive Rules
- Navbar links collapse into a hamburger menu on mobile (Bootstrap handles this automatically)
- Restaurant cards: 1 column on mobile, 2 on tablet, 3 on desktop
- Contact and Feedback forms: full-width card on mobile, floating card on desktop
- Team cards: 2 columns on mobile, 4 on desktop

### Hero Sections with Dark Overlays
Every hero that has a background image also needs a dark overlay `div` positioned absolutely on top of the image, then the text content positioned above that overlay. Use `position-relative` on the section, `position-absolute` on the overlay div, and `position-relative` with a higher `z-index` on the content div.

### Accordion Styling
Bootstrap accordion buttons default to white. Override in `style.css` so the open (active) state uses `--color-base-200` as the background and `--color-neutral` as the text color. Also override the focus ring to use `--color-primary`.

### Form Input Focus Ring
Override Bootstrap's default blue focus ring by setting `border-color` to `--color-primary` and `box-shadow` to a soft orange-red glow when an input or select is focused.

---

*Focus on structure and layout first, then refine spacing and colors. Consistent use of the color variables is what makes the design look polished.*
