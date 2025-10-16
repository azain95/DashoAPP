# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ or yarn installed
- [ ] Git installed
- [ ] For iOS: Xcode 14+ (macOS only)
- [ ] For Android: JDK 17, Android Studio, Android SDK

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/azain95/DashoAPP.git
cd DashoAPP
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

### 3. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` based on your platform:

**Android Emulator:**
```env
API_BASE_URL=http://10.0.2.2:5000
```

**iOS Simulator:**
```env
API_BASE_URL=http://localhost:5000
```

**Physical Device (same network as backend):**
```env
API_BASE_URL=http://YOUR_COMPUTER_IP:5000
```

### 4. Platform-Specific Setup

#### iOS (macOS only)

```bash
cd ios
pod install
cd ..
```

#### Android

Ensure `android/local.properties` exists:

```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
# Windows: C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
# Linux: /home/YOUR_USERNAME/Android/Sdk
```

### 5. Start Backend Server

Make sure your backend is running:

```bash
# Your backend should be running on port 5000
```

### 6. Run the App

**Terminal 1 - Start Metro:**
```bash
yarn start
```

**Terminal 2 - Run App:**
```bash
# iOS
yarn ios

# Android
yarn android
```

## Verification

1. **App Launches** - Login screen appears
2. **Login Works** - Can authenticate with credentials
3. **Navigation Works** - All 5 bottom tabs accessible
4. **API Connection** - Can create requests (if backend running)

## Common Issues

### Metro Won't Start
```bash
yarn start --reset-cache
```

### Android Build Fails
```bash
yarn clean:android
yarn android
```

### iOS Build Fails
```bash
yarn clean:ios
yarn ios
```

### Can't Connect to Backend
- Verify backend is running
- Check `.env` has correct URL
- For Android emulator, use `10.0.2.2` not `localhost`
- Restart app after changing `.env`

## Next Steps

1. Read [SETUP.md](./SETUP.md) for detailed configuration
2. Review [README.md](./README.md) for project overview
3. Check [ANDROID_FIX_GUIDE.md](./ANDROID_FIX_GUIDE.md) for troubleshooting

## Need Help?

Run React Native Doctor:
```bash
npx react-native doctor
```

This will check your environment and suggest fixes.
