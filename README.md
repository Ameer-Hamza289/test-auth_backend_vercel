# Authentication Backend API

A complete authentication backend built with Node.js, Express, and JWT that can be deployed to Vercel.

## Features

- 🔐 **User Registration & Login** - Secure user authentication
- 🛡️ **JWT Token Authentication** - Stateless authentication with JSON Web Tokens
- 🔒 **Password Hashing** - Secure password storage with bcrypt
- 👤 **User Profile Management** - Get and update user profiles
- 🚦 **Rate Limiting** - Protection against brute force attacks
- 🛡️ **Security Headers** - Helmet.js for security best practices
- 🌐 **CORS Support** - Cross-origin resource sharing configuration
- 📝 **Input Validation** - Comprehensive request validation
- 🗄️ **File-based Database** - Simple JSON file storage (easily replaceable)

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api` | API documentation |
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |

### Protected Endpoints (Require Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update user profile |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/verify` | Verify token validity |

## Quick Start

### Local Development

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env and set your JWT_SECRET
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   ```bash
   curl http://localhost:3000/api/health
   ```

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel:**
   ```bash
   vercel env add JWT_SECRET
   # Enter a strong secret key when prompted
   ```

4. **Your API will be available at:** `https://your-project.vercel.app/api`

## Usage Examples

### 1. Register a new user

```bash
curl -X POST https://your-api.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "1234567890",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login

```bash
curl -X POST https://your-api.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

### 3. Get user profile (protected)

```bash
curl -X GET https://your-api.vercel.app/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Update user profile (protected)

```bash
curl -X PUT https://your-api.vercel.app/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Jane Doe"
  }'
```

## Authentication

For protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

The token is returned when you register or login successfully.

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created (registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (invalid/expired token)
- `404` - Not Found
- `409` - Conflict (user already exists)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## Security Features

- **Password Hashing**: Uses bcrypt with salt rounds of 12
- **JWT Tokens**: Expire in 24 hours
- **Rate Limiting**: 5 auth attempts per 15 minutes, 100 general requests per 15 minutes
- **Input Validation**: Email format, password length, name requirements
- **Security Headers**: Helmet.js for various security headers
- **CORS**: Configurable cross-origin resource sharing

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT signing (REQUIRED) | - |
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 3000 |

### Vercel Environment Variables

Set these in your Vercel dashboard or via CLI:

```bash
vercel env add JWT_SECRET
vercel env add NODE_ENV production
```

## Database

Currently uses a simple JSON file for data storage (`data/users.json`). For production, consider upgrading to:

- **MongoDB** with Mongoose
- **PostgreSQL** with Prisma
- **Supabase** for serverless PostgreSQL
- **PlanetScale** for serverless MySQL

## Customization

### Adding New Endpoints

1. Create new route files in `api/routes/`
2. Import and use in `api/index.js`
3. Follow the existing pattern for error handling and responses

### Database Migration

Replace the file-based database by:

1. Installing your preferred database client
2. Updating `api/utils/database.js`
3. Keeping the same function signatures for compatibility

### Frontend Integration

This API works with any frontend framework. Example with JavaScript:

```javascript
// Register
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, name })
});

const data = await response.json();
if (data.success) {
  localStorage.setItem('token', data.data.token);
}

// Make authenticated requests
const profileResponse = await fetch('/api/auth/profile', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues and questions:
1. Check the API documentation at `/api`
2. Review error messages in responses
3. Check server logs for debugging
4. Ensure environment variables are set correctly

---

**🚀 Your authentication API is ready to deploy to Vercel!**
