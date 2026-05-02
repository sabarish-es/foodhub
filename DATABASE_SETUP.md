# Database Setup Guide

## Prerequisites
- MySQL Server installed and running
- MySQL Command Line Client or MySQL Workbench

## Step 1: Start MySQL Server

### Windows
```bash
# Start MySQL service
net start MySQL80
# or if using MySQL 5.7
net start MySQL57
```

### macOS
```bash
# If installed via Homebrew
brew services start mysql
```

### Linux
```bash
# Ubuntu/Debian
sudo systemctl start mysql
# or
sudo service mysql start
```

## Step 2: Create Database and Tables

Open MySQL Command Line and run:

```bash
mysql -u root -p < backend/config/schema.sql
```

When prompted, enter your MySQL root password (if you set one during MySQL installation).

### If no password is set:
```bash
mysql -u root < backend/config/schema.sql
```

## Step 3: Verify Database Creation

```bash
mysql -u root -p
# Enter password
mysql> USE restaurant_management;
mysql> SHOW TABLES;
```

You should see these tables:
- users
- categories
- menu_items
- restaurant_tables
- customers
- orders
- order_items
- employees
- audit_logs

## Step 4: Insert Sample Data

Option A: Using the SQL file
```bash
mysql -u root -p restaurant_management < backend/config/sample_data.sql
```

Option B: Create sample data manually
```bash
mysql -u root -p
mysql> USE restaurant_management;
```

Insert Admin User:
```sql
INSERT INTO users (username, email, password, role, phone) 
VALUES ('admin', 'admin@foodiehub.com', '$2a$10$...', 'admin', '9876543210');
```

Insert Categories:
```sql
INSERT INTO categories (name, description, status) VALUES
('Starters', 'Appetizers and starters', 'active'),
('Main Course', 'Main dishes', 'active'),
('Beverages', 'Drinks', 'active'),
('Desserts', 'Sweet dishes', 'active'),
('Combos', 'Special combo offers', 'active');
```

Insert Menu Items:
```sql
INSERT INTO menu_items (name, category_id, price, description, status) VALUES
('Chicken Biryani', 2, 250, 'Fragrant basmati rice with chicken', 'active'),
('Paneer Butter Masala', 2, 280, 'Cottage cheese in creamy tomato sauce', 'active'),
('Veg Pizza', 2, 280, 'Vegetarian pizza with fresh toppings', 'active');
```

Insert Tables:
```sql
INSERT INTO restaurant_tables (table_number, seats, status) VALUES
(1, 2, 'available'),
(2, 4, 'available'),
(3, 2, 'available'),
(4, 4, 'available'),
(5, 6, 'available');
```

## Step 5: Update Environment Variables

Edit `.env.local`:

```
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=restaurant_management
```

## Step 6: Verify Connection

Run the backend:
```bash
npm run backend
```

You should see:
```
Server running on http://localhost:5000
Database connected successfully
```

## Troubleshooting

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:** MySQL server is not running. Start it using the commands above.

### Access Denied
```
Error: Access denied for user 'root'@'localhost'
```
**Solution:** Check your password in `.env.local`. Make sure it matches your MySQL password.

### Database Does Not Exist
```
Error: Unknown database 'restaurant_management'
```
**Solution:** Run the schema.sql file again:
```bash
mysql -u root -p < backend/config/schema.sql
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Change the port in `backend/server.js` or kill the process using port 5000.

## Common SQL Commands

### View all databases
```sql
SHOW DATABASES;
```

### Select a database
```sql
USE restaurant_management;
```

### View all tables
```sql
SHOW TABLES;
```

### View table structure
```sql
DESCRIBE users;
```

### View all records in a table
```sql
SELECT * FROM categories;
```

### Delete all records (careful!)
```sql
TRUNCATE TABLE categories;
```

### Drop database (careful!)
```sql
DROP DATABASE restaurant_management;
```

## Backup and Restore

### Backup Database
```bash
mysqldump -u root -p restaurant_management > backup.sql
```

### Restore from Backup
```bash
mysql -u root -p restaurant_management < backup.sql
```

## Password Reset

### Reset MySQL Root Password

**Windows:**
```bash
mysql -u root
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
```

**macOS/Linux:**
```bash
mysqladmin -u root password 'new_password'
```

## Next Steps

1. Ensure database is set up
2. Update `.env.local` with database credentials
3. Start the backend server: `npm run backend`
4. Start the frontend: `npm run dev`
5. Login with admin credentials and start using the system

---

For more help, check the main README.md or contact support.
