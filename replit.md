# Evolvo AI - AI Business Platform

## Overview

Evolvo AI is a modern web platform designed for business digitalization and AI solutions in the Uzbekistan market. It's built as a full-stack application with a React frontend and Express.js backend, featuring multilingual support (Uzbek, Russian, English) and a comprehensive content management system for AI services, blog posts, testimonials, and contact management.

## User Preferences

Preferred communication style: Simple, everyday language.

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
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Validation**: Zod schemas shared between frontend and backend
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)

## Key Components

### Database Schema
The application uses a PostgreSQL database with the following main tables:
- **users**: User authentication and management
- **contacts**: Contact form submissions with language support
- **blog_posts**: Multilingual blog content with publishing status
- **services**: AI service offerings with features and language variants
- **testimonials**: Customer testimonials with language support

All tables include UUID primary keys and timestamp tracking.

### API Structure
RESTful API endpoints under `/api/`:
- `POST /api/contact` - Contact form submission
- `GET /api/contacts` - Admin contact list
- `GET /api/blog` - Blog posts with language filtering
- `GET /api/blog/:id` - Individual blog post
- Service and testimonial endpoints (implemented in storage layer)

### Internationalization
- Three-language support: Uzbek (default), Russian, English
- Translation system with nested key structure
- Language preference stored in localStorage
- Server-side language filtering for content

## Data Flow

1. **Client Request**: User interacts with React components
2. **State Management**: TanStack React Query manages API calls and caching
3. **API Layer**: Express.js routes handle business logic
4. **Data Storage**: Storage abstraction layer (currently in-memory with sample data, designed for database integration)
5. **Database**: Drizzle ORM manages PostgreSQL operations
6. **Response**: JSON responses with consistent success/error structure

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **zod**: Runtime type validation and schema definition

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