# Course Management Platform Backend

This is the backend for the Course Management Platform, built with NestJS and Prisma.

## Features

- RESTful API for managing students, courses, and assignments
- PostgreSQL database with Prisma ORM
- Swagger API documentation
- Validation and error handling

## Database Schema

- **Student**: Represents a student with name and email
- **Course**: Represents a course with title and description
- **Assignment**: Represents an assignment for a course with title, description, due date, and completion status
- **StudentCourse**: Join table for the many-to-many relationship between students and courses

## API Endpoints

### Students

- `POST /students` - Create a new student
- `GET /students` - Get all students
- `GET /students/:id` - Get a student by ID

### Courses

- `POST /courses` - Create a new course
- `GET /courses` - Get all courses with optional filters
- `GET /courses/:id` - Get a course by ID with its assignments and students
- `POST /courses/:courseId/students` - Assign students to a course

### Assignments

- `GET /assignments` - Get all assignments
- `GET /assignments/:id` - Get an assignment by ID
- `POST /courses/:courseId/assignments` - Create a new assignment for a course
- `PATCH /assignments/:id` - Update an assignment (e.g., mark as completed)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Set up your environment variables in `.env` file:
   \`\`\`
   DATABASE_URL="postgresql://username:password@localhost:5432/course_management?schema=public"
   \`\`\`
4. Run database migrations:
   \`\`\`bash
   npm run prisma:migrate
   \`\`\`
5. Generate Prisma client:
   \`\`\`bash
   npm run prisma:generate
   \`\`\`
6. Start the development server:
   \`\`\`bash
   npm run start:dev
   \`\`\`

### API Documentation

Once the server is running, you can access the Swagger API documentation at:
\`\`\`
http://localhost:3000/api
\`\`\`

## Implementation Details

### Database Schema

The Prisma schema defines the following models:

1. **Student**: Represents a student with name and email
2. **Course**: Represents a course with title and description
3. **Assignment**: Represents an assignment for a course with title, description, due date, and completion status
4. **StudentCourse**: Join table for the many-to-many relationship between students and courses

### API Structure

The API is organized into three main modules:

1. **Students Module**: Handles student-related operations
2. **Courses Module**: Handles course-related operations, including assigning students to courses
3. **Assignments Module**: Handles assignment-related operations

Each module follows the NestJS architecture with controllers, services, and DTOs.

## Error Handling

The API implements comprehensive error handling:

- Validation errors for invalid input data
- Not found errors for non-existent resources
- Bad request errors for invalid operations

## Data Validation

Input validation is implemented using class-validator decorators in the DTOs:

- Required fields are validated with `@IsNotEmpty()`
- String fields are validated with `@IsString()`
- Email fields are validated with `@IsEmail()`
- Date fields are validated with `@IsDateString()`
- Boolean fields are validated with `@IsBoolean()`

## Testing

Run tests with:
\`\`\`bash
npm test
\`\`\`

Run end-to-end tests with:
\`\`\`bash
npm run test:e2e
\`\`\`





