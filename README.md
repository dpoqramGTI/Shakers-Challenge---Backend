# Shakers Challenge - Backend - Technical Test

**Author:** Daniel Poquet Ramirez

---

## Overview

This repository contains the backend implementation for the Shakers technical test, built with [NestJS](https://nestjs.com/) and PostgreSQL as the database. It exposes RESTful APIs to manage projects, organizations, positions, and related entities.

---

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn
- PostgreSQL (version 12 or higher recommended)
- A PostgreSQL database instance running locally or remotely

---

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
PORT=3001
```

## Installation

```bash
npm install
# or
yarn install
```

## Database Setup

```bash
createdb your_db_name
```

## Seeding the Database

To populate the database with initial data for testing or development, run the seed script:

```bash
npm run seed
# or
yarn seed
```

This will execute the seed file located at src/seeds/seed.ts.

## Running the Application

### Development Mode ( Starts the app with hot reload )

```bash
npm run start:dev
# or
yarn start:dev
```
### Production Mode ( Build and start the app )

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Testing the API

By default, the server listens on port 3001.

You can test the API endpoints (e.g., /projects) with tools like Postman or curl.

## Additional Notes

- The app uses TypeORM as ORM to interact with PostgreSQL.

- Migrations and seed data scripts can be added if needed.

- Error handling and validation are implemented via NestJS pipes and exception filters.

- Relations between entities such as Projects, Organizations, Categories, etc., are fully managed.

- Logs provide query debugging to assist development.

