# Brand - eCommerce Marketplace

A full-featured eCommerce marketplace platform with admin panel, built with Node.js and Express.

## Features

- **Homepage**: Hero section, deals & offers with countdown, category product grids, supplier inquiry form, recommended items, services section, suppliers by region, newsletter subscription
- **Product Listing**: Grid/List view, filters (category, brand, price, condition, ratings, verified), sorting, pagination
- **Product Detail**: Image gallery, color/size selection, quantity selector, tier pricing, tabs (description/specs/reviews/shipping), supplier card, related products
- **Shopping Cart**: Add/remove items, quantity control, coupon codes, order summary, saved for later
- **Authentication**: Login and registration with form validation
- **Checkout**: Shipping address, payment method selection, order placement
- **Admin Panel**: Dashboard with stats, order management, product listing, user management
- **Category Pages**: 8 categories with 20 products each
- **Country Pages**: 10 countries with 40 products each (400 country-specific products)
- **Total**: 560 products

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla JS (SPA with hash routing)
- **Styling**: CSS with custom properties
- **Data**: JSON file-based persistence (data.json)

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open in browser
# http://localhost:3000
```

## Demo Accounts

| Role  | Email             | Password |
|-------|-------------------|----------|
| Admin | admin@shop.com    | admin123 |
| User  | user@shop.com     | user123  |

## Admin Panel

Access the admin panel at: `http://localhost:3000/#admin/dashboard` (requires admin login)

Features:
- Revenue tracking (today, week, month, total)
- Order management (processing, shipped, delivered, cancelled)
- Product catalog view
- User management

## Routes

| Route | Description |
|-------|-------------|
| `/` or `/#home` | Homepage |
| `/#category/{id}` | Category listing (automobiles, clothing, home, electronics, tools, sports, pets, machinery) |
| `/#country/{code}` | Country products (AE, AU, US, RU, IT, DK, FR, CN, GB, JP) |
| `/#product/{id}` | Product detail page |
| `/#cart` | Shopping cart |
| `/#checkout` | Checkout page |
| `/#login` | Login page |
| `/#register` | Registration page |
| `/#admin/dashboard` | Admin dashboard |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (supports ?category, ?country, ?search, ?sort, ?limit, ?page) |
| GET | `/api/products/:id` | Get product details with related products |
| GET | `/api/categories` | List all categories |
| GET | `/api/countries` | List all countries |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/orders` | Create order |
| GET | `/api/admin/stats` | Admin dashboard stats |
| GET | `/api/admin/orders` | All orders |
| PUT | `/api/admin/orders/:id/status` | Update order status |
| GET | `/api/admin/users` | All users |
| GET | `/api/admin/products` | All products |

## Project Structure

```
ecommerce-site/
├── server.js          # Express server + API routes
├── package.json       # Dependencies
├── data.json          # Product/user/order data (auto-generated)
├── public/
│   └── index.html     # Single-page application (HTML + CSS + JS)
└── README.md
```

## Customization

To reset the product database, delete `data.json` and restart the server. The server will regenerate all product data automatically.

## License

MIT
