# 🚀 Quick Start Guide - Dasho Mobile

## ✅ Status: Project Successfully Created!

Your React Native mobile app has been successfully set up and is ready for development/testing.

## 📱 What's Included

✅ **29 JavaScript files** organized in a clean architecture
✅ **5 Main Screens** - Home, Requests, Tasks, Activity, Profile
✅ **Bottom Tab Navigation** with 5 tabs
✅ **Authentication System** with AsyncStorage
✅ **Dark/Light Theme** with persistence
✅ **Material Design 3 UI** using React Native Paper
✅ **API Integration** with Axios
✅ **Date/Time Pickers** for requests
✅ **Form Validation** and error handling
✅ **Responsive Design** for various screen sizes

## 🎯 Current Features

### Authentication
- ✅ Login screen with username/password
- ✅ Token-based authentication
- ✅ Secure storage using AsyncStorage
- ✅ Auto-login on app restart
- ✅ Auto-logout on 401 responses

### Home Dashboard
- ✅ Personalized greeting
- ✅ User profile with avatar
- ✅ Quick action cards
- ✅ Stats placeholders (ready for backend)
- ✅ Pull-to-refresh

### Requests Management
- ✅ Permission & Leave tabs
- ✅ Create new permission requests
- ✅ Create new leave requests
- ✅ View request history
- ✅ Status indicators (Pending, Approved, Rejected)
- ✅ Date & time selection

### Profile
- ✅ User information display
- ✅ Dark mode toggle
- ✅ Theme persistence
- ✅ Sign out functionality

### Other Sections
- 🔄 Tasks screen (placeholder - ready for implementation)
- 🔄 Notifications tab (placeholder)
- 🔄 Announcements tab (placeholder)

## 🏃 How to Run

### Option 1: iOS (macOS only)

```bash
cd /app/dasho-mobile

# Install iOS dependencies
cd ios && pod install && cd ..

# Run on iOS simulator
yarn ios
```

### Option 2: Android

```bash
cd /app/dasho-mobile

# Run on Android emulator/device
yarn android
```

### Starting Metro Bundler Separately

```bash
# In terminal 1
cd /app/dasho-mobile
yarn start

# In terminal 2 (run iOS or Android)
yarn ios
# or
yarn android
```

## ⚙️ Configuration

### Backend API Setup

**File:** `/app/dasho-mobile/.env`

**For Local Development:**
```env
API_BASE_URL=http://localhost:5000
```

**For Android Emulator with localhost:**
```env
API_BASE_URL=http://10.0.2.2:5000
```

**For Production (Digital Ocean):**
```env
API_BASE_URL=https://api.dashoprojects.com
```

> ⚠️ **Important:** After changing `.env`, restart Metro bundler and rebuild the app

## 🧪 Testing the App

### Test Login
Since you mentioned the backend is on localhost for testing:

1. **Make sure your backend is running** on `localhost:5000`
2. **Update `.env`** with correct backend URL
3. **Restart Metro** and rebuild the app
4. **Use valid credentials** from your backend

### Test Features
1. **Login** - Test authentication flow
2. **Home** - Check dashboard loads correctly
3. **Create Request** - Try creating a permission or leave request
4. **View History** - Check if requests appear in history
5. **Dark Mode** - Toggle theme and verify it persists
6. **Logout** - Test sign out and re-login

## 📂 Project Structure Summary

```
dasho-mobile/
├── src/
│   ├── components/       ← Reusable UI components
│   ├── screens/          ← App screens & tabs
│   ├── navigation/       ← Navigation setup
│   ├── context/          ← Auth & Theme contexts
│   ├── utils/            ← API, storage, helpers
│   └── theme/            ← Colors, spacing, themes
├── android/              ← Android native
├── ios/                  ← iOS native
├── .env                  ← API configuration
└── package.json          ← Dependencies
```

## 🎨 Design Philosophy

- **Modern Material Design 3** - Latest design language
- **iOS-inspired aesthetics** - Clean, minimal, elegant
- **Smooth animations** - Using Reanimated
- **Responsive** - Works on phones and tablets
- **Accessible** - Proper contrast and touch targets
- **Consistent** - Unified design system

## 🔌 API Endpoints Expected

Your backend should implement these endpoints:

```
POST /signin
  Body: { user_id, password }
  Response: { token, user }

GET /requests?type=permission|leave
  Response: [{ id, req_type, date_from, date_to, time_from, time_to, reason, status, ... }]

POST /requests
  Body: { req_datetime, req_type, date_from, date_to, time_from, time_to, user_id, reason }
  Response: { success, ... }
```

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
cd /app/dasho-mobile
rm -rf node_modules
yarn install
yarn start --reset-cache
```

### iOS build fails
```bash
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

### Android build fails
```bash
cd android
./gradlew clean
cd ..
```

### Can't connect to backend
- Check backend is running
- Verify `.env` file has correct URL
- For Android emulator, use `10.0.2.2` instead of `localhost`
- Restart Metro after changing `.env`

## 📱 Next Development Steps

### Immediate (Phase 1)
1. Test with actual backend
2. Fix any API integration issues
3. Add proper error messages
4. Test on real devices

### Short-term (Phase 2)
1. Implement Tasks feature
2. Add Notifications
3. Add Announcements with content
4. Implement file uploads
5. Add profile photo selection

### Medium-term (Phase 3)
1. Push notifications
2. Biometric authentication
3. Offline mode
4. Break system
5. Team/hierarchy views
6. Advanced analytics

### Long-term (Phase 4)
1. App store deployment
2. Deep linking
3. Widget support
4. Advanced animations
5. Performance optimization

## 📊 Performance Tips

- Use FlatList for long lists (already implemented)
- Images should be optimized (< 500KB)
- Use `React.memo` for expensive components
- Profile with Flipper for debugging
- Test on lower-end devices

## 🔐 Security Notes

- Tokens stored securely in AsyncStorage
- API uses Bearer token authentication
- Auto-logout on unauthorized access
- No sensitive data in logs
- HTTPS required for production

## 📞 Support Resources

- **React Native Docs:** https://reactnative.dev
- **React Navigation:** https://reactnavigation.org
- **React Native Paper:** https://callstack.github.io/react-native-paper/
- **AsyncStorage:** https://react-native-async-storage.github.io/async-storage/

## 🎉 You're Ready!

Your Dasho mobile app is fully set up and ready for development. All the core infrastructure is in place:

✅ Authentication
✅ Navigation
✅ State Management
✅ API Integration
✅ UI Components
✅ Theme System
✅ Form Handling

**Start by running the app and testing the existing features!**

```bash
cd /app/dasho-mobile
yarn start
# In another terminal:
yarn ios  # or yarn android
```

Happy coding! 🚀
