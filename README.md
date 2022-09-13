# zeekeez mobile app

## Running without docker and using a physical Phone Android (Not an emulator)

### NodeJs

make sure you have Node 12 or newer.

### JDK, Android Studio, Android SDK, ANDROID HOME

Run `npx react-native doctor`. It will install automatically the needed tools.  
You need to restart your PC after that.

### Possible problems

#### gradle

You may have this problem: **Error: Could not find or load main class org.gradle.wrapper.GradleWrapperMain**

To resolve it, move into the */android* folder and run `gradle wrapper`.  
If you don't have gradle, you need to install it and configure the environment variables.

#### RNCWebView

You may have this error: **Invariant Violation: requireNativeComponent: "RNCWebView" was not found in the UIManager.**

To resolve it, run `yarn android`

#### INSTALL_FAILED_INSUFFICIENT_STORAGE

While running `yarn android` you may encounter this issue: **INSTALL_FAILED_INSUFFICIENT_STORAGE**

Free some space on your phone.

### Enable USB device

#### Plug your phone in *USB Debugger* mode

#### `adb devices`, you should find your device in this list ex: *a27ced5 device*. this command will start the *Daemon*

#### `adb reverse tcp:8081 tcp:8081`, it will map the server to your phone

#### `adb reverse tcp:8003 tcp:8003`, will allow a connection to this server from your phone

#### `adb reverse tcp:8005 tcp:8005`, will allow a connection to this server from your phone

### Start the app in development mode

Run `yarn start`

In another shell command run `yarn android`

Unlock your phone, you should see automatically the App there.  
And you can now make change in the website, you will automatically see the change.

#### If you make change in the list of used package for the app, you must re run `yarn android`

## Configure Facebook authentication for Android

Go to this link : <https://developers.facebook.com/apps/[APP_ID]/fb-login/quickstart/>  
Select *Android*.

The important step is located at:

- 3rd step: you can find all the information there at this location *android\app\src\main\AndroidManifest.xml*
- 4th step: Create an hash key and fill the form with it.  
In production mode, you need to follow this instruction: <https://developer.android.com/studio/publish/app-signing>
- 6th step: Update your ressource config file corresponding to the data shown by the documentation. Path of the file to update: *android\app\src\main\res\values\strings.xml*

## Configure Google authentication for Android

You have nothing to configure on this side of the app. Just be sure that the website is well configured.

## Running with docker

...


# Configure local environment

## Change app icons

Make sure to have a png of 1024 * 1024
Go to https://resizeappicon.com/ and download all needed images
Make sure all images are in format RGB and not RGBA
Open iOS project on Xcode
Click on general view then the small arrow beside App Icon Source
Replace all images by drag and drop

## Android

### Installation

- Install android studio
- Install android SDK from android studio
- Install all tools from android studio
- Install at least one android emulator
- Make sure emulator is working by running empty app
- add this to ~/.zshrc
```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jre/Contents/Home
```
- run ```chmod 755 android/gradlew```

### Run

- run server: ```yarn start```
- run app: ```yarn android```

### Build

Upgrade version
- Upgrade package version in package.json
- Open file android/app/build.gradle
- in defaultConfig section, upgrade `versionCode` and `versionName`

Push changes to master

In /android/gradle.properties, make sure to replace SECRET_HERE with the actual password
Make sure to have /android/app/zeekeez-keystore.jks file

Build:
- ```cd android```
- ```./gradlew clean bundleRelease```
- ```cd ..```

Bundle (aab) available under folder android/app/build/outputs/bundle/release/app-release.aab

## iOS

### Installation

- Install Xcode with lastest version
- Verify Xcode Command Line Tools is installed: ```xcode-select -p``` 
- Link libraries: ```react-native link```
- if you got an error while runing pod install, try ```sudo xcode-select --switch /Applications/Xcode.app```
- Install pods: ```cd ios && pod install && cd ..```
- Run on simulator: ```yarn ios```

### Run

- run server: ```yarn start```
- run xcode at project location, open .xcworkspace not .xcodeproj
- chose which device and click on Run

### Build

Upgrade version
- open xcode and select project
- go to general tab and update version and build numbers

Archive
- in xcode, select device to be Any iOS Device
- Then click on Product -> Archive
- Click on validate app -> next -> next -> validate -> done
- Window -> organizer
- Click on distribute app -> next -> next -> next -> next -> upload
