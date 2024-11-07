# Kul Yoom - Daily Flash Sale Website Specification

## Overview
Kul Yoom is a daily flash sale website focused on the Omani market, featuring different product categories each day. The platform allows users to view, upload, and interact with products within a 24-hour timeframe.

## Core Features

### 1. Time-Based Sales System
- Daily rotation of product categories
- 24-hour countdown timer (UTC+4 Oman timezone)
- Automatic refresh at midnight
- Schedule display for upcoming categories

### 2. Product Management
- Product listing with images
- Product details including:
  - Name
  - Price (in Omani Rial)
  - Description
  - Contact number
  - Images
- Product upload functionality
- Detailed product view

### 3. User Interactions
- Product bookmarking system
- Like system for products
- Share functionality
- Direct contact with seller via phone

### 4. Navigation
- Bottom navigation bar with:
  - Home
  - Upload
  - Bookmarks
  - FAQ

## Technical Specifications

### API Endpoints
Base URL: https://kul-yoom.replit.app

#### Products
- GET `/api/products` - Fetch all products
- POST `/api/products` - Add new product
- DELETE `/api/products/:id` - Delete product

#### Bookmarks
- GET `/api/bookmarks` - Fetch bookmarked products
- POST `/api/bookmarks` - Add bookmark
- DELETE `/api/bookmarks/:id` - Remove bookmark

#### Likes
- POST `/api/likes` - Add like to product
- GET `/api/likes/:productId` - Get product likes

### Frontend Architecture

#### Pages
1. Home (`/`)
   - Current day's products
   - Category display
   - Countdown timer

2. Schedule (`/schedule`)
   - Weekly category schedule
   - Current day highlight

3. Upload Management (`/upload`)
   - Product upload form
   - Image upload capability

4. Item Detail (`/item/:id`)
   - Detailed product view
   - Interaction buttons

5. Bookmarks (`/bookmarks`)
   - Saved products list

6. FAQ (`/faq`)
   - Frequently asked questions

#### Components
1. Layout
   - Header with site title
   - Bottom navigation
   - Main content area

2. ProductCard
   - Product image
   - Basic product info
   - Interaction buttons

3. CountdownTimer
   - 24-hour countdown
   - Automatic page refresh

4. ImageUpload
   - Image upload interface
   - Preview capability

### Technology Stack
- Frontend Framework: React
- Routing: React Router
- UI Components: shadcn/ui
- Styling: Tailwind CSS
- Icons: Lucide React
- State Management: TanStack Query
- Animation: Framer Motion
- Toast Notifications: Sonner

### Design System
- Colors:
  - Primary: Red-based theme
  - Secondary: Elegant light/dark variants
  - Text: Gray scale
- Typography:
  - Right-to-left (RTL) text direction
  - Arabic language support
- Responsive Design:
  - Mobile-first approach
  - Grid-based layouts
  - Flexible image handling

### Data Models

#### Product
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  phoneNumber: string;
  image: string;
  category: string;
  likes?: number;
}
```

#### FlashSale
```typescript
interface FlashSale {
  date: string;
  category: string;
  categoryEn: string;
}
```

## Future Considerations
- User authentication system
- Admin dashboard
- Multiple image upload
- In-app messaging
- Payment integration
- Search functionality
- Category filtering
- User reviews and ratings