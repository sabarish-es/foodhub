# FoodieHub - Restaurant Management System Setup

## Quick Start - Step by Step

### 1. Prerequisites
- Node.js (v16 or higher)
- MySQL Server running locally
- npm or pnpm installed

### 2. Database Setup

**Create MySQL Database:**
```sql
CREATE DATABASE restaurant_management;
```

**Run the schema (in your MySQL client):**
```sql
-- Use the schema.sql file from backend/config/schema.sql
-- This creates all required tables
```

### 3. Environment Configuration

**Location:** Create `.env` file in the `backend/` folder (NOT in root)

**Path:** `foodhub/backend/.env`

**Copy and paste this into your `.env` file:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sabarish0227E
DB_NAME=restaurant_management
JWT_SECRET=your_secret_key_change_this_to_something_secure
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 4. Installation

Navigate to the root project directory and install dependencies:
```bash
npm install
# OR if using pnpm:
pnpm install
```

### 5. Running the Project

**Start both backend and frontend together:**
```bash
npm run dev
```

This command runs:
- Backend server on `http://localhost:3001`
- Frontend (Next.js) on `http://localhost:3000`

**To start them separately:**
```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
npm run next dev
# OR
next dev
```

### 6. Access the Application

- **Login Page:** http://localhost:3000
- **Demo Credentials:**
  - Username: `admin`
  - Password: (Check your database for hashed password)

### 7. Default Roles & Access

After login, you are routed based on your role:
- **Admin:** `/admin/dashboard` - Full access to all features
- **Cashier:** `/cashier` - Order management
- **Kitchen:** `/kitchen` - Order preparation

### 8. Features

**Admin Dashboard:**
- Menu Management
- Category Management
- Order Management
- Customer Management
- Employee Management
- Table Management
- Reports & Analytics
- Settings

**Cashier Interface:**
- Create Orders
- View Order Status
- Customer Management

**Kitchen Interface:**
- View pending orders
- Update order status

## Troubleshooting

### Port 3000 or 3001 already in use
```bash
# Change the port in backend/.env
PORT=3002

# For frontend, use:
next dev -p 3002
```

### Database connection error
- Verify MySQL is running
- Check credentials in backend/.env match your MySQL setup
- Ensure database `restaurant_management` exists

### Login not working
- Check if backend is running on port 3001
- Verify `NEXT_PUBLIC_API_URL` in backend/.env is correct
- Check browser console for API errors

### Sidebar not showing after login
- Clear browser localStorage: Open DevTools → Application → Storage → Local Storage → Clear all
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Ensure you're logged in as admin to access admin dashboard

## Project Structure

```
foodhub/
├── app/                    # Next.js frontend
│   ├── admin/             # Admin dashboard pages
│   ├── cashier/           # Cashier interface
│   ├── kitchen/           # Kitchen interface
│   └── page.tsx           # Login page
├── backend/               # Express.js backend
│   ├── .env              # Environment variables (create this)
│   ├── config/           # Database configuration
│   ├── controllers/      # API controllers
│   ├── middleware/       # Auth middleware
│   └── server.js         # Main server file
├── components/           # Reusable React components
├── public/              # Static assets
└── package.json         # Dependencies
```

## Security Notes

- Change `JWT_SECRET` in .env to a strong, random string
- Never commit `.env` file to version control
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Hash passwords using bcryptjs (already implemented)

## Support

For issues or questions, check the browser console (F12) for error messages and ensure:
1. Backend is running
2. Database is accessible
3. Environment variables are correctly set
4. All dependencies are installed
