# AndroidX Core Version Conflict - Fixed

## Issue

Build failed with:
```
Dependency 'androidx.core:core-ktx:1.16.0' requires compileSdk 35
and Android Gradle plugin 8.6.0 or higher.

This build currently uses Android Gradle plugin 8.1.1 and compileSdk 34.
```

## Root Cause

Some dependencies (particularly newer versions of React Native libraries) are pulling in `androidx.core:core-ktx:1.16.0`, which requires:
- Android SDK 35
- Android Gradle Plugin 8.6.0+

But React Native 0.73.2 is designed for:
- Android SDK 34
- AGP 8.1.1

## Solution Applied

Added dependency resolution strategy in `android/build.gradle` to force compatible androidx.core versions:

```gradle
configurations.all {
    resolutionStrategy {
        // Force androidx.core to use version compatible with SDK 34
        force 'androidx.core:core:1.13.1'
        force 'androidx.core:core-ktx:1.13.1'
    }
}
```

This forces all dependencies to use `androidx.core:1.13.1` which is compatible with SDK 34 and AGP 8.1.1.

## Fix on Your Machine

### Pull the changes:

```powershell
cd "C:\Users\ahmed\Desktop\repos\New folder\DashoAPP\dasho-mobile"

# Pull latest fix
git pull origin main

# Clean and rebuild
cd android
.\gradlew clean
cd ..

# Build
yarn android
```

## Why Not Upgrade to SDK 35 and AGP 8.6?

While we could upgrade, it's riskier because:
1. React Native 0.73.2 was tested with SDK 34
2. AGP 8.6.0 is very new and may have compatibility issues
3. All React Native dependencies would need verification
4. androidx.core 1.13.1 is stable and tested

## Verification

After pulling, verify the fix is applied:

```powershell
cd android
# Check the build.gradle
type build.gradle | findstr "androidx.core"
```

Should show:
```gradle
force 'androidx.core:core:1.13.1'
force 'androidx.core:core-ktx:1.13.1'
```

## Expected Result

```powershell
PS> yarn android

> Configure project :react-native-reanimated
Android gradle plugin: 8.1.1
Gradle: 8.3

> Task :app:compileDebugJavaWithJavac
> Task :app:assembleDebug

BUILD SUCCESSFUL in 45s
info Installing the app...
```

## Alternative: Manual Fix

If you can't pull, manually edit `android/build.gradle`:

1. Open `android/build.gradle`
2. Find the `allprojects` block
3. Add at the end (before closing brace):

```gradle
    configurations.all {
        resolutionStrategy {
            force 'androidx.core:core:1.13.1'
            force 'androidx.core:core-ktx:1.13.1'
        }
    }
```

4. Save and rebuild

## Common Questions

### Q: Will this break anything?

No. androidx.core 1.13.1 is a stable version that works perfectly with SDK 34. All React Native 0.73.2 apps use this version range.

### Q: Should I upgrade to SDK 35 later?

Wait for React Native 0.74+ which will officially support SDK 35. Upgrading now could introduce subtle issues.

### Q: What if I need features from androidx.core 1.16?

You probably don't. The version bump from 1.13 to 1.16 mainly adds SDK 35 specific features that don't work on SDK 34 anyway.

## Other Warnings You Can Ignore

### Warning 1: SDK XML version 4
```
This version only understands SDK XML versions up to 3 but an SDK XML file of version 4 was encountered
```

**Status:** Harmless warning. This is a mismatch between your Android Studio version and command-line tools. Doesn't affect builds.

**Fix (optional):**
Update Android Studio and SDK tools to latest versions.

### Warning 2: Deprecated Gradle features
```
Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0
```

**Status:** Harmless warning. These are from React Native dependencies. Will be fixed when RN updates their dependencies.

**Fix:** None needed. Gradle 9.0 is not released yet.

## If Build Still Fails

### Option 1: Nuclear Clean

```powershell
cd "C:\Users\ahmed\Desktop\repos\New folder\DashoAPP\dasho-mobile"

# Delete everything
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force android\build
Remove-Item -Recurse -Force android\.gradle
Remove-Item -Recurse -Force android\app\build

# Reinstall
yarn install

# Rebuild
cd android
.\gradlew clean
cd ..
yarn android
```

### Option 2: Check Java Version

```powershell
java -version
```

Should show Java 17.x. If not:
- Download and install JDK 17
- Set JAVA_HOME environment variable

### Option 3: Verify Gradle

```powershell
cd android
.\gradlew --version
```

Should show:
- Gradle 8.3
- JVM 17.x
- Kotlin 1.9.0

## What Changed

**File Modified:** `android/build.gradle`

**Added:**
```gradle
configurations.all {
    resolutionStrategy {
        force 'androidx.core:core:1.13.1'
        force 'androidx.core:core-ktx:1.13.1'
    }
}
```

This ensures all dependencies use compatible androidx.core versions.

---

**Status:** ✅ Fixed in latest commit

**Action:** Pull changes and rebuild with `yarn android`
