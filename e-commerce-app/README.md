# E-commerce Application

A modern e-commerce application built with Next.js, featuring a responsive design, REST API integration, and GraphQL implementation attempts. The application provides a seamless shopping experience with features like product browsing, cart management, and category filtering.

## Features

- Responsive design optimized for all device sizes
- Product catalog with category filtering
- Shopping cart functionality with persistent storage
- Product search and filtering capabilities
- Dynamic product pages with detailed information
- Category-based navigation
- Newsletter subscription form
- Special offers and featured products sections

## Technology Stack

- **Frontend Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API for cart management
- **API Integration**: 
  - REST API (Fake Store API) for product data
  - GraphQL implementation for enhanced data fetching (partially implemented)
- **UI Components**: Custom components with Lucide React icons
- **Image Optimization**: Next.js Image component for optimal loading

## Architecture

### REST API Integration

The application primarily uses the Fake Store API for data fetching. The integration is handled through a centralized API utility (`src/utils/api.ts`) that provides methods for:

- Fetching all products
- Getting individual product details
- Filtering products by category
- Managing product ratings and reviews

### GraphQL Implementation

While the application currently relies on REST API, there's a partial GraphQL implementation that demonstrates the potential for more efficient data fetching. The GraphQL layer includes:

- Schema definitions for products and categories
- Basic queries for product listing
- Type definitions for the data model

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── graphql/        # GraphQL schemas and queries
├── pages/          # Next.js pages and API routes
├── styles/         # Global styles and Tailwind config
├── types/          # TypeScript type definitions
└── utils/          # Utility functions and API helpers
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd e-commerce-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Decisions and Trade-offs

### API Integration Strategy

- **REST vs GraphQL**: Initially started with REST API for quick implementation and familiar development pattern. GraphQL was partially implemented to demonstrate the potential for more efficient data fetching but wasn't fully adopted due to time constraints.

- **Data Fetching**: Implemented client-side data fetching for better SEO and initial page load performance. This decision allows for dynamic updates but may impact performance on slower connections.

### State Management

- Chose React Context over Redux for simplicity and sufficient functionality for current requirements
- Cart state persists through page refreshes using local storage

### UI/UX Decisions

- Implemented skeleton loading states for better user experience during data fetching
- Used Tailwind CSS for rapid development and consistent styling
- Optimized images using Next.js Image component for better performance

### Known Limitations

- Limited error handling for API failures
- No authentication implementation
- Cart data is stored locally and not synced with a backend
- GraphQL implementation is partial and not fully utilized

## Future Improvements

- Complete GraphQL integration for more efficient data fetching
- Implement user authentication and profile management
- Add server-side cart synchronization
- Enhance error handling and offline capabilities
- Implement automated testing
- Add payment processing integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
