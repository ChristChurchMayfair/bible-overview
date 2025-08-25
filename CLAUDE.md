# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development & Build
```bash
bun run dev          # Start development server with Vite
bun run build        # Build for production (TypeScript + Vite)
bun run preview      # Preview production build
bun run serve        # Run with Netlify dev server (for API proxying)
```

### Testing & Quality
```bash
bun run test.unit    # Run unit tests with Vitest
bun run test.e2e     # Run end-to-end tests with Cypress
bun run lint         # Run ESLint for code quality
```

## Project Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Mobile**: Ionic React
- **Build Tool**: Vite
- **Testing**: Vitest (unit), Cypress (e2e)
- **Deployment**: Netlify with function proxying

### Data Architecture
The app uses a file-based content management system:
- **Study Content**: JSON files in `/content/studies/` loaded via Vite's `import.meta.glob()`
- **Data Layer**: `/src/data/` contains studies.ts (data access), types.ts (TypeScript definitions), and data.ts (theme definitions)
- **Storage**: LocalStorage for user progress and settings, managed via `usehooks-ts`

### Key Data Flow
1. Study JSON files are automatically imported and typed as `Study[]`
2. Studies are accessed via `getStudy(slug)` and `getStudies()` functions
3. Bible passages fetched through Netlify proxy to Crossway ESV API
4. User progress stored in localStorage with custom hooks

### Routing Structure
```
/                    # Home (intro) or redirect to /studies
/studies            # Main study list
/study/:slug        # Individual study view
/study/:slug/timeline           # Timeline view for study
/study/:slug/passage/:index     # Bible passage view
/study/:slug/audio/:index       # Audio passage view
/completedstudies   # User's completed studies
/settings           # App settings
/help               # Help documentation
```

### Component Organization
- **Pages**: Main route components in `/src/pages/`
- **Components**: Reusable UI components in `/src/components/`
- **Key Components**: 
  - `StudyListItem`: Displays study with progress tracking
  - `StudyIcon`: Icon system for studies
  - `Menu`: Navigation sidebar

### State Management
- **Local State**: React hooks and context
- **Persistence**: localStorage via `useLocalStorage` hook
- **Key Storage Keys**: Defined in `/src/constants/storage.ts`

### Mobile App Features
- PWA-ready with offline capabilities
- Capacitor integration for native iOS/Android features
- Splash screen and icon assets in `/public/splash_screens/`

### API Integration
- Crossway ESV API for Bible text and audio
- Netlify functions proxy ESV API calls with authentication
- CORS headers configured in `netlify.toml`

### Current Refactoring Status
The codebase is undergoing structural improvements (see `todo.md`):
- Constants being moved from data files to `/src/constants/`
- Custom hooks being created in `/src/hooks/`
- Service layer being added in `/src/services/`
- Enhanced error handling and type safety in progress

### Testing Strategy
- Absolutely must use a TDD approach.
- Tests written before any implementation and must be seen to fail.
- Strict use of Red, Green, Refactor method
- Unit tests for data layer functions and utilities
- Component tests for UI interactions
- E2E tests for critical user flows
- Vitest configured with jsdom for browser environment simulation