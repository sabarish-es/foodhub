# FoodHub - Admin Account Setup & How to Run

## QUICK START (3 STEPS)

### STEP 1: Create Admin User in Database

Open Command Prompt/Terminal and run:

```bash
mysql -u root -p restaurant_management
```

When prompted, enter your MySQL password. Then copy and paste this:

```sql
INSERT INTO users (username, email, password, role, phone, status) 
VALUES ('admin', 'admin@foodhub.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWQm', 'admin', '9876543210', 'active');
```

**Done!** You now have an admin account:
- **Username**: `admin`
- **Email**: `admin@foodhub.com`
- **Password**: `password123`

---

## STEP 2: Start Backend Server

Open **Terminal 1** in VS Code:

```bash
cd backend
node server.js
```

You should see:
```
Server running on port 3001
```

**Keep this terminal running!**

---

## STEP 3: Start Frontend Server

Open **Terminal 2** in VS Code:

```bash
npm run dev
```

You should see:
```
Ready in X seconds
```

**Keep this terminal running!**

---

## STEP 4: Open Application

Open your browser and go to:

```
http://localhost:3000
```

Login with:
- **Username**: `admin`
- **Password**: `password123`

---

## What Should Work Now

After login, you should see the admin dashboard with:
- ✓ Dashboard (graphs and stats)
- ✓ Menu Management (add/edit/delete categories and items)
- ✓ Customers (add/view/delete customers)
- ✓ Employees (add/view/delete employees)
- ✓ Tables (view and manage table status)
- ✓ Orders (manage orders)
- ✓ Cashier Interface (POS system)
- ✓ Kitchen Display (order tracking)

---

## If You Get 404 Errors

This means the backend isn't properly initialized. Run this in MySQL:

```bash
mysql -u root -p restaurant_management < backend/config/schema.sql
```

Then restart backend server (stop and run `node server.js` again).

---

## If You Get "Cannot add category" Error

1. Check Terminal 1 (backend) - there should be error details
2. Make sure you ran STEP 1 (created admin user)
3. Make sure database tables exist: `SHOW TABLES;` in MySQL
4. Restart backend server

---

## Terminal Reference

**Two terminals must be running simultaneously:**

```
Terminal 1:              Terminal 2:
cd backend               (stay in project root)
node server.js          npm run dev

Port 3001               Port 3000
(API Server)            (Frontend)
```

---

## Common Issues & Fixes

### Issue: "Cannot connect to port 3001"
- **Fix**: Backend isn't running in Terminal 1

### Issue: "Cannot find module"
- **Fix**: Run `npm install` in that folder first

### Issue: "404 Not Found" on add category
- **Fix**: Database might not have tables. Run schema.sql

### Issue: "Cannot find localhost:3000"
- **Fix**: Frontend isn't running in Terminal 2

---

## Create Additional Users

To create more admin/cashier/kitchen users, repeat STEP 1 with different usernames:

**For Cashier:**
```sql
INSERT INTO users (username, email, password, role, phone, status) 
VALUES ('cashier1', 'cashier1@foodhub.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWQm', 'cashier', '9876543211', 'active');
```

**For Kitchen Staff:**
```sql
INSERT INTO users (username, email, password, role, phone, status) 
VALUES ('kitchen1', 'kitchen1@foodhub.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWQm', 'kitchen', '9876543212', 'active');
```

All users use password: `password123`

---

## Testing Checklist

After login as admin:

- [ ] Can see dashboard with stats
- [ ] Can add a category (Menu > Categories > Add Category)
- [ ] Can add a menu item (Menu > Items > Add New Item)
- [ ] Can add a customer (Customers > Add Customer)
- [ ] Can add an employee (Employees > Add Employee)
- [ ] Can see tables (Tables)
- [ ] Can logout and login again

If all items are checked, FoodHub is working perfectly!

---

## Need Help?

1. Check browser console: **F12 → Console tab**
2. Check backend terminal for error messages
3. Make sure both servers are running
4. Try refreshing browser page (Ctrl+F5)

That's it! FoodHub is ready to use.
