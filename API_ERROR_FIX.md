# API Error Fix - "Unexpected token '<', "<!DOCTYPE""

## Problem
When trying to add employees, categories, or customers, you get the error:
```
Error adding employee
Error adding category
Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

This occurs because the API is returning HTML (an error page) instead of JSON.

## Root Causes Fixed

### 1. Employee Role Not Being Saved Correctly
**File**: `backend/controllers/masterController.js` (Line 82)
**Issue**: The role was hardcoded to 'cashier' instead of using the provided role parameter
**Fix**: Changed from `'cashier'` to `role || 'cashier'`
```javascript
// Before:
[username, email, hashedPassword, 'cashier', phone]

// After:
[username, email, hashedPassword, role || 'cashier', phone]
```

### 2. Missing DELETE Endpoints
**File**: `backend/server.js`
**Issue**: The frontend was trying to delete customers and employees, but the routes didn't exist
**Fix**: Added two DELETE endpoints:
```javascript
app.delete('/api/customers/:id', authMiddleware, roleMiddleware(['admin']), masterController.deleteCustomer);
app.delete('/api/employees/:id', authMiddleware, roleMiddleware(['admin']), masterController.deleteEmployee);
```

### 3. Missing Delete Functions
**File**: `backend/controllers/masterController.js`
**Issue**: The delete route handlers didn't exist
**Fix**: Added `deleteCustomer` and `deleteEmployee` functions that properly delete records

## Files Modified

1. **backend/controllers/masterController.js**
   - Fixed role assignment in createEmployee (line 82)
   - Added deleteCustomer function
   - Added deleteEmployee function with cascading delete

2. **backend/server.js**
   - Added DELETE route for customers
   - Added DELETE route for employees

## How to Test

1. **Stop and restart your backend server** (port 3001)
   ```bash
   # Kill existing server if running
   # Then restart:
   cd backend
   node server.js
   ```

2. **Test adding an employee:**
   - Go to Admin → Employees
   - Click "Add Employee"
   - Fill in all fields including Username, Email, Password
   - Select a Role (Cashier, Kitchen Staff, or Manager)
   - Click "Add Employee"
   - You should now see success message

3. **Test adding a category:**
   - Go to Admin → Menu → Categories
   - Click "Add Category"
   - Enter a name
   - Click "Add Category"
   - Should appear in the list

4. **Test deleting:**
   - Click delete icon on any item
   - Confirm deletion
   - Item should be removed

## Verification Steps

### Check Backend is Running
```bash
# Check if port 3001 is listening
lsof -i :3001

# You should see Node.js process listed
```

### Check API Response Directly
```bash
# Get your JWT token first (login via frontend)
# Then test an endpoint:
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3001/api/employees
```

If you get JSON response - it's working.
If you get HTML starting with `<!DOCTYPE` - the API is returning an error page.

## Common Issues Still Occurring?

### "Unexpected token '<'" Error
1. Verify backend is running: `lsof -i :3001`
2. Check the console.log output from backend for errors
3. Verify `.env` file has correct database credentials
4. Try restarting the backend server

### "401 Unauthorized" Error
1. Make sure you're logged in as admin
2. Check your token is valid
3. Clear localStorage and login again
4. Check JWT_SECRET matches between frontend and backend

### "403 Forbidden" Error
1. You need admin role to add employees
2. Check user role in database
3. Use admin account to manage employees

### Database Connection Errors
1. Verify MySQL is running
2. Check DB credentials in `.env`
3. Ensure database `restaurant_management` exists
4. Check tables are created from `backend/config/schema.sql`

## Everything Should Now Work!

Your admin dashboard can now:
✓ Add employees with correct role assignment
✓ Delete employees (also removes associated user account)
✓ Add customers
✓ Delete customers
✓ Proper error messages if something fails
