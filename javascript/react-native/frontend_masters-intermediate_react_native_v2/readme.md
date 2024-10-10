# Frontend Masters: Intermediate React Native v2

## chapters

### introduction

- introduction
  - [course website](https://kadikraman.github.io/intermediate-react-native-v2-course/docs/intro/)
  - [Expo Application Services (EAS)](https://expo.dev/eas) covered later in the course
  - [environment setup](https://reactnative.dev/docs/set-up-your-environment)
    - troubleshooting
      - https://stackoverflow.com/questions/62145379/how-to-connect-android-studio-running-inside-wsl2-with-connected-devices-or-andr
      -
  - instructor built: [react-conf-app](https://github.com/expo/react-conf-app)

### navigation

- installing and configuring
  - https://docs.expo.dev/router/introduction/
  - `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar`
  - https://necolas.github.io/react-native-web/
  - `npx expo start --reset-cache`
    - useful, but also add `--tunnel` if not connected to same wifi (or Window's firewall is blocking)\*\*\*\*
- Bottom Tab navigation
  - expo icons finder: https://icons.expo.fyi/Index
- path aliases & layout groups
  - default template already sets this up, this project manually does it b/c we started from scratch
