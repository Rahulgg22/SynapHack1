# Organizer Feature Implementation

## Overview
This implementation allows any authenticated user to create hackathon events and automatically become an organizer with access to the organizer dashboard.

## Key Features

### 1. Event Creation for All Users
- Any authenticated user can create a hackathon event
- Users automatically become organizers of their created events
- No special permissions required to create events

### 2. Automatic Role Assignment
- When a user creates an event, they are automatically assigned the "organizer" role for that event
- The system uses a `UserEventRoles` table to track user roles per event
- Users can be organizers for multiple events

### 3. Organizer Dashboard Access
- Users who are organizers for any event can access the organizer dashboard
- Dashboard shows events created by the user
- Real-time data from the database

## Technical Implementation

### Backend Changes

#### 1. Database Schema
- Uses existing `UserEventRoles` table to track organizer roles
- `Events` table stores event information with `created_by` field
- Transaction-based event creation ensures data consistency

#### 2. New API Endpoints
- `POST /api/azure-events/create-as-organizer` - Create event and become organizer
- `GET /api/azure-events/my-organized` - Get events organized by user
- `GET /api/azure-events/organizer-status` - Check if user is an organizer
- `GET /api/organizer/dashboard` - Access organizer dashboard

#### 3. Middleware Updates
- Updated auth middleware to check organizer status
- New `role.isOrganizer` middleware for organizer-only routes
- Dynamic role assignment based on event ownership

### Frontend Changes

#### 1. New Components
- `CreateEvent.jsx` - Form for creating new events
- Updated `OrganizerDashboard.jsx` - Real-time data display
- Updated `Navbar.jsx` - Added "Create Event" link

#### 2. API Integration
- New API functions in `api.js` for event creation and organizer status
- Real-time dashboard data fetching
- Error handling and loading states

#### 3. User Experience
- Landing page updated with feature explanation
- Seamless navigation between event creation and dashboard
- Clear feedback when events are created successfully

## Usage Flow

1. **User Registration/Login**: User creates account or logs in
2. **Create Event**: User clicks "Create Event" in navbar or landing page
3. **Fill Event Details**: User completes the event creation form
4. **Automatic Role Assignment**: System creates event and assigns organizer role
5. **Dashboard Access**: User is redirected to organizer dashboard
6. **Event Management**: User can manage their events, participants, judges, etc.

## Security Considerations

- Only authenticated users can create events
- Users can only access organizer dashboard if they are organizers for at least one event
- Event creation uses database transactions to ensure data integrity
- Role-based access control for organizer-specific features

## Database Tables Used

- `Users` - User information
- `Events` - Event details with `created_by` field
- `UserEventRoles` - Links users to events with specific roles
- `Teams` - Team information for events
- `Scores` - Judging scores and feedback

## Future Enhancements

- Event editing capabilities
- Advanced analytics for organizers
- Judge assignment interface
- Participant management tools
- Announcement system
- Real-time notifications

