# Dasho Mobile

> Modern React Native mobile application for employee leave and permission management

[![React Native](https://img.shields.io/badge/React%20Native-0.73.2-blue.svg)](https://reactnative.dev/)
[![Node](https://img.shields.io/badge/Node-%3E%3D18-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

## Features

- 🔐 **Authentication** - Secure login with token-based auth
- 🏠 **Dashboard** - Overview of requests, tasks, and statistics
- 📋 **Requests Management** - Create and track permission and leave requests
- ✅ **Tasks** - Task management system (ready for implementation)
- 🔔 **Activity Feed** - Notifications and announcements
- 👤 **Profile** - User profile and settings
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Cross-platform** - Works on iOS and Android

## Tech Stack

- **React Native 0.73.2** - Mobile framework
- **React Navigation 6** - Navigation solution
- **React Native Paper 5** - Material Design components
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **React Native Reanimated** - Smooth animations

## Prerequisites

### Required
- Node.js >= 18
- npm >= 9 or yarn
- React Native CLI

### Platform-Specific

**iOS Development (macOS only):**
- Xcode 14+
- CocoaPods (`sudo gem install cocoapods`)
- iOS Simulator or physical device

**Android Development:**
- JDK 17
- Android Studio
- Android SDK (API 34)
- Android Emulator or physical device

## Quick Start

See [START.md](./START.md) for detailed setup instructions.

```bash
# Install dependencies
yarn install

# iOS setup (macOS only)
cd ios && pod install && cd ..

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## Documentation

- **[START.md](./START.md)** - Quick start guide
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history
- **[ANDROID_FIX_GUIDE.md](./ANDROID_FIX_GUIDE.md)** - Android troubleshooting

## Project Structure

```
dasho-mobile/
├── android/          # Android native code
├── ios/              # iOS native code
├── src/
│   ├── components/   # Reusable UI components
│   ├── screens/      # App screens
│   ├── navigation/   # Navigation setup
│   ├── context/      # React Context (Auth, Theme)
│   ├── utils/        # Helpers, API, storage
│   ├── theme/        # Colors, spacing, themes
│   ├── config/       # App configuration
│   └── App.js        # Root component
├── __tests__/        # Test files
└── package.json      # Dependencies & scripts
```

## Available Scripts

```bash
yarn start          # Start Metro bundler
yarn android        # Run on Android
yarn ios            # Run on iOS
yarn test           # Run tests
yarn test:watch     # Run tests in watch mode
yarn test:coverage  # Run tests with coverage
yarn lint           # Run ESLint
yarn lint:fix       # Fix ESLint errors
yarn format         # Format code with Prettier
yarn clean          # Clean all caches and reinstall
yarn clean:android  # Clean Android build
yarn clean:ios      # Clean iOS build
```

## Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
# Android Emulator
API_BASE_URL=http://10.0.2.2:5000

# iOS Simulator
API_BASE_URL=http://localhost:5000

# Production
API_BASE_URL=https://api.dashoprojects.com
```

## Testing

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# With coverage
yarn test:coverage
```

## Troubleshooting

See [ANDROID_FIX_GUIDE.md](./ANDROID_FIX_GUIDE.md) for common issues and solutions.

**Quick fixes:**
```bash
# Clean everything
yarn clean

# Android issues
yarn clean:android

# iOS issues
yarn clean:ios

# Reset Metro
yarn start --reset-cache
```

## Contributing

1. Create feature branch
2. Make changes
3. Run tests: `yarn test`
4. Run lint: `yarn lint`
5. Submit for review

## License

Private - Dasho Project

## Support

For issues or questions, contact the development team.
