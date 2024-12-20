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
  - `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-**status**-bar`
  - https://necolas.github.io/react-native-web/****
  - `npx expo start --reset-cache`
    - useful, but also add `--tunnel` if not connected to same wifi (or Window's firewall is blocking)\*\*\*\*
- Bottom Tab navigation
  - expo icons finder: https://icons.expo.fyi/Index
- path aliases & layout groups
  - default template already sets this up, this project manually does it b/c we started from scratch
- persisting onboarding state
  - `npx expo install @react-native-async-storage/async-storage`
- linear gradients
  - `npx expo install expo-linear-gradient`
  - Now that you've learned about linear gradient: you can actually use [linear gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/), [reanimated](https://docs.swmansion.com/react-native-reanimated/) and [masked view](https://docs.expo.dev/versions/latest/sdk/masked-view/) to create highly customizable skeleton loaders in React Native.
- local image
  - going to use built-in, but recommended
    - Expo Image: https://docs.expo.dev/versions/latest/sdk/image/
    - Fast Image: https://github.com/DylanVann/react-native-fast-image
- https://ethercreative.github.io/react-native-shadow-generator/
- https://docs.expo.dev/versions/latest/sdk/imagepicker/
  - `npx expo install expo-image-picker`
- https://docs.expo.dev/versions/latest/sdk/filesystem/
  - `npx expo install expo-file-system`
- [readme](https://kadikraman.github.io/intermediate-react-native-v2-course/docs/dynamic-routes) on how to
  - convert screen into a stack
  - convert index screen into a stack
- `npx expo install date-fns`
- `npx expo install expo-dev-client`
- builds
  > npx expo prebuild --platform ios
  > npx expo prebuild --platform android
  - this triggers setting up an app ID
    - Note that once you upload your app to the stores, you won't be able to change the app ID ever.
- [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)
  - meaning the ios/ and android/ directories are ephemeral
