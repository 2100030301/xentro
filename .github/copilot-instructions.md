# XENTRO - Copilot Instructions

## Project Overview
XENTRO is a Next.js 16 landing page for India's first digital incubator for student entrepreneurs. Built with React 19, TypeScript, Tailwind CSS 4, and Framer Motion for animations.

## Architecture & Structure

### Component Organization
- **Page components**: `src/app/components/` - Page-specific components (e.g., `CircuitBackground.tsx`)
- **Reusable components**: `src/components/` - Shared UI components (e.g., `Navbar.tsx`, `HeroSection.tsx`)
- **shadcn/ui components**: `src/components/ui/` - Radix-based UI primitives styled with CVA
- **Dedicated CSS files**: `src/styles/` for component-specific styles (e.g., `HeroSection.css`, `Navbar.css`)

This dual-location pattern separates page-level elements from truly reusable components.

### Styling Architecture
**Critical**: This project uses a **hybrid CSS approach** - NOT Tailwind-exclusive.

1. **Global animations**: Defined in `src/app/globals.css` with custom `@keyframes` (e.g., `float`, `pulse-glow`, `gradient-shift`)
2. **Component-specific CSS**: Separate files in `src/styles/` using BEM-like class names (e.g., `.hero-section`, `.navbar-container`)
3. **Tailwind**: Used for utilities and layout classes
4. **tw-animate-css**: Imported in `globals.css` for additional animation utilities
5. **Framer Motion**: Used for scroll-triggered animations in `FeaturesSection.tsx` and similar components

**When styling**:
- Use dedicated CSS files for complex component styles with custom animations
- Apply Tailwind classes directly in TSX for simple utilities and layout
- Never convert existing custom CSS animations to inline Tailwind classes
- Reference animation classes like `animate-fade-in-up`, `animate-delay-400` from component CSS files

### Font Stack
Primary: `'Open Sans'`, `'Be Vietnam Pro'` (loaded from Google Fonts in `globals.css`)  
Display: `Geist`, `Geist Mono` (loaded via `next/font/google` in `layout.tsx`)  
Decorative fonts include: `Audiowide`, `Montserrat`, `Playfair Display`

## Key Patterns & Conventions

### Client Components with Hydration
All interactive components use `"use client"` directive. Common pattern:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []);
// Conditionally apply animations: className={`${mounted ? 'animate-fade-in-up' : ''}`}
```
This prevents hydration mismatches and enables staggered animation entry.

### Path Aliases
- `@/*` → `src/*` (configured in `tsconfig.json` and `components.json`)
- Import example: `import Navbar from "@/components/Navbar"`

### Image Handling
Use Next.js `<Image>` component with:
- `priority` for above-fold images
- `fill` with `object-fit` for background images
- Assets in `src/images/` (e.g., `XENTRO-DARK.png`, `HeroSection.jpeg`)

### Animation Timing Pattern
Components use sequential animation delays for entrance effects:
- `.animate-delay-200`, `.animate-delay-400`, `.animate-delay-600`, etc.
- See `HeroSection.tsx` for canonical implementation

### shadcn/ui Integration
Configured with:
- Style: "new-york"
- Base color: "neutral"  
- CSS variables enabled
- Utility function: `cn()` from `@/lib/utils` (combines `clsx` + `tailwind-merge`)

## Development Workflow

### Commands
- **Dev server**: `npm run dev` (port 3000)
- **Build**: `npm run build`
- **Lint**: `npm run lint` (ESLint with Next.js config)
- **Production**: `npm start`

### Dark Mode
Forced dark mode via `<html className="dark">` in `layout.tsx`. Global background: `#020617`.

### Adding New Components
1. Create in `src/components/` (or `src/app/components/` if page-specific)
2. If complex styling needed, add dedicated CSS file in `src/styles/`
3. Import CSS in component with `import "@/styles/ComponentName.css"`
4. Use `"use client"` if component has state/effects/event handlers
5. Apply `mounted` pattern for animations to avoid hydration issues

### Modifying Animations
- Check `src/app/globals.css` for existing keyframe animations before creating new ones
- Component-specific animation classes go in `src/styles/ComponentName.css`
- Use `tw-animate-css` utilities when appropriate (already imported)

## Key Dependencies
- **Framer Motion** (`framer-motion`): Scroll-triggered animations, gesture animations
- **Lucide React** (`lucide-react`): Icon library (e.g., `Menu`, `X`, `ArrowRight`)
- **Radix UI** (`@radix-ui/react-slot`): Primitives for accessible UI components
- **CVA** (`class-variance-authority`): Type-safe variant styling for `button.tsx`

## Common Gotchas
1. **Don't remove custom CSS files** - They contain critical animations not in Tailwind
2. **Client vs Server**: Interactive features require `"use client"`. RSC is default.
3. **CSS import order**: Font imports MUST be first in `globals.css`, then Tailwind, then tw-animate-css
4. **Overflow handling**: Both `html` and `body` have `overflow-x: hidden` to prevent horizontal scroll from animations
5. **Tailwind v4**: Uses `@tailwindcss/postcss` plugin (not v3 config syntax)

## Project Context
This is a landing page for a student startup incubator. The design emphasizes:
- Futuristic tech aesthetic (circuit board patterns, gradient animations)
- Clear call-to-actions ("Get Started", "Join Waitlist")
- Storytelling through founder testimonials and feature sections
- Mobile-first responsive design with smooth transitions
