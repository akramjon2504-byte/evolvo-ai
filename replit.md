# Evolvo AI - AI Business Platform

## Overview

Evolvo AI is a modern web platform designed for business digitalization and AI solutions in the Uzbekistan market. It's built as a full-stack application with a React frontend and Express.js backend, featuring multilingual support (Uzbek, Russian, English) and a comprehensive content management system for AI services, blog posts, testimonials, and contact management.

## User Preferences

Preferred communication style: Simple, everyday language.

## Company Contact Information
- Phone: +998974771229
- Address: Toshkent shahri, Olmazor tumani, Nurafshon 12
- Updated: August 1, 2025

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom Evolvo AI brand colors
- **State Management**: TanStack React Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (DatabaseStorage implementation)
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Validation**: Zod schemas shared between frontend and backend
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Data Storage**: Full database integration with automatic schema migration

## Key Components

### Page Structure (Multi-Page Architecture)
The application follows a multi-page structure to optimize user experience:
- **Home Page** (`/`): Hero section, services overview, AI demo preview, testimonials, recent blog posts (4 latest), contact
- **Services Page** (`/services`): Complete services catalog, project calculator, AR/VR demos, IoT dashboard, blockchain integration
- **Portfolio Page** (`/portfolio`): Project showcase, client testimonials, company information, case studies
- **AI Demo Page** (`/ai-demo`): Interactive AI chatbot, voice search technology, pricing plans, live demonstrations
- **Blog Page** (`/blog`): Complete blog listing with all articles, pagination, category filtering
- **Individual Blog Posts** (`/blog/:id`): Full article view with SEO optimization

### Database Schema
The application uses a PostgreSQL database with the following main tables:
- **users**: User authentication and management
- **contacts**: Contact form submissions with language support
- **blog_posts**: Multilingual blog content with publishing status
- **services**: AI service offerings with features and language variants
- **testimonials**: Customer testimonials with language support

All tables include UUID primary keys and timestamp tracking.

### Admin Panel
Comprehensive admin interface with authentication:
- **Authentication**: Login system with demo credentials (admin/evolvo2025)
- **Contact Management**: View and delete customer inquiries
- **Blog Management**: Create, publish/unpublish, and manage blog posts
- **Content Overview**: View services and testimonials
- **Email Marketing**: Complete automation system with 30-day templates and OpenAI personalization
- **Telegram AI Assistant**: Professional AI customer service bot (@vertextestai_bot) with intelligent responses
- **Security**: Protected routes with localStorage-based auth
- **RSS Integration**: Manual RSS sync functionality for automated content generation

### 2025 Innovation Features
Latest web technologies and cutting-edge features:
- **AI Demo Chatbot**: Interactive AI assistant with voice input support
- **Voice Search Technology**: Uzbek language voice recognition and text-to-speech responses
- **Project Calculator**: Real-time project cost estimation with dynamic pricing
- **AR Showcase**: Augmented Reality demos for furniture, products, and education
- **Blockchain Integration**: Cryptocurrency payments, smart contracts, and DeFi solutions
- **IoT Dashboard**: Real-time sensor monitoring with live data visualization
- **Portfolio Showcase**: Interactive project gallery with filtering and ratings

### SEO Optimization
Comprehensive search engine optimization implementation:
- **Meta Tags**: Complete title, description, keywords, robots, and canonical URLs
- **Open Graph**: Full social media sharing optimization for Facebook and Twitter
- **Structured Data**: JSON-LD schema markup for organization and articles
- **Sitemap**: Dynamic XML sitemap generation for all published content
- **Performance**: DNS prefetch, preconnect hints for faster loading
- **Individual Page SEO**: Dynamic meta tags for blog posts and pages
- **Robots.txt**: Search engine crawler instructions with proper admin exclusions

### Navigation & Routing
- **Modern Multi-Page Routing**: Uses Wouter for client-side routing between dedicated pages
- **SEO-Optimized URLs**: Each page has unique URLs for better search engine indexing
- **Responsive Navigation**: Mobile-friendly navbar with page links and smooth transitions
- **Content Separation**: Homepage shows previews, dedicated pages contain complete content

### API Structure
RESTful API endpoints under `/api/`:
- `POST /api/contact` - Contact form submission with welcome email trigger
- `GET /api/contacts` - Admin contact list
- `GET /api/blog` - Blog posts with language filtering and pagination
- `GET /api/blog/:id` - Individual blog post with full content
- `GET /api/services/:language` - Services list filtered by language
- `GET /api/testimonials/:language` - Testimonials filtered by language
- `GET /api/admin/email-stats` - Email marketing statistics
- `POST /api/admin/send-marketing-emails` - Manual marketing email trigger
- `GET /api/admin/telegram-stats` - Telegram AI assistant statistics
- `POST /api/admin/send-telegram-test` - Test AI assistant responses
- `POST /api/admin/send-telegram-marketing` - Manual marketing campaigns

### Internationalization
- Three-language support: Uzbek (default), Russian, English
- Translation system with nested key structure
- Language preference stored in localStorage
- Server-side language filtering for content

## Data Flow

1. **Client Request**: User interacts with React components
2. **State Management**: TanStack React Query manages API calls and caching
3. **API Layer**: Express.js routes handle business logic
4. **Data Storage**: DatabaseStorage class with full PostgreSQL integration
5. **Database**: Drizzle ORM manages PostgreSQL operations with UUID primary keys
6. **Response**: JSON responses with consistent success/error structure

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **zod**: Runtime type validation and schema definition
- **openai**: AI content generation and translation
- **node-telegram-bot-api**: Telegram bot integration
- **node-cron**: Automated scheduling for marketing campaigns

### UI Dependencies
- **@radix-ui/***: Comprehensive set of unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets in `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **NODE_ENV**: Controls development vs production behavior
- **DATABASE_URL**: PostgreSQL connection string (required)
- **Development**: Hot module replacement with Vite middleware
- **Production**: Static file serving with Express

### Hosting Considerations
- Designed for serverless/cloud deployment (Neon Database)
- Single build command produces both frontend and backend artifacts
- Environment variables for database configuration
- Production-ready error handling and logging

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and scalable patterns for content management and internationalization.