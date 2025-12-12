# Authentication System Documentation

## 🔐 Overview

This project now includes a complete authentication system with user management capabilities. The system features:

- **Secure Login** - Password-based authentication with bcrypt hashing
- **Role-Based Access Control** - Four user roles (Super Admin, Admin, Editor, Viewer)
- **User Management** - Admin can create, edit, activate/deactivate, and delete users
- **Password Management** - Only admins can reset user passwords
- **Session Management** - Client-side session persistence with localStorage
- **Beautiful UI** - Modern, responsive login and dashboard interfaces

## 🚀 Quick Start

### 1. Database Setup

The users table is automatically created when you first run the application. The database will be seeded with two default users:

**Super Admin Account:**
- Email: `superadmin@techmosaic.com`
- Password: `admin123`
- Role: Super Admin

**Admin Account:**
- Email: `admin@techmosaic.com`
- Password: `admin123`
- Role: Admin

⚠️ **IMPORTANT**: Change these default passwords immediately in production!

### 2. Start the Application

```bash
npm run dev
```

### 3. Login

Navigate to `/login` and use one of the default accounts above to sign in.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts          # Login endpoint
│   │   │   └── logout/route.ts         # Logout endpoint
│   │   └── users/
│   │       ├── route.ts                # List/Create users
│   │       └── [id]/route.ts          # Get/Update/Delete user
│   ├── dashboard/
│   │   ├── page.tsx                   # Main dashboard
│   │   ├── users/page.tsx            # User management
│   │   └── projects/page.tsx         # Projects (existing)
│   └── login/page.tsx                # Login page
├── contexts/
│   └── AuthContext.tsx               # Authentication context
└── lib/
    └── db.ts                         # Database with users table
```

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,              -- bcrypt hashed
  role TEXT NOT NULL CHECK(role IN ('Super Admin', 'Admin', 'Editor', 'Viewer')),
  status TEXT NOT NULL CHECK(status IN ('Active', 'Inactive')),
  avatar TEXT,                         -- User initials
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔑 User Roles & Permissions

### Super Admin
- ✅ Full system access
- ✅ Manage all users
- ✅ Reset any password
- ✅ Delete users (except super admin)
- ✅ Manage all projects
- ✅ System configuration

### Admin
- ✅ Manage users
- ✅ Reset passwords
- ✅ Manage content
- ✅ View analytics
- ✅ Manage projects

### Editor
- ✅ Create content
- ✅ Edit content
- ✅ View projects
- ❌ Cannot manage users

### Viewer
- ✅ View content
- ✅ View projects
- ❌ Cannot edit or manage anything

## 🎨 Features

### Login System
- ✨ Beautiful gradient UI
- 🔒 Secure password handling
- 👁️ Password visibility toggle
- ⚠️ Error handling with toast notifications
- 🎯 Auto-redirect if already logged in

### Dashboard
- 📊 Welcome card with user info
- 🚀 Quick actions for different sections
- 🔐 Role-based permission display
- 📈 Account status information
- 🚪 Logout functionality

### User Management (Admin Only)
- ➕ Create new users with validation
- ✏️ Edit existing users
- 🔑 Reset user passwords
- ⏯️ Activate/Deactivate users
- 🗑️ Delete users (with protection for super admin)
- 🔍 Search and filter by role/status
- 📊 User statistics dashboard

## 🔐 API Endpoints

### Authentication

#### POST `/api/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "admin@techmosaic.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Admin User",
    "username": "admin",
    "email": "admin@techmosaic.com",
    "role": "Admin",
    "status": "Active",
    "avatar": "AU",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/auth/logout`
Logout current user.

### User Management

#### GET `/api/users`
Get all users (with optional filters).

**Query Parameters:**
- `role` - Filter by role (Super Admin, Admin, Editor, Viewer)
- `status` - Filter by status (Active, Inactive)
- `search` - Search by name, username, or email

**Response:**
```json
{
  "users": [...]
}
```

#### POST `/api/users`
Create a new user (Admin only).

**Request:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "Editor",
  "status": "Active"
}
```

#### GET `/api/users/[id]`
Get a specific user.

#### PUT `/api/users/[id]`
Update a user (Admin only).

**Request:**
```json
{
  "name": "John Doe Updated",
  "email": "john.new@example.com",
  "role": "Admin",
  "status": "Active",
  "password": "new_password"  // Optional - only to reset password
}
```

#### DELETE `/api/users/[id]`
Delete a user (Admin only, cannot delete super admin).

## 🛡️ Security Features

### Password Security
- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ Never returned in API responses
- ✅ Minimum length validation (6 characters)
- ✅ Only admins can reset passwords

### Validation
- ✅ Email format validation
- ✅ Unique username and email checking
- ✅ Role and status validation
- ✅ Required field validation

### Access Control
- ✅ Role-based permissions
- ✅ Protected API routes
- ✅ Protected dashboard pages
- ✅ Auto-redirect for unauthenticated users

## 🎯 Usage Examples

### Creating a New User (Admin)

1. Navigate to `/dashboard/users`
2. Click "Add New User"
3. Fill in the form:
   - Full Name
   - Username (unique)
   - Email (unique, valid format)
   - Password (min 6 characters)
   - Role (select from dropdown)
   - Status (Active/Inactive)
4. Click "Create User"

The system will:
- ✅ Validate all fields
- ✅ Check for duplicate email/username
- ✅ Hash the password
- ✅ Generate avatar initials
- ✅ Create the user in the database

### Resetting a User's Password (Admin)

1. Navigate to `/dashboard/users`
2. Find the user in the table
3. Click the key icon (🔑) next to their name
4. Enter new password twice
5. Click "Reset Password"

The user will need to use this new password to log in.

### Deactivating a User (Admin)

1. Navigate to `/dashboard/users`
2. Find the user in the table
3. Click "Deactivate" button
4. User can no longer log in until reactivated

## 🔄 User Workflow

### First Time Setup
1. Login with default credentials
2. Navigate to User Management
3. Change default admin passwords
4. Create additional user accounts as needed

### Daily Use
1. Users login at `/login`
2. Redirected to `/dashboard` on success
3. Access features based on their role
4. Logout when done

### Admin Tasks
- Create new users with appropriate roles
- Reset forgotten passwords
- Deactivate users who leave
- Monitor user activity
- Manage user permissions

## 🧪 Testing

### Test Users
After initial setup, you can create test users for each role:

```javascript
// Example: Create an Editor
{
  "name": "Jane Editor",
  "username": "janeeditor",
  "email": "jane@example.com",
  "password": "test123",
  "role": "Editor",
  "status": "Active"
}

// Example: Create a Viewer
{
  "name": "Bob Viewer",
  "username": "bobviewer",
  "email": "bob@example.com",
  "password": "test123",
  "role": "Viewer",
  "status": "Active"
}
```

## 📝 Best Practices

### For Development
- ✅ Use default credentials for testing
- ✅ Test with different user roles
- ✅ Check validation messages
- ✅ Test password reset flow

### For Production
- ⚠️ Change default passwords immediately
- ⚠️ Use strong passwords (12+ characters)
- ⚠️ Implement proper session management (JWT/cookies)
- ⚠️ Add rate limiting on login endpoint
- ⚠️ Enable HTTPS
- ⚠️ Add audit logging
- ⚠️ Implement 2FA for admins
- ⚠️ Regular security audits

## 🐛 Troubleshooting

### Cannot Login
- ✅ Check that user status is "Active"
- ✅ Verify correct email and password
- ✅ Check browser console for errors
- ✅ Ensure database is initialized

### Users Table Not Found
- Run the app once to auto-create tables
- Check `data/projects.db` exists
- Verify database permissions

### Password Reset Not Working
- ✅ Ensure logged-in user is Admin or Super Admin
- ✅ Check that new password meets requirements
- ✅ Verify both password fields match

## 🔮 Future Enhancements

Potential additions for production:

- [ ] JWT-based authentication
- [ ] Refresh tokens
- [ ] Password strength meter
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Login attempt limiting
- [ ] Password reset via email
- [ ] Activity logs
- [ ] Session timeout
- [ ] Remember me functionality

## 📞 Support

For issues or questions about the authentication system, check:

1. This documentation
2. Code comments in the files
3. Console logs for debugging
4. Database schema in `DATABASE.md`

---

**Created:** December 2024  
**Version:** 1.0.0  
**Status:** Production Ready ✨

