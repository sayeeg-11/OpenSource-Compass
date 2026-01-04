# Visual Design Guide - OpenSource Compass

## Color System

### Primary Colors
```
Primary Blue      #1F3C88
├─ Usage: Main headings, primary elements
├─ Contrast: White text on this color = 7.8:1 (AAA)
└─ Hover state: Slightly darker on interaction

Secondary Blue    #4D96FF
├─ Usage: Buttons, links, accents
├─ Contrast: White text on this color = 4.8:1 (AA)
└─ Hover state: Transitions to primary-blue

Light Gray        #F5F7FA
├─ Usage: Background sections, subtle areas
├─ Purpose: Visual separation without contrast
└─ Text on this: Dark text = 13.5:1 (AAA)

Text Dark         #2E2E2E
├─ Usage: Body text, paragraphs
├─ On white: 13.5:1 contrast (AAA)
└─ On light-gray: 13.2:1 contrast (AAA)

White            #FFFFFF
├─ Usage: Primary background, card backgrounds
└─ Text on dark: 12:1 contrast (AAA)
```

### Status Colors
```
Beginner   #10B981 (Green)     ✓ Recommended starting point
Intermediate #F59E0B (Amber)   → Mid-level program
Advanced   #A78BFA (Purple)    ✓ Advanced contributors
Error      #DC2626 (Red)       ✗ Error messages/alerts
```

---

## Typography System

### Heading Scale
```
h1 │ 2.5rem (40px)
   └─ Page title, hero heading
   └─ Weight: 700 (bold)
   └─ Example: "Navigate Your Open Source Journey"

h2 │ 2rem (32px)
   └─ Major section heading
   └─ Weight: 700 (bold)
   └─ Example: "Why OpenSource Compass?"

h3 │ 1.5rem (24px)
   └─ Subsection heading
   └─ Weight: 700 (bold)
   └─ Example: "Open Source Programs"

h4 │ 1.25rem (20px)
   └─ Card title, feature heading
   └─ Weight: 700 (bold)
   └─ Example: "Beginner Friendly"

h5 │ 1.125rem (18px)
   └─ Smaller heading
   └─ Weight: 600 (semibold)

h6 │ 1rem (16px)
   └─ Minimal heading
   └─ Weight: 600 (semibold)
```

### Body Text
```
p  │ 1rem (16px)
   └─ Line height: 1.8 (relaxed)
   └─ Margin-bottom: 1rem
   └─ Color: #2E2E2E

small │ 0.875rem (14px)
      └─ Form labels, hints
      └─ Color: #666 or #999

label │ 0.875rem (14px)
      └─ Form labels
      └─ Weight: 600 (semibold)
      └─ Color: #2E2E2E
```

### Font
```
Family: 'Inter' (Google Fonts)
Weights: 400 (regular), 600 (semibold), 700 (bold)
Fallback: System sans-serif fonts
Line height: 1.6 (default), 1.8 (paragraphs), 1.2 (headings)
```

---

## Spacing System

### Consistent Scale
```
4px   ├─ Minimal spacing (icon gaps)
8px   ├─ Very tight (form label margins)
12px  ├─ Tight (small gaps)
16px  ├─ Comfortable (label-input gap)
24px  ├─ Standard (section margins)
32px  ├─ Generous (card padding)
48px  ├─ Large (section spacing)
64px  ├─ Very large (hero sections)
80px  ├─ Massive (full-screen sections)
96px  └─ Maximum (grid gaps)
```

### Padding Examples
```
Input field:    py-3 px-4    (12px vertical, 16px horizontal)
Button:         py-3 px-8    (12px vertical, 32px horizontal)
Card:           p-8          (32px all sides)
Section:        py-16 md:py-24 (64px mobile, 96px desktop)
Container:      px-4 sm:px-6 lg:px-8 (responsive padding)
```

### Margin Examples
```
Heading:        mb-4 or mb-6 (12-16px bottom)
Paragraph:      mb-6         (16px bottom)
Section:        mb-12        (48px bottom)
Grid gaps:      gap-8        (32px between items)
```

---

## Component Patterns

### Button Style
```
Default State:
├─ Background: #4D96FF (secondary-blue)
├─ Text: White (#FFFFFF)
├─ Padding: 14px 28px (py-3 px-8)
├─ Border-radius: 8px
├─ Box-shadow: 0 4px 12px rgba(77, 150, 255, 0.3)

Hover State:
├─ Background: #1F3C88 (primary-blue)
├─ Transform: translateY(-2px)
├─ Box-shadow: 0 6px 20px rgba(31, 60, 136, 0.4)
├─ Transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)

Active State:
├─ Transform: translateY(0)
├─ Maintains darker background

Focus State:
├─ Outline: 2px solid #1F3C88
├─ Outline-offset: 2px
```

### Card Style
```
Default State:
├─ Background: #FFFFFF
├─ Padding: 32px (p-8)
├─ Border: 1px solid #E5E7EB
├─ Border-radius: 8px
├─ Box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

Hover State:
├─ Box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15)
├─ Transform: translateY(-8px)
├─ Transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Input Field Style
```
Default State:
├─ Background: #F9F9F9 (light)
├─ Border: 1px solid #E0E0E0
├─ Padding: 12px 16px (py-3 px-4)
├─ Border-radius: 8px
├─ Font-size: 14px

Focus State:
├─ Background: #FFFFFF
├─ Border-color: #4D96FF
├─ Box-shadow: 0 0 0 3px rgba(77, 150, 255, 0.1)
├─ Outline: None (shadow used instead)

Error State:
├─ Border-color: #DC2626 (red)
├─ Error message in red below input
```

---

## Layout Patterns

### Hero Section
```
Structure:
├─ Background: Gradient (from-blue-50 to-blue-100)
├─ Padding: py-20 md:py-28
├─ Max-width: 4xl (56rem)
├─ Margin: 0 auto

Content:
├─ Heading: h2 (2rem) text-blue-900
├─ Paragraph: text-lg text-gray-700
└─ Button: Secondary blue with shadow

Animation:
└─ Content fades in from bottom (fade-in-up)
```

### Card Grid
```
Mobile (0-767px):
└─ grid-cols-1 (single column)

Tablet (768px-1023px):
└─ md:grid-cols-2 (two columns)

Desktop (1024px+):
└─ lg:grid-cols-3 (three columns)

Gap:
└─ gap-8 (32px between cards)
```

### Navigation
```
Header:
├─ Position: sticky (stays on scroll)
├─ Top: 0
├─ Z-index: 50
├─ Background: white
├─ Border: 1px solid #E5E7EB
├─ Box-shadow: 0 1px 3px

Container:
├─ Max-width: 7xl
├─ Margin: auto
├─ Padding: responsive

Logo:
├─ Font-size: 1.5rem (24px)
├─ Font-weight: 700 (bold)
├─ Color: #1F3C88

Links:
├─ Gap: 32px between links
├─ Font-weight: 500
├─ Color: #2E2E2E
├─ Hover: #4D96FF
```

### Footer
```
Background: #111827 (dark gray)
Text-color: #FFFFFF
Padding: py-8 (32px)

Container:
├─ Max-width: 6xl
├─ Margin: auto
├─ Text-align: center

Text:
├─ Color: #D1D5DB (lighter gray)
└─ Font-size: 0.875rem (14px)
```

---

## Animation Specifications

### Fade In Up
```
Name:       .fade-in-up
Timing:     0.8s
Easing:     cubic-bezier(0.25, 0.46, 0.45, 0.94)
Start:      opacity 0, transform translateY(30px)
End:        opacity 1, transform translateY(0)
Usage:      Hero text, section headings
```

### Card Hover
```
Property:   transform
Value:      translateY(-8px)
Duration:   0.3s
Easing:     cubic-bezier(0.25, 0.46, 0.45, 0.94)
Shadow:     0 10px 15px rgba(0,0,0,0.15)
Usage:      All card components
```

### Button Hover
```
Property:   transform
Value:      translateY(-2px)
Duration:   0.3s
Easing:     cubic-bezier(0.25, 0.46, 0.45, 0.94)
Shadow:     Increased depth
Color:      Primary-blue
Usage:      All buttons
```

### Link Hover
```
Property:   color
Duration:   0.3s
Easing:     ease
From:       #2E2E2E (dark text)
To:         #4D96FF (blue)
Usage:      All navigation links
```

---

## Responsive Design Details

### Mobile First Approach
```
Default (Mobile - 0px):
├─ Single column layouts
├─ Full-width with padding
├─ Stacked navigation
├─ Hamburger menu visible

Tablet (md: 768px):
├─ Two-column grids
├─ Full navigation visible
├─ Hamburger hidden
├─ Increased spacing

Desktop (lg: 1024px):
├─ Three-column grids
├─ Maximum width containers (max-w-6xl)
├─ Generous spacing
├─ Optimized layouts
```

### Breakpoint Classes
```
Default     │ Mobile-first
md:         │ 768px and up (tablets)
lg:         │ 1024px and up (desktops)
xl:         │ 1280px and up (large desktops)
2xl:        │ 1536px and up (extra large)
```

---

## Accessibility Features

### Color Contrast
```
Requirement:       AA Standard (4.5:1)
Achieved:          All text meets AAA (7:1+)

Text on white:
├─ Primary Blue:   7.8:1 ✓ AAA
├─ Secondary Blue: 4.8:1 ✓ AA
├─ Dark Text:      13.5:1 ✓ AAA

Text on colored:
├─ White on dark:  12:1 ✓ AAA
├─ Badges:         Verified on all colors
```

### Keyboard Navigation
```
Focus Indicator:
├─ Outline: 2px solid #4D96FF
├─ Outline-offset: 2px
├─ Visible on all interactive elements
├─ High contrast with backgrounds

Tab Order:
├─ Follows visual left-to-right flow
├─ Mobile menu keyboard accessible
├─ All buttons and links focusable
```

### Touch Targets
```
Minimum Size:      44x44 pixels
Mobile Buttons:    py-3 px-8 (meets minimum)
Mobile Links:      Properly sized
Spacing:           At least 8px between targets
```

---

## Icon & Visual Elements

### Badges
```
Beginner:      bg-green-100 text-green-800
Intermediate:  bg-yellow-100 text-yellow-800
Advanced:      bg-purple-100 text-purple-800
Upcoming:      bg-blue-100 text-blue-800

Styling:
├─ Padding: px-3 py-1 (8px 12px)
├─ Border-radius: rounded-full
├─ Font-size: text-xs (12px)
├─ Font-weight: font-semibold (600)
```

### Status Indicators
```
Hover Icon:    ↑ (scroll to top)
Menu Icon:     ☰ (hamburger)
Color:         #1F3C88 (primary-blue)
Size:          20-24px
```

---

## Best Practices

### When to Use Each Color
```
Primary Blue (#1F3C88):
├─ Main headings
├─ Primary buttons (hover state)
├─ Navigation highlights
└─ Focus indicators

Secondary Blue (#4D96FF):
├─ Call-to-action buttons
├─ Links
├─ Accents
└─ Default hover state

Light Gray (#F5F7FA):
├─ Section backgrounds
├─ Card backgrounds (subtle)
└─ Subtle section dividers

Status Colors:
├─ Green: Success, beginner-friendly
├─ Yellow: Intermediate, warning
├─ Purple: Advanced, notice
└─ Red: Error, danger
```

### Spacing Rules
```
Between sections:  64px (py-16) mobile, 96px (py-24) desktop
Between cards:     32px (gap-8) minimum
Card padding:      32px (p-8) minimum
Button padding:    12px vertical, 28px horizontal minimum

Mobile:            Reduce desktop spacing by 30%
Tablet:            Use 75% of desktop spacing
Desktop:           Maximum recommended spacing
```

---

## Common Measurements

### Typography
```
Display (hero): 40px (h1)
Heading 1:      32px (h2)
Heading 2:      24px (h3)
Heading 3:      20px (h4)
Body:           16px
Label/Small:    14px
Tiny:           12px
```

### Components
```
Button:         12px-16px padding vertical
Input:          12px padding vertical
Card:           32px padding all sides
Section:        64-96px padding top/bottom
Container:      Max 1200px width, 8% padding
Icon:           16-24px size
Badge:          8px padding vertical
```

---

## Dark Mode (Future Support)

CSS structure already includes dark mode support:
```css
@media (prefers-color-scheme: dark) {
    /* Dark mode styles defined in auth.css */
    .auth-section { background: linear-gradient(...); }
    .form-group input { background-color: #374151; }
    /* ... more styles ... */
}
```

---

## Print Styles

The CSS includes print optimization:
```css
@media print {
    header, footer, .no-print { display: none; }
    body { font-size: 12pt; color: #000; }
    /* ... optimized for printing ... */
}
```

---

This design guide ensures consistency across all pages and provides detailed specifications for maintaining and extending the design system.
