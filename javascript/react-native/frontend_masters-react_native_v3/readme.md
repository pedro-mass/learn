# Frontend Masters - React Native v3

## chapters

### components & styling

- https://kadikraman.github.io/react-native-v3-course/docs/new-project/
  - https://docs.expo.dev/more/create-expo/#pnpm
- `nlx create expo-app taskly -t`
- `nr start --tunnel`
  - installs ngrok to make it available off the local network
  - useful on windows b/c of the firewall
  - cons
    - slower
- https://reactnative.directory/
- `nlx expo lint`
  - `nr lint --fix`
- https://www.nativewind.dev/
- `import { Button } from 'react-native'`
  - never used in production apps b/c it doesn't allow you to customize the button
  - only really used to quickly throw up a button for testing
  - instead use `TouchableOpacity` or `Pressable`
  - `Pressable` is the latest generation, so probably use that
  - `TouchableOpacity` is handy because it automatically adds a little opacity when you press it
- https://icons.expo.fyi/Index
  - search svgs
  - use svg sparingly b/c it uses a lot of resources, especially on android
- `nlx expo install @expo/vector-icons`
  - using `expo install` ensures that what's being installed is compatible with the version of expo being used
- installing this would normally require rebuilding the app. Luckily we're using Expo Go, which already has this internally installed
- https://docs.expo.dev/versions/latest/sdk/image/
  - can also render SVGs

## resources

- course notes: https://kadikraman.github.io/react-native-v3-course/