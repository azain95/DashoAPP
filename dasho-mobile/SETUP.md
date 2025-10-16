# Setup Guide

Comprehensive setup instructions for Dasho Mobile.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [iOS Setup](#ios-setup)
3. [Android Setup](#android-setup)
4. [Backend Configuration](#backend-configuration)
5. [Development Workflow](#development-workflow)
6. [Testing Setup](#testing-setup)
7. [Troubleshooting](#troubleshooting)

## Environment Setup

### Node.js and Package Manager

```bash
# Check versions
node --version  # Should be >= 18
npm --version   # Should be >= 9

# Install yarn (optional but recommended)
npm install -g yarn
```

### React Native CLI

```bash
npm install -g react-native-cli
```

## iOS Setup (macOS only)

### 1. Install Xcode

- Download from Mac App Store
- Version 14+ required
- Install Command Line Tools:
  ```bash
  xcode-select --install
  ```

### 2. Install CocoaPods

```bash
sudo gem install cocoapods
```

### 3. Install iOS Dependencies

```bash
cd ios
pod install
cd ..
```

### 4. Run on iOS Simulator

```bash
# Default simulator
yarn ios

# Specific simulator
yarn ios --simulator="iPhone 15 Pro"
```

### 5. Run on Physical Device

1. Open `ios/DashoMobile.xcworkspace` in Xcode
2. Select your device
3. Configure signing in Xcode
4. Build and run

## Android Setup

### 1. Install JDK 17

**macOS (Homebrew):**
```bash
brew install openjdk@17
```

**Windows:**
Download from [Oracle](https://www.oracle.com/java/technologies/downloads/#java17)

**Linux:**
```bash
sudo apt-get install openjdk-17-jdk
```

### 2. Install Android Studio

1. Download from [developer.android.com](https://developer.android.com/studio)
2. Install Android SDK (API 34)
3. Install Android SDK Build-Tools 34.0.0
4. Install Android Emulator
5. Create AVD (Android Virtual Device)

### 3. Configure Environment Variables

**macOS/Linux** (~/.bash_profile or ~/.zshrc):
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Windows** (System Environment Variables):
```
ANDROID_HOME=C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
Path=%Path%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator
```

### 4. Configure local.properties

Create/edit `android/local.properties`:

```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### 5. Run on Android Emulator

```bash
# Start emulator first
emulator -avd YOUR_AVD_NAME

# Or start from Android Studio

# Then run app
yarn android
```

### 6. Run on Physical Device

1. Enable Developer Options on device
2. Enable USB Debugging
3. Connect via USB
4. Verify connection: `adb devices`
5. Run: `yarn android`

## Backend Configuration

### Environment Variables

1. Copy `.env.example` to `.env`
2. Configure based on your setup:

**Development - Android Emulator:**
```env
API_BASE_URL=http://10.0.2.2:5000
```

**Development - iOS Simulator:**
```env
API_BASE_URL=http://localhost:5000
```

**Development - Physical Device:**
```env
API_BASE_URL=http://YOUR_COMPUTER_IP:5000
```

**Production:**
```env
API_BASE_URL=https://api.dashoprojects.com
```

### API Endpoints

The app expects these endpoints:

- `POST /signin` - User authentication
- `POST /signup` - User registration
- `GET /requests` - Fetch requests
- `POST /requests` - Create request

See backend documentation for complete API reference.

## Development Workflow

### Starting Development

```bash
# Terminal 1: Metro Bundler
yarn start

# Terminal 2: Run app
yarn ios     # or yarn android
```

### Hot Reload

- **Fast Refresh** is enabled by default
- Changes to JS/JSX files reload automatically
- Changes to native code require rebuild

### Debugging

**React Native Debugger:**
1. Install from [github.com/jhen0409/react-native-debugger](https://github.com/jhen0409/react-native-debugger)
2. Start debugger
3. Open dev menu in app (Cmd+D iOS, Cmd+M Android)
4. Select "Debug"

**Flipper:**
1. Install from [fbflipper.com](https://fbflipper.com/)
2. Start Flipper
3. Run app in debug mode
4. Flipper auto-connects

**Chrome DevTools:**
1. Open dev menu
2. Select "Debug"
3. Opens Chrome tab

## Testing Setup

### Running Tests

```bash
# All tests
yarn test

# Watch mode
yarn test:watch

# Coverage
yarn test:coverage
```

### Test Structure

```
__tests__/
├── components/       # Component tests
├── screens/          # Screen tests
├── utils/            # Utility tests
└── navigation/       # Navigation tests
```

### Writing Tests

See existing tests in `__tests__/` for examples.

## Troubleshooting

### Common Issues

**1. Metro bundler issues:**
```bash
yarn start --reset-cache
```

**2. Android build fails:**
```bash
cd android
./gradlew clean
cd ..
yarn android
```

**3. iOS build fails:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
yarn ios
```

**4. Dependencies out of sync:**
```bash
yarn clean
```

**5. Can't connect to backend:**
- Verify backend is running
- Check `.env` configuration
- For Android emulator, use `10.0.2.2` not `localhost`
- Restart app after `.env` changes

### Platform-Specific Issues

See [ANDROID_FIX_GUIDE.md](./ANDROID_FIX_GUIDE.md) for Android-specific troubleshooting.

### Getting Help

1. Run React Native Doctor:
   ```bash
   npx react-native doctor
   ```

2. Check logs:
   ```bash
   # Android
   adb logcat
   
   # iOS
   # View in Xcode Console
   ```

3. Contact development team

## Next Steps

- Review [README.md](./README.md) for project overview
- Check [START.md](./START.md) for quick start
- Read [CHANGELOG.md](./CHANGELOG.md) for version history
