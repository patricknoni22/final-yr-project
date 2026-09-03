# SmartMeet

Mobile appointment booking for students and lecturers. Students can find lecturers and book consultations; lecturers can manage requests, schedules, availability, and notifications.

## Stack

- Frontend: Expo / React Native
- Backend: Node.js / Express
- Database: MongoDB with Prisma

## Setup

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

Create `backend/.env` from `backend/.env.example` and provide the database, JWT, and email settings.

### Frontend

```bash
cd frontend
npm install
npm start
```

Create `frontend/.env` with:

```env
EXPO_PUBLIC_API_BASE_URL=http://YOUR_LOCAL_IP:3000/api
```

Use your computer's local IP when testing on a physical phone. Push notifications require a physical device and ab.

## Main Features

- Student and lecturer authentication
- Lecturer search and availability
- Appointment booking and management
- In-app and push notifications
- Appointment reminders
- Student and lecturer dashboards
