# Troubleshooting Guide

## Common Issues and Solutions

---

## Issue 1: Modal Not Opening (Add New Item)

### Problem
The "Add New Item" button doesn't open a modal dialog.

### Solution
**This has been fixed!** The modal component is now properly implemented:

1. **Verify Modal Component Exists**
   ```bash
   ls -la components/Modal.tsx
   ```

2. **Check the Menu Page**
   - The `Menu page` now imports: `import { Modal } from '@/components/Modal';`
   - Click handler is connected: `onClick={() => setShowAddModal(true)}`

3. **If modal still doesn't appear:**
   - Clear browser cache: `Ctrl+Shift+Delete`
   - Hard refresh: `Ctrl+Shift+R`
   - Check browser console (F12) for errors

---

## Issue 2: Pages Not Loading Data (Categories, Customers, Employees)

### Problem
Tables show "Loading..." or "No data found" even though data exists in database.

### Solution

#### Step 1: Verify Environment Variables
```bash
# Check .env.local exists
cat .env.local
```

Should contain:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Step 2: Check Backend is Running
```bash
# Terminal 1: Start Backend
npm run backend

# Should show:
# Server running on http://localhost:5000
# Database connected successfully
```

#### Step 3: Verify Database Connection
```bash
mysql -u root -p restaurant_management
mysql> SELECT COUNT(*) FROM categories;
mysql> SELECT COUNT(*) FROM customers;
mysql> SELECT COUNT(*) FROM employees;
```

If counts are 0, insert sample data:
```sql
INSERT INTO categories (name, status) VALUES
('Starters', 'active'),
('Main Course', 'active'),
('Beverages', 'active');
```

#### Step 4: Check API Endpoints
Open browser console (F12) and check if API calls succeed:
- Open DevTools → Network tab
- Refresh page
- Look for requests to `http://localhost:5000/api/...`
- Check response status (should be 200 for success)

---

## Issue 3: Database Connection Error

### Problem
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

### Solution

**Step 1: Start MySQL Server**

Windows:
```bash
net start MySQL80
```

macOS:
```bash
brew services start mysql
```

Linux:
```bash
sudo systemctl start mysql
```

**Step 2: Verify MySQL is Running**
```bash
mysql -u root -p
mysql> SELECT 1;
```

**Step 3: Check Credentials in .env.local**
```bash
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=restaurant_management
```

**Step 4: Test Database Connection Directly**
```bash
mysql -h localhost -u root -p restaurant_management
```

---

## Issue 4: API Errors

### Problem
```
Error: 401 Unauthorized
Error: 403 Forbidden
Error: 404 Not Found
```

### Solution

**401 Unauthorized - Missing or Invalid Token**
```javascript
// Check localStorage in browser console (F12)
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('user'));

// If empty, login again
// Go to http://localhost:3000 and login with admin credentials
```

**403 Forbidden - Insufficient Permissions**
```
// Your user role doesn't have permission for this action
// Make sure you're logged in as Admin
```

**404 Not Found - API Endpoint Issue**
```
// Check if backend is running
// Verify API_URL in .env.local is correct
// Check backend/server.js for route definitions
```

---

## Issue 5: Mobile Responsiveness Problems

### Solution
This has been fixed with:
- Responsive grid layouts (flex-col md:flex-row)
- Responsive text sizes (text-sm md:text-base md:text-lg)
- Responsive padding (p-4 md:p-6)
- Hidden columns on mobile (hidden md:table-cell)
- Fixed sidebar on mobile (md:static)

Test on different screen sizes:
```
Chrome DevTools → F12 → Toggle Device Toolbar (Ctrl+Shift+M)
```

---

## Issue 6: Sidebar Navigation Issues

### Problem
Sidebar is hidden on mobile or navigation not working.

### Solution
**For Mobile (< 768px):**
- Click the hamburger menu (☰) to open sidebar
- Sidebar appears as overlay
- Click an item to navigate

**For Desktop (≥ 768px):**
- Sidebar is always visible
- Click menu items to navigate

---

## Issue 7: Login Issues

### Problem
Can't login with admin credentials.

### Solution

**Option 1: Create Admin User via MySQL**
```bash
mysql -u root -p restaurant_management

INSERT INTO users (username, email, password, role, status) 
VALUES ('admin', 'admin@foodiehub.com', '$2a$10$hashed_password', 'admin', 'active');
```

**Option 2: Create via API**
```bash
# After backend is running:
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@foodiehub.com",
    "password": "admin123",
    "role": "admin"
  }'
```

**Option 3: Check Default Credentials**
```
Username: admin
Email: admin@foodiehub.com
Password: admin123 (might need to be hashed)
```

---

## Issue 8: Port Already in Use

### Problem
```
Error: listen EADDRINUSE :::5000
Error: listen EADDRINUSE :::3000
```

### Solution

**Find and Kill Process Using Port**

Windows:
```bash
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

macOS/Linux:
```bash
lsof -i :5000
kill -9 <process_id>
```

**Use Different Port**

Backend (backend/server.js):
```javascript
const PORT = 5001; // Change from 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Update .env.local:
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## Issue 9: CORS Errors

### Problem
```
Access to XMLHttpRequest at 'http://localhost:5000/api/categories' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

### Solution

**This is already configured in backend/server.js:**
```javascript
const cors = require('cors');
app.use(cors()); // Allow all origins during development
```

**If still getting CORS errors:**

1. Verify backend/server.js has cors setup
2. Check that backend is running on localhost:5000
3. Restart backend: `npm run backend`
4. Hard refresh browser: `Ctrl+Shift+R`

---

## Issue 10: Page Layout Issues

### Problem
Tables overflowing, text too small, buttons misaligned on mobile.

### Solution
**This has been fixed with responsive Tailwind classes:**

- `flex-col md:flex-row` - Stack on mobile, side-by-side on desktop
- `text-xs md:text-sm` - Smaller text on mobile
- `hidden md:table-cell` - Hide columns on mobile
- `px-2 md:px-4` - Reduce padding on mobile
- `w-full md:w-auto` - Full width on mobile, auto on desktop

**Clear Browser Cache**
```
Ctrl+Shift+Delete → Clear all
Hard Refresh: Ctrl+Shift+R
```

---

## Quick Fix Checklist

- [ ] MySQL server is running
- [ ] Database created: `restaurant_management`
- [ ] Backend running: `npm run backend` (Terminal 1)
- [ ] Frontend running: `npm run dev` (Terminal 2)
- [ ] .env.local file exists with correct settings
- [ ] Try different browser (Chrome, Firefox, Safari)
- [ ] Clear browser cache and refresh
- [ ] Check browser console (F12) for errors
- [ ] Check terminal for error messages

---

## Getting Help

If you're still having issues:

1. **Check the logs**
   ```bash
   # Browser console (F12)
   # Backend terminal output
   ```

2. **Verify configuration**
   ```bash
   cat .env.local
   mysql -u root -p restaurant_management -e "SHOW TABLES;"
   ```

3. **Test API directly**
   ```bash
   curl http://localhost:5000/api/categories
   ```

4. **Check network tab** (Chrome DevTools → Network)
   - Look for failed requests
   - Check response status and error messages

---

## Still Need Help?

Common solutions:
1. Restart both terminal windows
2. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
3. Clear database and reimport: `mysql -u root -p < backend/config/schema.sql`
4. Check System requirements: Node 16+, MySQL 5.7+, Chrome/Firefox latest

For detailed setup: See `QUICK_START.md` or `RUN_INSTRUCTIONS.txt`
