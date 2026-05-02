# Troubleshooting "<!DOCTYPE" API Errors

## Problem
When trying to add categories, employees, or customers, you get:
```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

## Root Cause
The API is returning HTML error pages instead of JSON. This happens when:
1. **API endpoint doesn't exist** (404 error)
2. **API returns a server error** (500 error)
3. **Backend is not running**
4. **Database doesn't exist or isn't connected**
5. **Tables are missing from database**

---

## STEP 1: Verify Backend is Running

### Check if backend is running:
```bash
# Should show "Server running on port 3001"
cd backend
node server.js
```

### Check if it's listening on port 3001:
```bash
# On Windows (PowerShell):
netstat -ano | findstr :3001

# On Mac/Linux:
lsof -i :3001
```

**If backend is NOT running:**
- Go to `backend` folder
- Run: `node server.js`
- You should see: `Server running on port 3001`
- Leave this terminal open

---

## STEP 2: Verify Database Connection

### Check if database exists:
```bash
mysql -u root -p
# Enter password: sabarish0227E

# List databases:
SHOW DATABASES;

# Should show: restaurant_management

# Connect to it:
USE restaurant_management;

# Show all tables:
SHOW TABLES;
```

### Expected tables to exist:
- users
- categories
- menu_items
- orders
- order_items
- customers
- employees
- restaurant_tables
- settings

**If tables are missing:**
- Run the schema file:
```bash
mysql -u root -p restaurant_management < backend/config/schema.sql
```

---

## STEP 3: Check .env File

### Verify backend/.env exists and has correct values:

**Location:** `backend/.env`

**Required content:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sabarish0227E
DB_NAME=restaurant_management
JWT_SECRET=your_secret_key_here
PORT=3001
```

**If .env is missing:**
- Create it in the `backend` folder
- Add the content above
- Restart backend: `node server.js`

---

## STEP 4: Verify API URL is Correct

### Check in browser console (F12):

Open any admin page and check what API URL it's trying to use:

**In browser console, type:**
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
```

**It should show:** `http://localhost:3001/api`

**If it's wrong:**
- Check `.env.local` in project root (NOT backend folder)
- Or check next.config.js for publicRuntimeConfig
- It should have: `NEXT_PUBLIC_API_URL=http://localhost:3001/api`

---

## STEP 5: Test API Directly

### Test if API is returning JSON (not HTML):

**Open browser console (F12) and paste:**
```javascript
fetch('http://localhost:3001/api/categories', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
})
.then(r => {
  console.log('Status:', r.status);
  return r.text();
})
.then(t => {
  console.log('Response:', t);
  try {
    JSON.parse(t);
    console.log('✓ Valid JSON');
  } catch {
    console.log('✗ Invalid JSON (HTML returned)');
  }
})
.catch(e => console.log('Error:', e));
```

**Result:**
- If you see HTML (starts with `<!DOCTYPE`): **Backend error**
- If you see JSON: **API working correctly**

---

## STEP 6: Check Browser Console for Details

### Enable detailed logging:

1. Open browser console: **F12 → Console tab**
2. Try to add a category
3. Look for error messages that show:
   - Exact error response
   - Status code (404, 500, etc.)
   - API URL that failed

### Common errors:

| Error | Meaning | Solution |
|-------|---------|----------|
| 404 | Endpoint not found | Check API route in backend/server.js |
| 500 | Server error | Check backend logs in terminal |
| 401 | Unauthorized | Token expired, login again |
| 403 | Forbidden | User role not allowed, use admin account |

---

## STEP 7: Check Database Has Sample Data

### For tables page to work:

The tables must exist in `restaurant_tables`:

```bash
mysql -u root -p restaurant_management

# Check if any tables exist:
SELECT * FROM restaurant_tables;

# If empty, insert sample data:
INSERT INTO restaurant_tables (table_number, seats, status) VALUES 
(1, 4, 'available'),
(2, 4, 'available'),
(3, 6, 'available'),
(4, 2, 'available');
```

---

## COMPLETE CHECKLIST

Run through these in order:

- [ ] Backend running: `node server.js` shows "Server running on port 3001"
- [ ] Database exists: `mysql restaurant_management` works
- [ ] Tables created: Schema imported successfully
- [ ] .env file exists at: `backend/.env`
- [ ] .env has correct credentials
- [ ] Browser shows no JS errors in console (F12)
- [ ] API returns JSON (not HTML) in network tab
- [ ] You're logged in as admin user
- [ ] Token is valid (not expired)
- [ ] Database has data (categories, customers, etc.)

---

## Quick Fix Commands

### If everything is broken, run these in order:

```bash
# 1. Navigate to backend
cd backend

# 2. Create/fix .env file (if missing)
cat > .env << 'EOF'
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sabarish0227E
DB_NAME=restaurant_management
JWT_SECRET=your_secret_key_here
PORT=3001
EOF

# 3. Setup database
mysql -u root -p restaurant_management < config/schema.sql

# 4. Start backend
node server.js

# 5. In another terminal, start frontend:
# cd to project root
npm run dev
```

---

## Still Not Working?

1. **Check backend terminal** - Look for error messages
2. **Check browser console (F12)** - Look for detailed errors
3. **Check Network tab (F12)** - See actual API responses
4. **Restart both frontend and backend** - Fresh start sometimes helps
5. **Clear browser cache** - Ctrl+Shift+Delete
6. **Login again** - Token might be expired

---

## More Help

See these files for context:
- `SETUP.md` - How to set up the project
- `API_ERROR_FIX.md` - API-specific fixes
- `ERROR_FIXES.md` - Known errors and solutions
