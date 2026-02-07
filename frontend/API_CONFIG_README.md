# API Configuration Guide

## Overview
The frontend now uses a centralized `config.js` file to manage API endpoints instead of hardcoding `localhost:5000` everywhere.

## How It Works

### Automatic Detection
If no API_BASE is set, the application will:
- **Local Development**: Use `http://localhost:5000`
- **Production**: Use `https://{current-domain}`

### Setting Custom API Base

#### Option 1: Window Object (Before app loads)
```html
<script>
  window.API_BASE = 'https://api.yourdomain.com';
</script>
<script src="/frontend/config.js"></script>
```

#### Option 2: Environment Variable
```bash
API_BASE=https://api.yourdomain.com npm start
```

#### Option 3: Direct config.js Edit
Edit `/frontend/config.js` and change:
```javascript
return process.env.API_BASE || 'http://localhost:5000';
```

## Usage in Code

### Before (Hardcoded)
```javascript
fetch('http://localhost:5000/api/auth/me', {...})
```

### After (Configurable)
```javascript
fetch(window.API_BASE + '/api/auth/me', {...})
```

## Environment Variables

The config.js supports these environment variables:
- `API_BASE` - Explicit API base URL
- `REACT_APP_API_BASE` - React-compatible API base URL

## Files Updated
- ✅ `/frontend/config.js` - Configuration manager
- ✅ `/frontend/dashboard.html` - All 8 API calls updated
- ✅ `/frontend/signin.html` - Login endpoint updated
- ✅ `/frontend/signup.html` - Register endpoint updated
- ✅ `/frontend/reset-password.html` - Password reset endpoint updated

## Example Deployments

### Localhost Development
```
window.API_BASE = 'http://localhost:5000'
```

### Production (Same Domain)
```
window.API_BASE = 'https://yourdomain.com'
```

### Production (Different Domain)
```
window.API_BASE = 'https://api.yourdomain.com'
```

## Verification
Check browser console - it will log:
```
API Base URL: https://api.yourdomain.com
```
