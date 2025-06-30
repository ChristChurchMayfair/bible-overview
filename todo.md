# Bible Overview App - Structural Improvements Todo

## Priority Fixes (Do First)
- [x] ~~Remove `/src/components/asdfasdf.sketch` file~~ → Renamed to `assets.sketch`
- [ ] Fix typo: rename `src/data/contants.ts` → `src/data/constants.ts`
- [ ] Consolidate duplicate array utilities (`/src/lib/array.ts` and `/src/utils/array.ts`)
- [ ] Add proper error handling in `getStudy()` function (src/data/studies.ts:11)

## Folder Structure Reorganization
- [ ] Merge `/src/lib/` and `/src/utils/` into single `/src/utils/` directory
- [ ] Create `/src/hooks/` directory for custom hooks
- [ ] Create `/src/constants/` directory and move constants out of data files
- [ ] Create `/src/services/` directory for business logic
- [ ] Reorganize `/src/components/` into subdirectories:
  - [ ] Create `/src/components/common/` for reusable UI components
  - [ ] Create `/src/components/study/` for study-specific components
  - [ ] Create `/src/components/layout/` for layout components (Menu, etc.)

## Custom Hooks Implementation
- [ ] Create `useStudyProgress()` hook to track completion state
- [ ] Create `useLocalStorageStudies()` hook to centralize storage logic
- [ ] Create `useThemeData()` hook for theme management

## Constants Extraction
- [ ] Create `routes.ts` to centralize route definitions
- [ ] Create `storage.ts` to centralize localStorage keys
- [ ] Move theme data from `data.ts` to dedicated `themes.ts` file

## Services Layer
- [ ] Create `studyService.ts` for study CRUD operations
- [ ] Create `storageService.ts` for localStorage abstraction

## Type Safety Improvements
- [ ] Add validation for study data structure
- [ ] Create more specific types for theme categories
- [ ] Improve error handling throughout the app

## Performance Optimizations
- [ ] Add React.memo to StudyListItem component
- [ ] Implement lazy loading for study content
- [ ] Consider virtualizing long study lists

## Data Management Enhancements
- [ ] Add proper error boundaries
- [ ] Implement loading states
- [ ] Consider using React Query for data fetching

---

**Notes:**
- Work through these in order, starting with Priority Fixes
- Test after each section to ensure nothing breaks
- Consider creating feature branches for larger changes