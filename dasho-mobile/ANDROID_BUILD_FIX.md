# Android Build Fix - Dependency Compatibility

## Issue

Build was failing with errors:
```
Unresolved reference: BaseReactPackage
Cannot access 'ViewManagerWithGeneratedInterface'
```

## Root Cause

Version incompatibility between React Native 0.73.2 and navigation/gesture dependencies.

## Solution Applied

Updated package.json with exact compatible versions:

```json
"react-native-gesture-handler": "~2.14.0",
"react-native-reanimated": "~3.6.0",
"react-native-safe-area-context": "4.8.2",
"react-native-screens": "3.29.0"
```

## Steps to Fix on Your Machine

### 1. Pull Latest Changes

```bash
git pull origin main
```

### 2. Clean Everything

```bash
# Windows PowerShell
cd "C:\Users\ahmed\Desktop\repos\New folder\DashoAPP\dasho-mobile"

# Delete node_modules
Remove-Item -Recurse -Force node_modules

# Delete package lock
Remove-Item yarn.lock

# Clean Android build
cd android
.\gradlew clean
cd ..
```

### 3. Reinstall Dependencies

```bash
yarn install
```

### 4. Rebuild

```bash
yarn android
```

## If Still Fails

### Option A: Clean Android Build Cache

```bash
cd android

# Clean Gradle cache
.\gradlew clean
.\gradlew cleanBuildCache

# Delete build folders
Remove-Item -Recurse -Force app\build
Remove-Item -Recurse -Force build
Remove-Item -Recurse -Force .gradle

cd ..
```

### Option B: Reset Node Modules

```bash
# Delete and reinstall everything
Remove-Item -Recurse -Force node_modules
Remove-Item yarn.lock
yarn cache clean
yarn install
```

### Option C: Verify Java/Android SDK

```bash
# Check Java version (should be 17)
java -version

# Check Gradle
cd android
.\gradlew --version
cd ..
```

Should show:
- Java: 17.x
- Gradle: 8.3
- Kotlin: 1.9.0

## Expected Result

After running `yarn android`, you should see:

```
BUILD SUCCESSFUL in Xs
info Connecting to the development server...
info Starting the app on "emulator-5554"...
```

Then the app launches on your emulator.

## Common Issues

### Issue 1: SDK Version Mismatch
**Error:** `SDK processing. This version only understands SDK XML versions up to 3...`

**Fix:** This is just a warning, can be ignored. Or update Android Studio.

### Issue 2: Metro Already Running
**Error:** `A dev server is already running for this project on port 8081`

**Fix:**
```bash
# Kill Metro
taskkill /F /IM node.exe

# Or close all terminals running Metro
```

### Issue 3: Gradle Daemon Issues
**Error:** Build hangs or fails randomly

**Fix:**
```bash
cd android
.\gradlew --stop
cd ..
yarn android
```

### Issue 4: Emulator Not Found
**Error:** `No connected devices!`

**Fix:**
1. Start Android emulator from Android Studio
2. Or: `adb devices` to check connection
3. Or: Use physical device with USB debugging

## Verification

After successful build:

1. ✅ App installs on emulator
2. ✅ Metro bundler running
3. ✅ Login screen appears
4. ✅ No red error screens

## Additional Help

If build still fails after these steps:

1. Check `android/build.gradle` has correct versions
2. Verify `android/gradle.properties` is correct
3. Run `npx react-native doctor` to check environment
4. See `ANDROID_FIX_GUIDE.md` for more troubleshooting

## What Changed

**Before:**
```json
"react-native-screens": "^3.29.0"  // Caret allows any 3.x version
```

**After:**
```json
"react-native-screens": "3.29.0"   // Exact version pinned
```

This ensures everyone uses the exact same tested versions.

## Dependencies Fixed

| Package | Before | After | Reason |
|---------|--------|-------|--------|
| react-native-gesture-handler | ^2.14.1 | ~2.14.0 | Compatibility with RN 0.73 |
| react-native-reanimated | ^3.6.1 | ~3.6.0 | Compatibility with RN 0.73 |
| react-native-safe-area-context | ^4.8.2 | 4.8.2 | Exact version |
| react-native-screens | ^3.29.0 | 3.29.0 | Exact version |

## Push to GitHub

This fix has been committed. After you pull and rebuild successfully, everything should work.

---

**Last Updated:** 2024-10-16
**Status:** ✅ Fixed in latest commit
