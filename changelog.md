# Changelog

## [2025-11-01] - Project Reset

### Changed
- Reset project to fresh Expo with expo-router configuration
- Removed all custom features, hooks, context, and components
- Cleaned up to default bare Expo template structure

## [Previous Version]

### Added
- Created `src/app/(tabs)/index.tsx` to redirect from `/tabs` to the home screen, fixing an "Unmatched Route" error.
- Set the login screen as the initial route for the app.

### Changed
- Updated the login screen to redirect to `/home` instead of `/members` after a successful login.
- Modified the root layout to use `index` as the initial route name.
- Updated the app blueprint to include the authentication flow.

### Removed
- Deleted the now-redundant `src/app/login.tsx` file.
