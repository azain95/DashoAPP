# Changelog

All notable changes to Dasho Mobile will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of Dasho Mobile
- User authentication (login/logout)
- Home dashboard with user statistics
- Permission request management (create, view history)
- Leave request management (create, view history)
- Tasks screen (placeholder for future implementation)
- Activity feed (notifications and announcements placeholders)
- User profile with settings
- Dark/Light theme toggle with persistence
- Bottom tab navigation (5 tabs)
- Material Design 3 UI with React Native Paper
- Complete Android project configuration
- Complete iOS project configuration
- Environment configuration support
- Comprehensive documentation
- Test setup with Jest
- Basic unit and navigation tests
- ESLint and Prettier configuration

### Technical
- React Native 0.73.2
- React Navigation 6.x
- React Native Paper 5.x
- AsyncStorage for local persistence
- Axios for API integration
- date-fns for date manipulation
- React Native Reanimated for animations

### Dependencies
- @react-native-async-storage/async-storage ^1.21.0
- @react-native-community/datetimepicker ^7.6.2
- @react-navigation/bottom-tabs ^6.5.11
- @react-navigation/native ^6.1.9
- @react-navigation/native-stack ^6.9.17
- axios ^1.6.5
- date-fns ^3.0.6
- react 18.2.0
- react-native 0.73.2
- react-native-gesture-handler ^2.14.1
- react-native-paper ^5.12.3
- react-native-reanimated ^3.6.1
- react-native-safe-area-context ^4.8.2
- react-native-screens ^3.29.0
- react-native-vector-icons ^10.0.3

### Configuration
- Android: minSdk 23, targetSdk 34, compileSdk 34
- iOS: Deployment target 13.0
- Node: >= 18
- JDK: 17
- Gradle: 8.3
- AGP: 8.1.1

### Documentation
- README.md - Project overview
- START.md - Quick start guide
- SETUP.md - Detailed setup instructions
- CHANGELOG.md - Version history (this file)
- ANDROID_FIX_GUIDE.md - Android troubleshooting
- GIT_PUSH_INSTRUCTIONS.md - Git workflow
- FIXES_SUMMARY.md - Build fixes summary

## [Unreleased]

### Planned Features
- Push notifications
- Biometric authentication
- File attachments for requests
- Profile photo upload
- Break system management
- Task creation and assignment
- Team/hierarchy views
- Announcements with rich content
- Circular distribution
- Warning/notice system
- Analytics dashboard
- Offline mode
- Deep linking
- Widget support

### Known Issues
- None at this time

### Breaking Changes
- None

---

**Note:** Version 1.0.0 represents the initial transformation from React web app to React Native mobile app.
