# Fix: "Unexpected token '<'" JSON Error

## What Was Fixed

### 1. Category Page Error Handling
**File:** `app/admin/categories/page.tsx`

**Problems Fixed:**
- When API returned error (500), trying to parse as JSON failed
- Error messages didn't show actual problem
- No fallback for HTML error responses

**Solutions Applied:**
- Added try-catch around JSON parsing
- Shows HTTP status code if JSON parsing fails
- Displays proper error message with actual error details
- Better debugging information in console

### 2. Tables Page Improvements  
**File:** `app/admin/tables/page.tsx`

**Problems Fixed:**
- No message shown when tables weren't loading
- No error feedback if API failed
- Unclear why page was empty

**Solutions Applied:**
- Added "Loading tables..." message
- Added "No tables found" message with explanation
- Added console logging to track API responses
- Better error handling with status codes

---

## How to Use

### After these fixes, you'll get better error messages:

**Before:**
```
Error adding category
```

**After:**
```
Failed to add category: Server returned 500 Internal Server Error
```

OR

```
Failed to add category: Categories must have a name
```

---

## What to Do Now

### Step 1: Restart Backend
```bash
cd backend
node server.js
```
You should see: `Server running on port 3001`

### Step 2: Refresh Browser
- Go to http://localhost:3000
- Press Ctrl+F5 (hard refresh)
- Login again if needed

### Step 3: Try Adding a Category
1. Go to Admin → Menu → Categories
2. Click "Add Category"
3. Enter a category name
4. Click "Add Category"

**If it works:** ✓ Problem solved!

**If error persists:** Read the detailed error message and check `TROUBLESHOOT_API_ERRORS.md`

---

## Common Error Messages & Solutions

### Error: "Server returned 500 Internal Server Error"

**Solution:**
1. Check backend logs (terminal running `node server.js`)
2. Look for detailed error message
3. Usually means: invalid data or database issue
4. See TROUBLESHOOT_API_ERRORS.md Step 6

### Error: "Server returned 404 Not Found"

**Solution:**
1. Verify backend is running on port 3001
2. Check API URL is correct: `http://localhost:3001/api`
3. Verify routes exist in `backend/server.js`

### Error: "Server returned 401 Unauthorized"

**Solution:**
1. Your token expired
2. Logout and login again
3. If still fails: clear localStorage and refresh

### Tables Page Shows "No tables found"

**Solution:**
1. Database might not have any tables
2. Insert sample data:
```bash
mysql -u root -p restaurant_management

INSERT INTO restaurant_tables (table_number, seats, status) VALUES 
(1, 4, 'available'),
(2, 4, 'available'),
(3, 6, 'available');
```

---

## Files Changed

- `app/admin/categories/page.tsx` - Better error handling
- `app/admin/tables/page.tsx` - Better error messages and loading state

## Files Added

- `TROUBLESHOOT_API_ERRORS.md` - Complete troubleshooting guide
- `FIX_JSON_ERROR.md` - This file

---

## Testing Checklist

After applying fixes:

- [ ] Backend running: Shows "Server running on port 3001"
- [ ] Database: `mysql restaurant_management` works
- [ ] Can login to admin dashboard
- [ ] Can add category: No error message
- [ ] Can add employee: No error message  
- [ ] Tables page shows tables or "No tables found" message
- [ ] Browser console shows no red errors

---

## Next Steps

If everything works:
1. Test each admin section (categories, menu, customers, employees)
2. Test each operation (add, edit, delete)
3. Verify data appears in tables

If something still doesn't work:
1. Check `TROUBLESHOOT_API_ERRORS.md`
2. Run the complete checklist in Step 7
3. Check browser console (F12) for detailed errors
