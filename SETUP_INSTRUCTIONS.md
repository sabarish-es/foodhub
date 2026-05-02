# FoodieHub - Restaurant Management System
## Complete Setup & Run Instructions

### Project Overview
FoodieHub is a full-stack restaurant management system with three user roles:
- **Admin**: Complete restaurant management (8 dashboard pages)
- **Cashier**: Point-of-sale interface with order management
- **Kitchen**: Kitchen display system for order tracking

---

## Prerequisites
- **Node.js** (v18 or higher)
- **MySQL** (v5.7 or higher) or any MySQL-compatible database
- **pnpm** or npm package manager

---

## Installation & Setup

### Step 1: Install Dependencies
```bash
cd /vercel/share/v0-project
pnpm install
```

### Step 2: Setup Database

#### Option A: Using MySQL Command Line
```bash
# Open MySQL client
mysql -u root -p

# Run the SQL schema
source backend/config/schema.sql;
```

#### Option B: Create Database Manually
1. Open your MySQL client or phpMyAdmin
2. Import the file: `backend/config/schema.sql`
3. Database name will be: `restaurant_management`

### Step 3: Configure Environment Variables
Edit `.env.local` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=restaurant_management
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Frontend Configuration
NODE_ENV=development
```

**Important**: Change `DB_PASSWORD` and `JWT_SECRET` to secure values in production.

### Step 4: Create Default Admin User
The database setup includes a default admin user:
- **Username**: `admin`
- **Email**: `admin@foodiehub.com`
- **Password**: Hash included in schema (you need to set your own)

To create a new admin user via API after starting the backend:

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@foodiehub.com",
    "password": "your_secure_password",
    "role": "admin",
    "phone": "9876543210"
  }'
```

---

## Running the Application

### Start Both Frontend & Backend
```bash
# From project root directory
pnpm run dev
```

This command will:
- Start Node.js backend on `http://localhost:3001`
- Start Next.js frontend on `http://localhost:3000`

### Alternative: Start Services Separately

**Terminal 1 - Start Backend:**
```bash
npm run backend
# or
node backend/server.js
```

**Terminal 2 - Start Frontend:**
```bash
pnpm dev
# or
npm run dev
```

---

## Access the Application

### Admin Interface
- **URL**: http://localhost:3000
- **Login with**: admin / password (from step 4)
- **Features**:
  - Dashboard with analytics
  - Menu & Category Management
  - Order Management
  - Customer Management
  - Employee Management
  - Table Management
  - Reports & Analytics
  - Settings

### Cashier Interface
- **URL**: http://localhost:3000/cashier
- Create a cashier user from Admin → Employees
- **Features**:
  - Menu selection by category
  - Current order management
  - Quick checkout
  - Order subtotals with tax

### Kitchen Display System
- **URL**: http://localhost:3000/kitchen
- Create a kitchen staff user from Admin → Employees
- **Features**:
  - Real-time order display
  - Order status management
  - Order items visibility
  - Auto-refresh every 5 seconds

---

## Creating Users

### From Admin Dashboard:

1. **Login as Admin**
2. **Go to Employees → Add Employee**
3. **Fill in details**:
   - Username
   - Email
   - Password
   - Role (Cashier or Kitchen Staff)
   - Phone Number
   - Hire Date
4. **Save**

The new user can then login with their credentials.

---

## Database Tables

The system creates these tables:
- `users` - All user accounts
- `categories` - Menu categories
- `menu_items` - Individual menu items
- `restaurant_tables` - Table management
- `customers` - Customer information
- `orders` - Order records
- `order_items` - Items in each order
- `employees` - Employee details
- `settings` - Restaurant configuration

---

## API Endpoints Reference

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user
- `POST /api/auth/create-user` - Admin create user

### Menu
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `GET /api/menu-items` - Get menu items
- `POST /api/menu-items` - Create menu item (Admin)

### Orders
- `POST /api/orders` - Create order (Cashier)
- `GET /api/orders` - Get orders (All roles)
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/kitchen-orders` - Get kitchen orders

### Others
- `GET /api/tables` - Get all tables
- `GET /api/customers` - Get customers
- `GET /api/employees` - Get employees
- `GET /api/dashboard-stats` - Dashboard statistics
- `GET /api/settings` - Get settings

---

## Troubleshooting

### Backend not starting?
- Check if port 3001 is available
- Verify MySQL is running
- Check database credentials in `.env.local`
- Check backend console for errors

### Frontend not loading?
- Check if port 3000 is available
- Clear browser cache
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for errors

### Database connection error?
- Verify MySQL is running
- Check credentials in `.env.local`
- Ensure database `restaurant_management` exists
- Run schema.sql again if needed

### Login failing?
- Verify user exists in database
- Check JWT_SECRET is consistent
- Check API is running on port 3001
- Check browser network tab for API errors

---

## File Structure

```
project-root/
├── backend/
│   ├── config/
│   │   ├── db.js          - Database connection
│   │   └── schema.sql     - Database schema
│   ├── controllers/       - Business logic
│   ├── middleware/        - Auth middleware
│   └── server.js          - Express server
├── app/
│   ├── page.tsx           - Login page
│   ├── admin/             - Admin pages
│   ├── cashier/           - Cashier interface
│   ├── kitchen/           - Kitchen interface
│   └── layout.tsx         - Root layout
├── components/            - Reusable components
├── .env.local            - Environment variables
└── package.json          - Dependencies
```

---

## Features Implemented

### Admin Dashboard (8 Pages)
✓ Dashboard - Analytics & overview
✓ Menu Management - CRUD operations
✓ Categories - Category management
✓ Orders - Order viewing & filtering
✓ Customers - Customer database
✓ Employees - Staff management
✓ Tables - Table status management
✓ Reports - Business analytics
✓ Settings - Restaurant configuration

### Cashier Interface
✓ Category-based menu browsing
✓ Real-time item selection
✓ Current order management
✓ Quantity adjustment
✓ Automatic tax calculation
✓ Checkout & order submission

### Kitchen Display System
✓ Real-time order display
✓ Status-based columns (New, Preparing, Ready, Completed)
✓ Item details per order
✓ Status update buttons
✓ Auto-refresh every 5 seconds
✓ Table/Takeaway indication

---

## Next Steps / Enhancements

1. Add payment gateway integration
2. Implement order printing
3. Add inventory management
4. Add SMS/Email notifications
5. Add delivery management
6. Add loyalty program
7. Add analytics reports export
8. Add multi-language support
9. Add mobile app
10. Add table QR code ordering

---

## Support & Troubleshooting

If you encounter issues:
1. Check the console logs (backend terminal)
2. Check browser developer console (F12)
3. Verify all services are running
4. Check database connection
5. Ensure all ports are available (3000, 3001)
6. Clear cache and rebuild if needed

---

## Security Notes

- Change default admin password immediately
- Use strong JWT secret in production
- Use HTTPS in production
- Implement rate limiting
- Sanitize all inputs
- Use environment variables for sensitive data
- Regular database backups
- Update dependencies regularly

---

## License & Credits

Built with:
- Next.js 16
- React 19
- Node.js & Express
- MySQL 2
- Tailwind CSS
- Shadcn/UI Components

---

**Version**: 1.0.0  
**Last Updated**: 2024

For questions or support, contact your development team.
