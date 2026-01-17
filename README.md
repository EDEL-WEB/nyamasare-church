# SDA Church Portal

A comprehensive church management system built with React, Flask, and PostgreSQL featuring role-based authentication and member management.

## Features

- **Role-based Authentication**: Admin, Leader, Member roles with JWT tokens
- **Member Management**: User registration and profile management (Admin only)
- **Announcements**: Create and view church announcements
- **Events**: Schedule and manage church events
- **Departments**: Organize members into departments
- **Sermons**: Archive sermons with audio/video links
- **Clean Dashboard UI**: Responsive design with role-based navigation

## Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Flask, SQLAlchemy, JWT Extended
- **Database**: PostgreSQL
- **Authentication**: JWT with role-based access control

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+

### Database Setup
1. Install PostgreSQL and create database:
```bash
createdb sda_church
```

2. Update `.env` file with your database credentials:
```
DATABASE_URL=postgresql://username:password@localhost:5432/sda_church
JWT_SECRET_KEY=your-secret-key-change-in-production
```

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r ../requirements.txt
```

4. Run the Flask application:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Default Login Credentials

- **Admin**: admin@church.com / admin123

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - Register new user (Admin/Leader only)

### Resources
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (Admin/Leader only)
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (Admin/Leader only)
- `GET /api/sermons` - Get all sermons
- `POST /api/sermons` - Create sermon (Admin/Leader only)
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department (Admin only)
- `GET /api/members` - Get all members (Admin only)

## Role Permissions

### Admin
- Full access to all features
- Manage members and departments
- Create announcements, events, sermons

### Leader
- Create announcements, events, sermons
- Register new members
- View all content

### Member
- View announcements, events, sermons, departments
- Read-only access

## Project Structure

```
sda-church-portal/
├── backend/
│   ├── app.py          # Flask application
│   ├── config.py       # Configuration
│   ├── models.py       # Database models
│   ├── auth.py         # Authentication routes
│   └── routes.py       # API routes
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/ # Reusable components
│       ├── pages/      # Page components
│       ├── context/    # React context
│       └── services/   # API services
├── database/
│   └── init.sql        # Database initialization
├── requirements.txt    # Python dependencies
└── .env               # Environment variables
```

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- SQL injection prevention with SQLAlchemy ORM

## Development

To extend the application:

1. Add new models in `backend/models.py`
2. Create API routes in `backend/routes.py`
3. Add frontend components in `frontend/src/components/`
4. Update the dashboard to include new features

## Production Deployment

1. Set strong JWT secret key in production
2. Use production PostgreSQL database
3. Build React app: `npm run build`
4. Serve with production WSGI server (Gunicorn)
5. Use reverse proxy (Nginx) for static files