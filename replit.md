# Liberator Medical Supply

## Overview

Liberator Medical Supply is a medical e-commerce platform designed to provide quality healthcare supplies to patients. The application combines healthcare professionalism with modern e-commerce UX patterns, focusing on trust-building elements, accessibility compliance (WCAG AA), and simplified navigation. Key features include product browsing by category, shopping cart functionality, newsletter subscriptions, and insurance partner displays.

## Recent Changes (December 2024)

### Authentication (December 21, 2024)
- Integrated Replit Auth with OpenID Connect for user login (Google, GitHub, Apple, email/password)
- Created PostgreSQL database with users and sessions tables
- Added useAuth hook for managing authentication state on frontend
- Updated Header with login button (for guests) and account dropdown (for authenticated users)
- Built Account dashboard page with tabs: Overview, Orders, Addresses, Settings
- Account page includes mock data for order history, saved addresses, and quick actions

### Frontend Implementation
- Built complete homepage with Hero, Value Propositions, Product Categories, How It Works, Testimonials, Insurance Partners, Newsletter sections
- Created product listing page with category filtering, price filtering, search, and sorting
- Implemented product detail page with quantity selector, specifications tabs, and related products
- Built shopping cart with quantity management and order summary
- Forced light mode for accessibility (elderly users need white backgrounds with high contrast)
- Brand colors: Deep Blue (#0047AB) and Orange (#FF8C00) on white backgrounds
- Responsive design for mobile, tablet, and desktop

### Backend Implementation  
- RESTful API endpoints for products, categories, cart, and newsletter
- In-memory storage with seeded product data (24 products across 6 categories)
- Session-based cart management
- Replit Auth integration with passport.js and OpenID Connect

### Pages
- `/` - Homepage with all marketing sections
- `/products` - Product listing with filters
- `/products/:slug` - Product detail page
- `/cart` - Shopping cart
- `/account` - User account dashboard (requires authentication)

### Key Components
- `Header` - Sticky navigation with mega-menu, search, cart badge
- `Hero` - CTA section with statistics
- `ProductCard` - Reusable product display component
- `ThemeToggle` - Forces light mode for accessibility (dark mode disabled)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with CSS custom properties for theming (light/dark mode support)
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Build Tool**: Vite with React plugin

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/`
- shadcn/ui primitives in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful JSON APIs under `/api/*` prefix
- **Development Server**: Vite dev server with HMR proxied through Express

The server architecture separates concerns:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data access layer with interface abstraction
- `server/vite.ts` - Vite integration for development
- `server/static.ts` - Static file serving for production

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Definition**: `shared/schema.ts` contains table definitions and Zod validation schemas
- **Current Storage**: In-memory storage implementation (`MemStorage`) with interface for database swap
- **Database Ready**: Drizzle config points to PostgreSQL via `DATABASE_URL` environment variable

Database entities include:
- Users (authentication)
- Products (catalog items with categories, pricing, stock status)
- Categories (product groupings)
- Cart Items (session-based shopping cart)
- Newsletter Subscriptions
- Testimonials

### Build System
- **Development**: `tsx` for running TypeScript directly
- **Production Build**: Custom build script using esbuild for server bundling and Vite for client
- **Output**: Server bundles to `dist/index.cjs`, client assets to `dist/public/`

## External Dependencies

### Database
- PostgreSQL (configured via `DATABASE_URL` environment variable)
- Drizzle Kit for migrations (`drizzle-kit push` for schema sync)

### UI Framework Dependencies
- Radix UI primitives for accessible components
- Embla Carousel for product carousels
- React Day Picker for calendar inputs
- Lucide React for icons
- class-variance-authority and clsx for component styling

### Session Management
- connect-pg-simple for PostgreSQL session storage (configured but may use memory store in development)

### Fonts
- Google Fonts: Inter (primary), DM Sans, Fira Code, Geist Mono (loaded via CDN in index.html)