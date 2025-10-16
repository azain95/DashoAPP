# 🔧 Android Build Fix Guide

## ✅ What Was Fixed

I've added **all missing Android files** that were causing the Gradle issues:

### Added Files (20+ files):
1. ✅ **android/app/build.gradle** - App build configuration
2. ✅ **android/build.gradle** - Root build configuration (updated)
3. ✅ **android/app/src/main/AndroidManifest.xml** - App manifest
4. ✅ **android/app/src/main/java/com/dashomobile/MainActivity.java** - Main Activity
5. ✅ **android/app/src/main/java/com/dashomobile/MainApplication.java** - Application class
6. ✅ **android/gradle/wrapper/gradle-wrapper.properties** - Gradle wrapper config
7. ✅ **android/gradlew** - Gradle wrapper script (made executable)
8. ✅ **android/app/src/main/res/** - Resource files (strings, styles, icons)
9. ✅ **android/app/proguard-rules.pro** - ProGuard rules
10. ✅ **react-native.config.js** - React Native configuration

### Fixed Component:
- ✅ **GradientButton.js** - Removed LinearGradient dependency (not needed)

## 🚀 How to Run on Your PC

### Step 1: Pull Latest Changes from GitHub

```bash
cd /path/to/your/project
git pull origin main
```

Or re-clone:
```bash
git clone https://github.com/azain95/DashoAPP.git
cd DashoAPP
```

### Step 2: Install Dependencies

```bash
# Install Node modules
yarn install
# or
npm install
```

### Step 3: Configure Android SDK Path

**Option A: Let Android Studio handle it** (Recommended)
- Open the `android` folder in Android Studio
- It will automatically configure `local.properties`

**Option B: Manual configuration**
Edit `android/local.properties`:
```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
# On Windows: C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
# On Linux: /home/YOUR_USERNAME/Android/Sdk
```

### Step 4: Configure Backend URL

Edit `.env` file:
```env
# For Android Emulator (accessing localhost backend)
API_BASE_URL=http://10.0.2.2:5000

# Note: 10.0.2.2 is the special IP that maps to your host machine's localhost
```

### Step 5: Start Your Backend

Make sure your backend is running on `localhost:5000`

### Step 6: Start Android Emulator

**Option A: From Android Studio**
- Open AVD Manager
- Launch your emulator

**Option B: From Command Line**
```bash
emulator -avd YOUR_AVD_NAME -netdelay none -netspeed full
```

**Check emulator is running:**
```bash
adb devices
# Should show: emulator-5554 device
```

### Step 7: Run the App

**Terminal 1 - Start Metro Bundler:**
```bash
yarn start
# or
npm start
```

**Terminal 2 - Run on Android:**
```bash
yarn android
# or
npm run android
```

## 🐛 Common Issues & Solutions

### Issue 1: "SDK location not found"

**Solution:**
```bash
# Windows
echo sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk > android/local.properties

# macOS/Linux
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

### Issue 2: Gradle build fails

**Solution 1: Clean build**
```bash
cd android
./gradlew clean
cd ..
yarn android
```

**Solution 2: Clear Gradle cache**
```bash
cd android
rm -rf .gradle build
./gradlew clean
cd ..
```

**Solution 3: Clear all caches**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
yarn install

# Clear Metro cache
yarn start --reset-cache
```

### Issue 3: "JAVA_HOME not set"

**Solution:**
```bash
# macOS/Linux
export JAVA_HOME=$(/usr/libexec/java_home)

# Windows (Command Prompt)
set JAVA_HOME=C:\\Program Files\\Java\\jdk-17

# Windows (PowerShell)
$env:JAVA_HOME="C:\\Program Files\\Java\\jdk-17"
```

### Issue 4: "Unable to connect to development server"

**Solution:**
```bash
# Make sure Metro is running
yarn start

# In another terminal
adb reverse tcp:8081 tcp:8081
yarn android
```

### Issue 5: Can't connect to backend

**Fix the .env file:**
```env
# ❌ WRONG for Android Emulator
API_BASE_URL=http://localhost:5000

# ✅ CORRECT for Android Emulator
API_BASE_URL=http://10.0.2.2:5000
```

**Then restart:**
```bash
# Kill the app
# Restart Metro with cache reset
yarn start --reset-cache
# Rebuild
yarn android
```

### Issue 6: "Execution failed for task ':app:installDebug'"

**Solution:**
```bash
# Uninstall existing app
adb uninstall com.dashomobile

# Rebuild and install
yarn android
```

### Issue 7: Module not found errors

**Solution:**
```bash
# Clear watchman (if on macOS)
watchman watch-del-all

# Clear Metro cache
rm -rf /tmp/metro-*

# Clear React Native cache
rm -rf /tmp/react-*

# Reinstall
rm -rf node_modules
yarn install

# Start fresh
yarn start --reset-cache
```

## 🔍 Verify Everything is Working

### Check 1: Gradle Build
```bash
cd android
./gradlew clean assembleDebug
```
Should complete without errors.

### Check 2: Metro Bundler
```bash
yarn start
```
Should start without errors and show "Metro waiting on exp://..."

### Check 3: Device Connection
```bash
adb devices
```
Should show your emulator or device.

### Check 4: Backend Connection
Make sure backend is running on port 5000.

## 📱 Expected Behavior

When everything works:
1. Metro bundler starts successfully
2. Gradle builds the APK
3. App installs on emulator
4. App opens showing the login screen
5. You can navigate through screens
6. API calls work (if backend is running)

## 🎯 Quick Checklist

Before running `yarn android`, ensure:

- [ ] Android SDK is installed
- [ ] Android emulator is running (`adb devices` shows device)
- [ ] Node modules are installed (`node_modules` folder exists)
- [ ] Backend is running (if testing API features)
- [ ] `.env` has correct `API_BASE_URL=http://10.0.2.2:5000`
- [ ] `local.properties` has correct SDK path

## 🆘 Still Having Issues?

### Option 1: Try React Native Doctor
```bash
npx react-native doctor
```
This will check your environment and suggest fixes.

### Option 2: Complete Clean Reset
```bash
# Delete everything
rm -rf node_modules
rm -rf android/app/build
rm -rf android/.gradle
rm -rf /tmp/metro-*
rm -rf /tmp/react-*

# Reinstall
yarn install

# Clean Gradle
cd android
./gradlew clean
cd ..

# Start fresh
yarn start --reset-cache

# In another terminal
yarn android
```

### Option 3: Open in Android Studio
1. Open Android Studio
2. File → Open → Select `android` folder
3. Let it sync and download dependencies
4. Click "Run" button
5. This often fixes configuration issues automatically

## 📞 Error Messages & What They Mean

| Error | Meaning | Fix |
|-------|---------|-----|
| "SDK location not found" | Android SDK path not configured | Add to `local.properties` |
| "Execution failed for ':app:compileDebugJavaWithJavac'" | Java/Kotlin compilation issue | Check JAVA_HOME, run `./gradlew clean` |
| "Could not connect to development server" | Metro not running or ports blocked | Restart Metro, check `adb reverse` |
| "Unable to resolve module" | Package not installed or cache issue | `yarn install`, clear cache |
| "Invariant Violation: Module AppRegistry is not a registered callable module" | Bundle loading issue | Clear cache, restart Metro |

## ✅ Success Indicators

You'll know it's working when you see:
- ✅ Gradle build completes: "BUILD SUCCESSFUL"
- ✅ Metro shows: "✓ Built bundle for Android"
- ✅ Emulator shows your app icon
- ✅ App launches to login screen
- ✅ No red error screens

## 🎉 Next Steps After Successful Build

1. Test login with valid credentials
2. Navigate through all tabs
3. Try creating a permission/leave request
4. Toggle dark mode
5. Test all features

---

**The Android build files are now complete and should work!** Pull the latest changes from GitHub and try running it. 🚀
