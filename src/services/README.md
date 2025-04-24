# Services Architecture

This document outlines the service architecture for the Kola Insurance application.

## Authentication and API Services

### Primary Services:

- **authService.js** - Main authentication service with consolidated functionality:

  - Authentication functions (login, logout, password change)
  - Token management
  - API client with interceptors for authentication
  - User profile management

- **userService.js** - User-related functionality:
  - User profile management
  - User listing (admin)
  - Profile updates

### Deprecated Services:

The following services are maintained for backward compatibility but will be removed in the future:

- **api.js** - Deprecated API client. Use the `apiClient` from `authService.js` instead.
- **apiClient.js** - Deprecated API client. Use the `apiClient` from `authService.js` instead.
- **authUtils.js** - Deprecated auth utilities. Functions are now in `authService.js`.

## How to Use the Consolidated Authentication System

### Making API Calls

```javascript
import { apiClient } from "./services/authService";

// Make API calls
const getMyData = async () => {
  const response = await apiClient.get("/endpoint");
  return response.data;
};
```

### Authentication Operations

```javascript
import authService from "./services/authService";

// Check if user is authenticated
const isLoggedIn = authService.isAuthenticated();

// Get current user
const currentUser = authService.getCurrentAdmin();

// Login
await authService.loginAdmin({ email, password });

// Logout
authService.logoutAdmin();
```

### Using the Auth Context

```javascript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { user, login, logout, loading, error } = useAuth();

  // Component implementation using auth state
}
```

## Standardization Guidelines

1. Always use the `apiClient` from `authService.js` for new API calls
2. Prefer context-based authentication over direct service calls in components
3. Use the token storage keys from `authService.js` for consistency
4. Follow the error handling pattern from `authService.js` for all API calls

## Authentication Flow

1. User credentials are sent to the API
2. Token is received and stored in localStorage
3. Token is attached to all subsequent API requests
4. On expiration or logout, token is cleared
5. Unauthorized requests redirect to login page
