# MyContact Server

A RESTful API server for managing contacts with user authentication, built with Node.js, Express, and Prisma.

## Features

- User authentication with JWT
- Contact management
- Contact tag organization
- RESTful API architecture
- PostgreSQL database with Prisma ORM
- Docker support

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Docker
- JWT for authentication
- Cookie Parser

## API Endpoints

The server exposes the following API endpoints:

### Authentication

- `/api/v1/auth` - Authentication routes

### Users

- `/api/v1/user` - User management routes

### Contacts

- `/api/v1/contact` - Contact management routes

### Contact Tags

- `/api/v1/contactTag` - Contact tag management routes

## Prerequisites

- Node.js (v20.12.0 or higher)
- PostgreSQL
- Docker (optional)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/myContact?sslmode=require"
PORT=8000
JWT_SECRET="your-jwt-secret"
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/myContact-server.git
cd myContact-server
```

2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Start the server:

```bash
npm run start
```

## Docker Setup

The project includes Docker support. To run using Docker:

1. Build the Docker image:

```bash
docker build -t mycontact-server .
```

2. Run the container:

```bash
docker run -p 8000:8000 -d mycontact-server
```

## Project Structure

```
myContact-server/
├── src/
│   ├── handlers/
│   │   ├── authHandler.js
│   │   ├── contactHandler.js
│   │   └── contactTagHandler.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── typeValid.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   ├── contactRouter.js
│   │   ├── contactTagRouter.js
│   │   └── userRouter.js
│   └── index.js
├── prisma/
├── Dockerfile
├── package.json
└── .env
```

## License

[MIT License](LICENSE)
