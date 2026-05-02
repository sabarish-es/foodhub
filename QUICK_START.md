# FoodieHub - Quick Start Guide (5 Minutes)

## Step 1: Setup Database (1 min)
```bash
# Login to MySQL and run the schema
mysql -u root
SOURCE backend/config/schema.sql;
EXIT;
```

## Step 2: Configure Environment
Edit `.env.local`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=restaurant_management
JWT_SECRET=your_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Step 3: Install & Start (2 min)
```bash
# Install dependencies
pnpm install

# Start both services
pnpm run dev
```

## Step 4: Access Application (1 min)

### Default Admin Login:
- **URL**: http://localhost:3000
- **Username**: admin
- **Password**: (set one via API call)

### Create Admin User via API:
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@foodiehub.com",
    "password": "admin123",
    "role": "admin",
    "phone": "9876543210"
  }'
```

### Test Login:
```
Username: admin
Password: admin123
```

## Step 5: Create Cashier & Kitchen Users

### Option A: Via Admin Dashboard
1. Login as admin → http://localhost:3000/admin/employees
2. Click "Add Employee"
3. Fill details with role "Cashier" or "Kitchen"

### Option B: Via API
**Cashier:**
```bash
curl -X POST http://localhost:3001/api/auth/create-user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "username": "cashier1",
    "email": "cashier@foodiehub.com",
    "password": "cashier123",
    "role": "cashier",
    "phone": "9876543211"
  }'
```

**Kitchen:**
```bash
curl -X POST http://localhost:3001/api/auth/create-user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "username": "kitchen1",
    "email": "kitchen@foodiehub.com",
    "password": "kitchen123",
    "role": "kitchen",
    "phone": "9876543212"
  }'
```

## Access All Interfaces

| Role | URL | Purpose |
|------|-----|---------|
| Admin | http://localhost:3000 | Full management |
| Cashier | http://localhost:3000/cashier | Order taking |
| Kitchen | http://localhost:3000/kitchen | Order tracking |

## Common Issues

**Port 3000/3001 already in use?**
```bash
# Kill process using port
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

**Database connection error?**
- Ensure MySQL is running
- Check credentials in .env.local
- Run schema.sql again

**Login not working?**
- Verify user was created successfully
- Check backend console for errors
- Clear browser cache (Ctrl+Shift+Delete)

## What's Next?

1. **Explore Admin Dashboard**: Check all 8 pages
2. **Add Menu Items**: Admin → Menu Management
3. **Test Cashier**: Login with cashier account → Take an order
4. **Check Kitchen Display**: Login with kitchen account → See orders
5. **View Reports**: Admin → Reports page for analytics

## Demo Flow

1. Login as Admin
2. Add some menu items and categories
3. Create cashier and kitchen users
4. Login as Cashier → Create an order
5. Login as Kitchen → See order appear and mark as preparing/ready
6. Login as Admin → View order in Orders page and Dashboard

---

**You're all set! The system is ready to use.** 🚀
