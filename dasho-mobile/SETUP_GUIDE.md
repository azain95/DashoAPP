# Dasho Mobile - Setup & Development Guide

## 🎯 Project Overview

Dasho Mobile is a modern React Native application for employee management, featuring:

✅ **Completed Features:**
- User Authentication (Login)
- Home Dashboard with stats and quick actions
- Permission Request Management (Create & History)
- Leave Request Management (Create & History)
- Tasks Screen (placeholder)
- Activity Feed (Notifications & Announcements placeholders)
- Profile Screen with dark mode toggle
- Beautiful Material Design 3 UI
- Bottom tab navigation with 5 main sections
- Full dark/light theme support

📱 **Navigation Structure:**
```
Bottom Tabs:
├── Home (Dashboard + Quick Actions)
├── Requests (Permissions & Leaves with FAB buttons)
├── Tasks (Ready for implementation)
├── Activity (Notifications & Announcements)
└── Profile (User info + Settings)
```

## 🛠 Development Setup

### 1. Environment Prerequisites

**Required:**
- Node.js >= 18
- Yarn package manager
- React Native CLI

**For iOS Development:**
- macOS
- Xcode 14+
- CocoaPods (`sudo gem install cocoapods`)

**For Android Development:**
- JDK 11 or 17
- Android Studio
- Android SDK (API 34)
- Android Emulator or physical device

### 2. Installation Steps

```bash
# Navigate to project
cd /app/dasho-mobile

# Install dependencies (already done)
yarn install

# For iOS - Install CocoaPods
cd ios
pod install
cd ..
```

### 3. Configure Backend API

Edit `.env` file:

```env
# Local Development
API_BASE_URL=http://localhost:5000

# Production (Digital Ocean)
# API_BASE_URL=https://api.dashoprojects.com
```

**Important for Android Emulator:**
If using Android emulator with localhost backend, use:
```env
API_BASE_URL=http://10.0.2.2:5000
```

### 4. Running the Application

**Start Metro Bundler:**
```bash
yarn start
```

**Run on iOS:**
```bash
yarn ios
# Or specific simulator:
yarn ios --simulator="iPhone 15 Pro"
```

**Run on Android:**
```bash
yarn android
# Make sure emulator is running or device is connected
```

## 📁 Project Structure

```
dasho-mobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Card.js
│   │   ├── GradientButton.js
│   │   ├── Header.js
│   │   ├── EmptyState.js
│   │   └── LoadingScreen.js
│   │
│   ├── screens/             # Main app screens
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── RequestsScreen.js
│   │   ├── TasksScreen.js
│   │   ├── ActivityScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── NewPermissionScreen.js
│   │   ├── NewLeaveScreen.js
│   │   └── tabs/           # Tab components
│   │       ├── PermissionHistoryTab.js
│   │       ├── LeaveHistoryTab.js
│   │       ├── NotificationsTab.js
│   │       └── AnnouncementsTab.js
│   │
│   ├── navigation/          # Navigation setup
│   │   ├── RootNavigator.js
│   │   ├── AppNavigator.js
│   │   └── AuthNavigator.js
│   │
│   ├── context/            # React Context
│   │   ├── AuthContext.js  # Authentication state
│   │   └── ThemeContext.js # Theme management
│   │
│   ├── utils/              # Utilities
│   │   ├── api.js          # Axios instance
│   │   ├── storage.js      # AsyncStorage wrapper
│   │   └── helpers.js      # Helper functions
│   │
│   ├── theme/              # Design system
│   │   ├── colors.js       # Color palettes
│   │   ├── theme.js        # Paper theme config
│   │   └── spacing.js      # Spacing & elevation
│   │
│   └── App.js              # Root component
│
├── android/                # Android native code
├── ios/                    # iOS native code
├── .env                    # Environment variables
├── package.json            # Dependencies
└── README.md              # Documentation
```

## 🎨 Design System

### Colors (Light Mode)
- Primary: `#007AFF` (iOS Blue)
- Secondary: `#5856D6` (Purple)
- Background: `#F2F2F7`
- Surface: `#FFFFFF`
- Success: `#34C759`
- Error: `#FF3B30`
- Warning: `#FF9500`

### Colors (Dark Mode)
- Primary: `#0A84FF`
- Secondary: `#5E5CE6`
- Background: `#000000`
- Surface: `#1C1C1E`
- Success: `#32D74B`
- Error: `#FF453A`
- Warning: `#FF9F0A`

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

## 🔌 API Integration

### Authentication
```javascript
// Login
POST /signin
Body: { user_id: string, password: string }
Response: { token: string, user: object }

// Stored in AsyncStorage:
// - @dasho_token
// - @dasho_user
```

### Requests
```javascript
// Get requests (with type filter)
GET /requests?type=permission  // or 'leave'
Response: Array of requests

// Create request
POST /requests
Body: {
  req_datetime: ISO string,
  req_type: 'permission' | 'swap' | 'annual' | 'sick' | 'emergency',
  date_from: 'YYYY-MM-DD',
  date_to: 'YYYY-MM-DD',
  time_from: 'HH:mm',
  time_to: 'HH:mm',
  user_id: string,
  reason: string,
  status: 'pending'
}
```

## 🔐 Authentication Flow

1. User enters credentials on LoginScreen
2. App calls `/signin` endpoint
3. On success:
   - Token stored in AsyncStorage
   - User object stored in AsyncStorage
   - AuthContext updates state
   - Navigation switches to AppNavigator
4. On subsequent app launches:
   - AuthContext checks AsyncStorage
   - Auto-login if token exists
5. On API 401 response:
   - Axios interceptor clears storage
   - User redirected to login

## 🎭 State Management

### Auth Context
```javascript
const { user, isAuthenticated, signIn, signOut, updateUser } = useAuth();
```

### Theme Context
```javascript
const { theme, isDark, toggleTheme } = useTheme();
```

## 🚀 Next Steps & TODO

### Phase 2 - Backend Integration
- [ ] Connect to actual backend API
- [ ] Test all endpoints
- [ ] Handle error responses
- [ ] Add loading states

### Phase 3 - Advanced Features
- [ ] Push notifications setup
- [ ] Biometric authentication
- [ ] File upload for attachments
- [ ] Image picker for profile photos
- [ ] Pull-to-refresh on all lists
- [ ] Infinite scroll/pagination

### Phase 4 - New Features
- [ ] Break system management
- [ ] Task creation and assignment
- [ ] Team/hierarchy view
- [ ] Announcements with rich content
- [ ] Circular distribution
- [ ] Warning/notice system
- [ ] Analytics dashboard

### Phase 5 - Polish
- [ ] Animations with Reanimated
- [ ] Skeleton loaders
- [ ] Better error handling
- [ ] Offline mode
- [ ] App icons & splash screen
- [ ] Deep linking

## 📱 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Auto-login on app restart
- [ ] Logout functionality

**Home Screen:**
- [ ] Dashboard loads correctly
- [ ] Quick actions navigate properly
- [ ] Stats display (when backend ready)
- [ ] Pull to refresh

**Requests:**
- [ ] View permission history
- [ ] View leave history
- [ ] Create new permission
- [ ] Create new leave
- [ ] Date/time pickers work
- [ ] Form validation
- [ ] Submit success/error handling

**Profile:**
- [ ] User info displays correctly
- [ ] Dark mode toggle works
- [ ] Theme persists on restart
- [ ] Logout works

**Navigation:**
- [ ] All tabs navigate correctly
- [ ] Back navigation works
- [ ] Deep navigation maintains state

## 🐛 Common Issues & Solutions

### iOS Build Issues
```bash
# Clean build
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android Build Issues
```bash
# Clean gradle
cd android
./gradlew clean
cd ..
```

### Metro Bundler Issues
```bash
# Reset cache
yarn start --reset-cache
```

### Environment Variables Not Working
```bash
# Restart metro after .env changes
# Rebuild the app (not just reload)
```

## 📦 Dependencies

### Core
- react: ^18.2.0
- react-native: ^0.73.2

### Navigation
- @react-navigation/native: ^6.1.9
- @react-navigation/bottom-tabs: ^6.5.11
- @react-navigation/native-stack: ^6.9.17

### UI
- react-native-paper: ^5.12.3
- react-native-vector-icons: ^10.0.3
- react-native-safe-area-context: ^4.8.2
- react-native-gesture-handler: ^2.14.1
- react-native-reanimated: ^3.6.1

### Utilities
- axios: ^1.6.5
- @react-native-async-storage/async-storage: ^1.21.0
- @react-native-community/datetimepicker: ^7.6.2
- date-fns: ^3.0.6

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly on both iOS and Android
4. Submit for review

## 📞 Support

For issues or questions, contact the development team.

---

**Built with ❤️ using React Native**
