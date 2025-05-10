# React Native App with SQLite Database

A cross-platform React Native application that uses a local SQLite database for data persistence.

## Prerequisites

- **macOS**  (tested on macOS Monterey and later)
- **Homebrew** (package manager for macOS)
- **Xcode** (for iOS development)
- **Ruby** (for installing CocoaPods)

## Installation Steps (macOS)

1. **Update Homebrew**

   ```bash
   brew update```

2. **Install Watchman (recommended by React Native)**

``` bash
brew install watchman```

3. **Install Node.js 22**

``` bash 
brew install node@22```

4. **Verify Node version**
```bash 
node -v  # Expected output: v22.15.0```

5. **Install Expo CLI globally**
```bash 
npm install -g expo-cli ```

6. **Install CocoaPods (for iOS dependencies)**
```bash 
sudo gem install cocoapods```

7. **Install Xcode Command Line Tools**
```bash 
xcode-select --install```

8. **Accept the Xcode license**
```bash 
sudo xcodebuild -license accept```

9. **Point Xcode to the correct Developer directory**

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer```

10. Verify Xcode developer path
``` bash
xcode-select -p```

11. Install project dependencies
From your project root:

```bash
npm install
cd ios && pod install && cd .. ```

12. Run the app on iOS simulator
```bash
npm run ios```
