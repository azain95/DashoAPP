# Gradle Wrapper Setup

## Important Note

The `gradle-8.3-all.zip` file (~191MB) has been excluded from the repository due to its size.

## First-Time Setup

When you first clone this repository and try to build Android, Gradle will automatically download the wrapper:

```bash
cd android
./gradlew --version
```

This will automatically download `gradle-8.3-all.zip` from:
```
https://services.gradle.org/distributions/gradle-8.3-all.zip
```

## Manual Download (Optional)

If you prefer to download it manually:

1. Download from: https://services.gradle.org/distributions/gradle-8.3-all.zip
2. Place in: `android/gradle/wrapper/gradle-8.3-all.zip`
3. Gradle will extract it automatically on first build

## What's Included in Repo

- ✅ `gradle-wrapper.jar` (63KB)
- ✅ `gradle-wrapper.properties` (configuration)
- ❌ `gradle-8.3-all.zip` (excluded - auto-downloads)
- ❌ Extracted gradle directory (auto-extracts)

## First Build

```bash
cd android
./gradlew assembleDebug
```

On first run, this will:
1. Download gradle-8.3-all.zip (~191MB)
2. Extract it
3. Build your app

Subsequent builds will be much faster as Gradle is already downloaded.

## Troubleshooting

If download fails:
```bash
# Clear Gradle cache
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/wrapper

# Try again
cd android
./gradlew --version
```

## .gitignore

The following patterns are excluded:
```
*.zip
gradle-*.zip
android/gradle/wrapper/*.zip
```

This prevents accidentally committing large Gradle distribution files.
