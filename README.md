# Next Chapter

Next Chapter is a React Native bookstore application built as a technical assessment project.

It enables users to discover and search books, view details, manage a shopping cart, and complete checkout.

The app integrates with the [Gutendex API](https://gutendex.com/books/). Since the API does not provide pricing, book prices are intentionally mocked for demonstration purposes.

## Core Features

- Discover books
- Search books by title or author
- View detailed book information
- Add books to cart
- Manage cart items and quantities
- Checkout flow

## Technical Stack

- React Native CLI
- TypeScript
- Redux Toolkit
- React Query (`@tanstack/react-query`)
- React Navigation
- React Native Paper
- React Native Reanimated
- AsyncStorage
- i18next
- Jest

## Architecture & Engineering Decisions

- **Feature/component-based architecture** to keep modules cohesive and scalable.
- **Design system separation** for reusable UI primitives and consistent styling.
- **React Query for server state** (fetching, caching, and request lifecycle management).
- **Redux Toolkit for cart state** where deterministic global updates are required.
- **AsyncStorage cart persistence via custom Redux middleware** (instead of `redux-persist`) to keep persistence explicit, lightweight, and easy to reason about.

## Built for Future Iteration

The project is intentionally structured to support future work without large rewrites:

- **Localization-first string strategy** (`t('...')`) supports adding new languages incrementally.
- **Environment-based configuration** (`react-native-config`) keeps runtime values externalized and deployment-friendly.
- **Clear separation of server state, UI state, and design system** makes new features easier to add with minimal cross-module coupling.
- **Composable feature modules** enable introducing capabilities like wishlist, profiles, and richer recommendations in isolated units.

## Localization Strategy (Intentional)

All user-facing strings are wrapped with:

```ts
t('Some text');
```

instead of hardcoded text.

This is an intentional architectural choice. Custom tooling under `scripts/i18n-builder/` scans the project and generates i18next JSON translation files, enabling scalable localization and reducing manual translation maintenance.

Run locale generation with:

```bash
npm run i18n:builder
```

## UX & Product Decisions

### Delayed Authentication

Users are not forced to sign in before browsing or adding items to cart. Authentication is intentionally delayed until checkout to reduce onboarding friction and let users experience value first, similar to physical bookstores where browsing is unrestricted until purchase.

### Interest Onboarding

After onboarding, users select preferred genres (for example: Fiction, Science, Biography, History, Business, Self Help). This enables curated recommendations and helps users discover relevant books faster instead of navigating an undifferentiated catalog.

### Spotlight

The Home screen includes a Spotlight section that randomly highlights one book to encourage exploration and serendipitous discovery.

### Search

Search supports both title- and author-based queries.

### Shopping Cart

Cart capabilities include:

- Add book
- Remove book
- Increase quantity
- Decrease quantity
- Automatic total calculation
- Persistent storage

### Animation Feedback

Adding an item to the cart triggers a subtle "fly to cart" interaction implemented with React Native Reanimated to provide clear, responsive feedback.

## Performance Considerations

- React Query caching to reduce redundant API calls
- Pagination for scalable list rendering
- Lazy image loading where applicable
- Memoization with React hooks
- Reusable components to reduce rendering and maintenance overhead

## Testing

The project includes unit tests with Jest, with cart reducer logic covered for key business rules:

- Add item
- Remove item
- Increase quantity
- Decrease quantity
- Clear cart

## Getting Started

### Prerequisites

- Node.js `>= 22.11.0`
- React Native environment set up for Android/iOS development

### Environment Setup

1. Create your local env file from the template:

```bash
cp .env.example .env.development
```

2. Update values as needed:

- `ENV` - Runtime environment (for example: `development`, `production`)
- `APP_NAME` - App display name used by native builds
- `API_URL` - Base API URL (default: Gutendex endpoint)

Current npm scripts use `.env.development` for Android and iOS runs.

### Installation & Run

```bash
npm install
npm start
npm run android
npm run ios
```

### Helpful Scripts

```bash
npm test
npm run lint
npm run i18n:builder
```

## Folder Structure (Simplified)

```text
src/
  app-stack/       # screen-level feature modules and flows
  navigation/      # route definitions and navigators
  redux/           # global state and middleware (cart persistence)
  hooks/           # reusable stateful hooks
  shared-api/      # API contracts and shared request logic
  design-system/   # reusable UI components and theme primitives
  utility/         # cross-cutting UI/business helpers
  utils/           # constants and pure utility helpers
  i18n/            # localization setup and resources
  configs/         # runtime/app configuration
```

## Future Improvements

- Wishlist
- Reviews and ratings
- Secure payment integration
- Offline support
- Improved recommendation engine
- User profiles
- Order history
