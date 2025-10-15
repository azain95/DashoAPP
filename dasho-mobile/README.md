# Dasho Mobile

A modern React Native mobile application for employee leave and permission management.

## Features

- 🔐 **Authentication** - Secure login with token-based auth
- 🏠 **Dashboard** - Overview of requests, tasks, and stats
- 📋 **Requests Management** - Create and track permission and leave requests
- ✅ **Tasks** - Task management and assignments
- 🔔 **Activity Feed** - Notifications and announcements
- 👤 **Profile** - User profile and settings
- 🎨 **Dark Mode** - Toggle between light and dark themes
- 📱 **Cross-platform** - Works on iOS and Android

## Tech Stack

- **React Native 0.73**
- **React Navigation 6** - Navigation
- **React Native Paper 5** - Material Design UI components
- **AsyncStorage** - Local storage
- **Axios** - API integration
- **React Native Reanimated** - Smooth animations
- **date-fns** - Date manipulation

## Project Structure

```
dasho-mobile/
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/         # App screens
│   ├── navigation/      # Navigation setup
│   ├── context/         # React Context (Auth, Theme)
│   ├── utils/           # Helpers, API, storage
│   ├── theme/           # Colors, spacing, themes
│   └── App.js           # Root component
├── android/             # Android native code
├── ios/                 # iOS native code
└── package.json         # Dependencies
```

## Setup Instructions

### Prerequisites

- Node.js >= 18
- npm or yarn
- React Native development environment setup
  - For iOS: Xcode, CocoaPods
  - For Android: Android Studio, JDK

### Installation

1. Install dependencies:
```bash
cd dasho-mobile
yarn install
```

2. For iOS, install pods:
```bash
cd ios
pod install
cd ..
```

3. Configure API endpoint in `.env`:
```
API_BASE_URL=http://localhost:5000  # For local development
# API_BASE_URL=https://api.dashoprojects.com  # For production
```

### Running the App

**iOS:**
```bash
yarn ios
```

**Android:**
```bash
yarn android
```

**Start Metro Bundler:**
```bash
yarn start
```

## Environment Configuration

The app uses `.env` file for configuration:

- `API_BASE_URL` - Backend API URL

### Development
Use `http://localhost:5000` or your local backend URL

### Production
Switch to your Digital Ocean droplet URL:
```
API_BASE_URL=https://api.dashoprojects.com
```

## Navigation Structure

### Bottom Tabs (Main)
1. **Home** - Dashboard with quick actions
2. **Requests** - Permission and Leave history
3. **Tasks** - Task management
4. **Activity** - Notifications and announcements
5. **Profile** - User profile and settings

### Stack Screens
- New Permission
- New Leave
- Login/Signup (when not authenticated)

## API Integration

The app communicates with the backend API using Axios:

- Base URL: Configured via `.env`
- Authentication: Bearer token stored in AsyncStorage
- Auto-logout on 401 responses

### Endpoints Used:
- `POST /signin` - User login
- `POST /signup` - User registration
- `GET /requests` - Fetch requests
- `POST /requests` - Create new request
- More endpoints to be added...

## Future Features

- [ ] Push notifications
- [ ] Biometric authentication
- [ ] Offline mode
- [ ] File attachments
- [ ] Team management
- [ ] Advanced analytics
- [ ] Break system
- [ ] Circular management

## Version

**1.0.0** - Initial Release

## License

Private - Dasho Project
