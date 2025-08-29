# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development environment (preferred)
docker compose up

# Database operations
npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:migrate   # Apply migrations to database
./scripts/psql.sh    # Access PostgreSQL shell directly

# Code quality
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint

# Build and deployment
npm run build        # Next.js production build
npm run start        # Start production server
```

## Architecture Overview

**ekicat** is a Next.js application built around a graph-based data model for transportation/train information with spatial capabilities.

### Core Data Model

The application uses a **node-centric graph architecture**:

- **`nodes`**: Core graph entities with minimal structure
- **`node_edges`**: Undirected relationships between nodes  
- **`locations`**: PostGIS geometry data for spatial features
- **`media_blobs`**: Binary data with MIME types and temporal accuracy
- Junction tables (`node_locations`, `node_media_blobs`) link entities

### Tech Stack

- **Database**: PostgreSQL with PostGIS and ltree extensions
- **ORM**: Drizzle with snake_case conventions and custom column types
- **Frontend**: Next.js 15 App Router, TypeScript, TailwindCSS
- **Validation**: Zod for configuration and data validation
- **Development**: Docker Compose environment

### Configuration Pattern

Environment-based config with Zod validation in `/src/config/`:
- Database URI: `postgres://ekicatdev:ekicatdev@postgres:5432/ekicatdev` (Docker default)
- Schema inference provides full TypeScript safety

### Service Layer

Clean separation with service classes in `/src/services/`:
```typescript
// Example pattern
export class NodeService {
    async listNodes() {
        return db.query.node.findMany();
    }
}
```

### Database Schema Location

- **Schema definition**: `/src/db/schema.ts` 
- **Database connection**: `/src/db/index.ts` (includes schema import for query builder)
- **Migrations**: Auto-generated in `/drizzle/` directory

### Key Files

- `/src/db/schema.ts` - Complete data model with relations
- `/docker-compose.yaml` - Development environment setup  
- `/scripts/psql.sh` - Database shell access
- `/scripts/pg-setup.sql` - PostGIS/ltree extension setup

### Development Notes

- Recent TRPC removal - services moved from `/src/api/` to `/src/services/`
- Drizzle requires schema import in db connection for query builder functionality
- PostGIS geometry and ltree types use custom Drizzle column definitions
- `timestamp_accuracy` enum supports temporal precision from year to microsecond