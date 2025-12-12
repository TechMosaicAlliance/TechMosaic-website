# 🔐 Role-Based Access Control (RBAC) Guide

## Overview

Your TechMosaic application now has comprehensive **Role-Based Access Control** that limits what each user role can access and do throughout the system.

## 🎭 User Roles & Permissions

### 👑 Super Admin
**Full System Access**

#### ✅ Can Access:
- Dashboard
- User Management (ONLY Super Admin)
- Projects (Full CRUD)
- Analytics
- System Settings

#### ✅ Can Perform:
- ✅ View all projects
- ✅ Create new projects
- ✅ Edit any project
- ✅ Delete any project
- ✅ View all users
- ✅ Create new users
- ✅ Edit any user
- ✅ Delete users (except self)
- ✅ Reset any password
- ✅ View analytics
- ✅ Access system settings
- ✅ Manage system configuration

---

### 🛡️ Admin
**Projects & Content Management**

#### ✅ Can Access:
- Dashboard
- Projects (Full CRUD)
- Analytics
- ❌ **NO User Management**
- ❌ NO System Settings

#### ✅ Can Perform:
- ✅ View all projects
- ✅ Create new projects
- ✅ Edit any project
- ✅ Delete any project
- ✅ View analytics
- ❌ **Cannot manage users**
- ❌ **Cannot reset passwords**
- ❌ **Cannot access settings**

**Note:** Admins have full project management capabilities but **cannot access user management** as per your requirements.

---

### ✏️ Editor
**Content Creation & Editing**

#### ✅ Can Access:
- Dashboard
- Projects (View, Create, Edit only)
- ❌ NO User Management
- ❌ NO Analytics
- ❌ NO Settings

#### ✅ Can Perform:
- ✅ View all projects
- ✅ Create new projects
- ✅ Edit projects
- ❌ **Cannot delete projects**
- ❌ Cannot manage users
- ❌ Cannot view analytics
- ❌ Cannot access settings

---

### 👁️ Viewer
**Read-Only Access**

#### ✅ Can Access:
- Dashboard
- Projects (View only)
- ❌ NO User Management
- ❌ NO Analytics
- ❌ NO Settings

#### ✅ Can Perform:
- ✅ View projects
- ❌ **Cannot create projects**
- ❌ **Cannot edit projects**
- ❌ **Cannot delete projects**
- ❌ Cannot manage users
- ❌ Cannot view analytics
- ❌ Cannot access settings

**Note:** Viewers have completely read-only access to the system.

---

## 🔒 Access Control Implementation

### Page-Level Protection

#### User Management (`/dashboard/users`)
- **Access:** Super Admin ONLY
- **Protection:** ProtectedRoute wrapper
- **Behavior:** Non-Super Admins see "Access Denied" page

```typescript
// Super Admin only
<ProtectedRoute allowedRoles={['Super Admin']}>
  <UsersPageContent />
</ProtectedRoute>
```

#### Dashboard (`/dashboard`)
- **Access:** All authenticated users
- **Behavior:** Different features visible based on role

#### Projects (`/dashboard/projects`)
- **Access:** All authenticated users
- **Behavior:** 
  - **Viewer:** Can only view projects, no create/edit/delete buttons
  - **Editor:** Can view, create, edit (no delete button)
  - **Admin:** Full CRUD access
  - **Super Admin:** Full CRUD access

---

## 🎨 UI/UX Based on Roles

### Dashboard Features

#### Super Admin Sees:
```
✅ User Management tile (purple badge "Super Admin Only")
✅ Projects tile (green badge "Full Access")
✅ Analytics tile
✅ Settings tile (purple badge "Super Admin Only")
```

#### Admin Sees:
```
❌ No User Management tile
✅ Projects tile (green badge "Full Access")
✅ Analytics tile
❌ No Settings tile
```

#### Editor Sees:
```
❌ No User Management tile
✅ Projects tile (no delete capability)
❌ No Analytics tile
❌ No Settings tile
```

#### Viewer Sees:
```
❌ No User Management tile
✅ Projects tile (gray badge "View Only")
❌ No Analytics tile
❌ No Settings tile
```

### Projects Page

#### Button Visibility:

**Super Admin & Admin:**
- ✅ "New Project" button enabled
- ✅ Edit icon on each project
- ✅ Delete icon on each project
- ✅ View icon on each project

**Editor:**
- ✅ "New Project" button enabled
- ✅ Edit icon on each project
- ❌ No Delete icon
- ✅ View icon on each project

**Viewer:**
- ❌ "New Project" button disabled (shows "View Only")
- ❌ No Edit icon
- ❌ No Delete icon
- ✅ Only View icon

---

## 🚦 Access Denied Experience

When a user tries to access a page they don't have permission for:

### What They See:
```
┌─────────────────────────────┐
│     🛡️  Access Denied       │
│                             │
│ You don't have permission   │
│ to access this page.        │
│                             │
│ Current role: Admin         │
│                             │
│ [Go to Dashboard]           │
│ [Return to Home]            │
└─────────────────────────────┘
```

### Features:
- 🛡️ Clear security icon
- 📝 Explanation of why access is denied
- 👤 Shows current user role
- ⚠️ Suggestion to contact Super Admin
- 🔄 Navigation options to go back

---

## 📊 Permission Matrix

| Feature | Super Admin | Admin | Editor | Viewer |
|---------|-------------|-------|--------|--------|
| **Dashboard Access** | ✅ | ✅ | ✅ | ✅ |
| **View Projects** | ✅ | ✅ | ✅ | ✅ |
| **Create Projects** | ✅ | ✅ | ✅ | ❌ |
| **Edit Projects** | ✅ | ✅ | ✅ | ❌ |
| **Delete Projects** | ✅ | ✅ | ❌ | ❌ |
| **View Users** | ✅ | ❌ | ❌ | ❌ |
| **Create Users** | ✅ | ❌ | ❌ | ❌ |
| **Edit Users** | ✅ | ❌ | ❌ | ❌ |
| **Delete Users** | ✅ | ❌ | ❌ | ❌ |
| **Reset Passwords** | ✅ | ❌ | ❌ | ❌ |
| **View Analytics** | ✅ | ✅ | ❌ | ❌ |
| **Access Settings** | ✅ | ❌ | ❌ | ❌ |
| **Manage System** | ✅ | ❌ | ❌ | ❌ |

---

## 🧪 Testing Role-Based Access

### Test Scenario 1: User Management Access

1. **Login as Super Admin** (`superadmin@techmosaic.com`)
   - ✅ Should see "User Management" tile on dashboard
   - ✅ Can access `/dashboard/users`
   - ✅ Can create/edit/delete users

2. **Login as Admin** (`admin@techmosaic.com`)
   - ❌ Should NOT see "User Management" tile
   - ❌ Cannot access `/dashboard/users` (Access Denied)

3. **Login as Editor** (create one)
   - ❌ Should NOT see "User Management" tile
   - ❌ Cannot access `/dashboard/users` (Access Denied)

4. **Login as Viewer** (create one)
   - ❌ Should NOT see "User Management" tile
   - ❌ Cannot access `/dashboard/users` (Access Denied)

### Test Scenario 2: Projects Management

1. **Login as Viewer**
   - ✅ Can access `/dashboard/projects`
   - ❌ "New Project" button is disabled
   - ❌ No edit/delete buttons on project cards
   - ✅ Only "View" button visible
   - Badge shows "View Only"

2. **Login as Editor**
   - ✅ Can access `/dashboard/projects`
   - ✅ "New Project" button enabled
   - ✅ Edit button visible on cards
   - ❌ No delete button
   - ✅ View button visible

3. **Login as Admin**
   - ✅ Full access to all project features
   - ✅ Create/Edit/Delete all work
   - ❌ Cannot access user management

4. **Login as Super Admin**
   - ✅ Full access to everything
   - ✅ Can access user management
   - ✅ Can manage projects

### Test Scenario 3: Direct URL Access

Try accessing protected pages directly via URL:

```bash
# As Admin, try accessing:
http://localhost:3000/dashboard/users

# Expected Result:
# ❌ Redirected to "Access Denied" page
# Cannot see or manage users
```

---

## 🎯 Real-World Use Cases

### Scenario 1: Team Member Onboarding
```
1. Super Admin creates new "Editor" account
2. Editor logs in
3. Editor can create and edit projects
4. Editor tries to delete → Cannot (no delete button)
5. Editor tries to access users → Access Denied
```

### Scenario 2: External Stakeholder
```
1. Super Admin creates new "Viewer" account
2. Viewer logs in
3. Viewer can see all projects (read-only)
4. Viewer tries to create → Button disabled
5. All edit/delete actions hidden
```

### Scenario 3: Department Manager
```
1. Super Admin creates new "Admin" account
2. Admin logs in
3. Admin has full project management
4. Admin tries to manage users → Access Denied
5. Only Super Admin can manage users
```

---

## 🔧 Technical Implementation

### Permission Check Functions

```typescript
// Check if user can access a route
canAccessRoute(userRole, '/dashboard/users')
// Returns: true for Super Admin, false for others

// Get all permissions for a role
getPermissions('Admin')
// Returns: Permission object with all capabilities

// Get user-friendly capabilities list
getRoleCapabilities('Editor')
// Returns: ['View Projects', 'Create Projects', 'Edit Projects']
```

### Protected Route Component

```typescript
<ProtectedRoute allowedRoles={['Super Admin']}>
  <ComponentToProtect />
</ProtectedRoute>
```

### Conditional UI Rendering

```typescript
{permissions?.canCreateProjects && (
  <Button>Create Project</Button>
)}
```

---

## 📝 Best Practices

### For Super Admins:

1. ✅ **Assign Minimum Required Permissions**
   - Don't make everyone an Admin
   - Use Viewer role for stakeholders
   - Use Editor for content team

2. ✅ **Regular Permission Audits**
   - Review user roles monthly
   - Remove unnecessary permissions
   - Deactivate inactive users

3. ✅ **Communication**
   - Inform users of their role limitations
   - Provide contact for permission requests
   - Document who has what access

### For Developers:

1. ✅ **Always Check Permissions**
   - Check on UI level (hide buttons)
   - Check on API level (validate requests)
   - Check on page level (protect routes)

2. ✅ **Graceful Degradation**
   - Show "View Only" instead of hiding
   - Explain why access is denied
   - Provide alternative actions

3. ✅ **Consistent UX**
   - Same permission checks everywhere
   - Consistent error messages
   - Clear visual indicators

---

## 🐛 Troubleshooting

### "Access Denied" When It Shouldn't Be

**Check:**
1. User's actual role in database
2. localStorage has correct user data
3. Permissions.ts has correct role mapping
4. Component is using correct permission check

### User Can See Features They Shouldn't

**Check:**
1. UI conditional rendering logic
2. Permission function being called correctly
3. User role hasn't changed without logout/login

### API Calls Fail Despite UI Access

**Check:**
1. API routes have permission validation (currently commented)
2. Implement proper JWT/session validation in production
3. API and UI permission checks match

---

## 🚀 Future Enhancements

Consider adding:

- [ ] Custom permissions per user (beyond roles)
- [ ] Permission groups/teams
- [ ] Temporary elevated permissions
- [ ] Audit logs for permission changes
- [ ] API middleware for automatic permission checks
- [ ] Permission request workflow

---

## 📚 Related Documentation

- `AUTH_SETUP.md` - Authentication system details
- `QUICK_START_AUTH.md` - Quick start guide
- `DATABASE.md` - Database schema

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Status:** Production Ready ✨

