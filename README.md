# Minerva's Campus Event Management System

A comprehensive web-based platform for managing campus events, workshops, seminars, and club activities.

## Overview

Minerva's Campus Event Management System is designed to streamline the process of organizing, managing, and participating in campus events. The platform enables students, staff, and event organizers to easily register for, track, and plan various campus activities.

## Features

- **User Authentication**
  - Registration and Login functionality
  - Profile management
  - Role-based access control

- **Event Management**
  - Create and manage events
  - View upcoming events
  - RSVP functionality
  - Real-time seat availability tracking

- **Calendar Integration**
  - Interactive calendar view
  - Event filtering by type
  - Date-based navigation

- **Services Offered**
  - Workshops
  - Seminars
  - Club Activities
  - Cultural Events

## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Modern UI/UX design with responsive layouts

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Alex7Ant/campus-event-management-system
```

2. Install dependencies:
```bash
cd campus-event-management-system
npm install
```

3. Set up environment variables:
Create a `.env` file in the Backend directory with the following variables:
```env
PORT=5502
DATABASE_URL=your_database_url
```

4. Start the server:
```bash
npm run dev
```

## Database Configuration

The system uses PostgreSQL as its database. Connection details can be found in:
```javascript:Backend/index.js
startLine: 11
endLine: 17
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Events
- GET `/api/events` - Fetch all events
- POST `/api/rsvp` - Create event RSVP
- POST `/api/events` - Create new event

## Security

- Password hashing using bcrypt
- JWT-based authentication
- Protected API endpoints
- Environment variable protection

## Deployment

### Live Environments
- Production: [https://campus-event-management-chi.vercel.app](https://campus-event-management-chi.vercel.app)
- Staging: [https://campus-event-management-chi.vercel.app](https://campus-event-management-chi.vercel.app)

### Deployment Instructions

1. Configure deployment environment:
```bash
npm run build
```

2. Deploy to Heroku:
```bash
heroku login
git push heroku main
```

3. Verify deployment:
```bash
heroku open
```

For detailed deployment instructions, please refer to our [Deployment Guide](docs/deployment.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License

## Authors

- Alex (Project Lead)

## Version

Current Version: 1.0.3

## Acknowledgments

- Node.js community
- Express.js framework
- PostgreSQL database
