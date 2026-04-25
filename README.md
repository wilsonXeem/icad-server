# ICAD Backend Server

Backend REST API for **ICAD — Innovation Centre for Computer-Aided Discovery Ltd.**

This server is designed to support:

- public website forms
- JWT-based user authentication
- academy course delivery
- protected dashboard access
- subscriber activity submissions
- research service and quote workflows
- future admin tooling and platform expansion

## Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- cookie-parser
- cors
- dotenv
- express-validator
- multer
- helmet
- morgan
- express-rate-limit

## Project Structure

```text
server/
  .env.example
  .gitignore
  package.json
  README.md
  src/
    app.js
    server.js
    config/
      db.js
    controllers/
      activitySubmission.controller.js
      auth.controller.js
      contact.controller.js
      course.controller.js
      courseModule.controller.js
      dashboard.controller.js
      enrollment.controller.js
      serviceRequest.controller.js
    middlewares/
      auth.middleware.js
      error.middleware.js
      upload.middleware.js
      validation.middleware.js
    models/
      ActivitySubmission.js
      ContactInquiry.js
      Course.js
      CourseModule.js
      Enrollment.js
      ServiceRequest.js
      User.js
    routes/
      activitySubmission.routes.js
      auth.routes.js
      contact.routes.js
      course.routes.js
      dashboard.routes.js
      enrollment.routes.js
      index.js
      module.routes.js
      serviceRequest.routes.js
    services/
      auth.service.js
      dashboard.service.js
    utils/
      apiError.js
      apiResponse.js
      asyncHandler.js
      pagination.js
      token.js
    validators/
      activitySubmission.validator.js
      auth.validator.js
      common.validator.js
      contact.validator.js
      course.validator.js
      enrollment.validator.js
      serviceRequest.validator.js
    modules/
      README.md
      auth/
      users/
      contact/
      serviceRequests/
      courses/
      enrollments/
      dashboard/
      activityPortal/
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string and JWT secrets.

4. Run the server in development:

```bash
npm run dev
```

5. Run in production mode:

```bash
npm start
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/icad
JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
JWT_REFRESH_SECRET=replace_with_a_secure_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d
```

## API Base URL

```text
/api/v1
```

Health check:

```text
GET /api/v1/health
```

## Authentication

- JWT is issued on register and login.
- The token is stored in an `httpOnly` cookie named `icad_token`.
- Cookies are `secure` in production.
- The API also accepts `Authorization: Bearer <token>` for clients that prefer header-based auth.

## Response Format

Success response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "A valid email is required"
    }
  ]
}
```

## Route Summary

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

### Contact

- `POST /contact`
- `GET /contact`
- `GET /contact/:id`
- `PATCH /contact/:id/status`

### Service Requests

- `POST /service-requests`
- `GET /service-requests`
- `GET /service-requests/:id`
- `PATCH /service-requests/:id`

### Courses and Modules

- `GET /courses`
- `GET /courses/:slug`
- `POST /courses`
- `PATCH /courses/:id`
- `DELETE /courses/:id`
- `GET /courses/:courseId/modules`
- `POST /courses/:courseId/modules`
- `PATCH /modules/:id`
- `DELETE /modules/:id`

### Enrollments

- `POST /enrollments`
- `GET /enrollments/me`
- `GET /enrollments`
- `PATCH /enrollments/:id/progress`

### Dashboard

- `GET /dashboard/me`

### Activity Portal

- `POST /activity-submissions`
- `GET /activity-submissions/me`
- `GET /activity-submissions`
- `GET /activity-submissions/:id`
- `PATCH /activity-submissions/:id/feedback`
- `PATCH /activity-submissions/:id/status`

## Authorization Rules

- Public users can submit contact inquiries and service requests.
- Authenticated users can enroll, view their enrollments, access their dashboard, and submit activity work.
- Admins can manage inquiries, service requests, and all enrollments.
- Admins and instructors can manage courses, modules, and activity submission review workflows.

## Development Notes

- All routes use centralized error handling.
- Request validation is handled with `express-validator`.
- Passwords are hashed with `bcryptjs`.
- Duplicate enrollments are blocked with a compound unique index.
- `multer` is configured with in-memory storage for future upload workflows.
- Pagination metadata is included on list endpoints.

## Future Expansion

This structure is ready for:

- academy content expansion
- publication and research management
- subscriber portals
- admin dashboards
- file storage integration
- refresh token workflows
- future AI assistant integration

Payment flows and the AI assistant are intentionally not implemented yet.
# icad-server
