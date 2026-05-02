# FoodieHub - Restaurant Management System

A complete restaurant management system with admin dashboard, cashier POS interface, and kitchen display system. Built with **Next.js 16**, **React 19**, **Node.js**, **Express**, and **MySQL**.

## Quick Setup

1. **Database**: Create MySQL database `restaurant_management`
2. **Environment**: Create `backend/.env` file (see SETUP.md)
3. **Install**: `npm install`
4. **Start**: `npm run dev`
5. **Access**: http://localhost:3000

For detailed instructions, see **[SETUP.md](./SETUP.md)**

## Features

### Admin Dashboard (8 Pages)
- **Dashboard**: Real-time analytics, sales trends, top-selling items
- **Menu Management**: Add/edit/delete menu items with categories and pricing
- **Categories**: Manage menu categories and organization
- **Orders**: Complete order tracking with status filtering
- **Customers**: Customer database and order history
- **Employees**: Staff management and role assignment
- **Tables**: Table status management (Available, Occupied, Reserved, Out of Order)
- **Reports**: Business analytics with charts and metrics
- **Settings**: Restaurant configuration and preferences

### Cashier Interface
- Category-based menu browsing
- Real-time item selection with images
- Current order management with quantity adjustment
- Automatic tax calculation (configurable)
- Order hold and checkout functionality
- Takeaway and dine-in options

### Kitchen Display System (KDS)
- Real-time order display with auto-refresh
- 4-column workflow (New Orders, Preparing, Ready, Completed)
- Order item details and special notes
- Status update buttons for workflow management
- Visual order prioritization

### Authentication & Security
- Three-role system: Admin, Cashier, Kitchen
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control

---

## Project Structure

```
foodhub/
├── backend/                   # Express API server
│   ├── config/               # Database config & schema
│   ├── controllers/          # API controllers
│   ├── middleware/           # Auth middleware
│   ├── .env                  # Environment variables
│   └── server.js             # Main server file
├── app/                      # Next.js frontend (App Router)
│   ├── page.tsx              # Login page
│   ├── admin/                # Admin dashboard pages
│   ├── cashier/              # Cashier POS interface
│   └── kitchen/              # Kitchen display system
├── components/               # Reusable UI components
└── lib/                      # Utilities & API client
```

---

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Shadcn/UI
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MySQL with bcryptjs for password hashing

---

## API Endpoints

Core endpoints are available for:
- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Menu**: `/api/categories`, `/api/menu-items`
- **Orders**: `/api/orders`, `/api/kitchen-orders`
- **Management**: `/api/tables`, `/api/customers`, `/api/employees`, `/api/settings`
- **Analytics**: `/api/dashboard-stats`, `/api/reports`

All endpoints are protected with JWT authentication except login.

---

## Setup & Configuration

**See [SETUP.md](./SETUP.md) for complete setup instructions including:**
- Database creation & schema setup
- Environment variable configuration
- Installation & running the project
- Troubleshooting common issues

## Default Credentials

After database setup, login with:
- **Username**: admin
- **Password**: (check your database setup)

## Important Notes

1. **Environment File Location**: Create `.env` in the `backend/` folder, NOT in the project root
2. **Database Setup**: Run the schema from `backend/config/schema.sql` 
3. **Three Roles**: Admin (full access), Cashier (orders), Kitchen (order prep)
4. **Port Requirements**: Ensure ports 3000 (frontend) and 3001 (backend) are available

---

**For complete setup and troubleshooting**, see **[SETUP.md](./SETUP.md)**
