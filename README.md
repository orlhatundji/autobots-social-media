# Autobots Social Media

This project is a NestJS application designed to manage and interact with Autobots.
The application provides APIs for creating Autobots, managing their posts, 
and retrieving comments associated with these posts. 
It uses Prisma for database interactions and Swagger for API documentation.

## Table of Contents

- [Frameworks](#frameworks)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Frameworks
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

To get started with the Autobots Social Media Project, clone the repository and install the dependencies:

## Installation

To get started with the Autobots Social Media Project, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/autobots-social-media.git
cd autobots-social-media

```bash
$ yarn install
```

## Environment Variables:
Create a .env file in the root directory and add the following environment variables:
DATABASE_URL=

## Prisma
Run Prisma migrations to set up your database schema:

# Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API Documentation
The project uses Swagger to generate API documentation. 
Once the application is running, you can access the documentation at:
```http://localhost:3000/api```

## Project Structure
```
  ├── prisma/
  │   └── migrations      # Prisma client setup and configuration
  │   └── schema.prisma   # Schema definitions file
  src/
  ├── autobot/
  │   ├── autobot.controller.ts  # Controller for handling HTTP requests
  │   ├── autobot.module.ts      
  │   ├── autobot.service.ts     
  ├── autobot-scheduler/
  │   ├── autobot-scheduler.service.ts  # Scheduler for handling creation of bots every hour
  ├── main.ts                 # Entry point of the application
  ├── prisma.service.ts       # Prisma client setup and configuration
  └── app.controller.ts              
  └── app.module.ts           # Root module of the application 
  └── app.service.ts             
```
Nest is [MIT licensed](LICENSE).
