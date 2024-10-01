# Frontend Masters - React Native v3

- [dev](#dev)
- [chapters](#chapters)
  - [components \& styling](#components--styling)
  - [navigation](#navigation)
  - [Input, Scrolling, and Lists](#input-scrolling-and-lists)
  - [user Experience Enhancements](#user-experience-enhancements)
  - [device interactions](#device-interactions)
  - [building a recurring reminder component](#building-a-recurring-reminder-component)
- [resources](#resources)

## dev

- `nr start --tunnel`
  - lets you connect to Expo Go on the windows machine
  - the tunnel is needed b/c of the Window's firewall

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

### navigation

- https://docs.expo.dev/router/introduction/
  - file-based routing
  - comes with deep-linking built-in
- types of navigation
  - stacks
    - this is the default for expo router
  - tabs
  - modals
    - on androids, this will look similar to a normal screen
- `nlx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar`
- linking
  - https://docs.expo.dev/guides/linking/
  - https://docs.expo.dev/guides/deep-linking/
- router
  - push: push screen on top of stack
    - e.g. stack: index,counter + router.push(counter) = stack: index,counter,counter
  - replace: replace current screen with new screen
    - e.g. stack: index,counter + router.replace(counter) = stack: index,idea
  - navigate: navigate to screen, but might navigate back
    - e.g. stack: index,counter + router.navigate(counter) = stack: index

### Input, Scrolling, and Lists

- by default, mobile screens are NOT scrollable
  - this is diff from the web, so you need to **explicitly** declare it

### user Experience Enhancements

- layout animation
  - official docs: https://reactnative.dev/docs/layoutanimation
  - better versions
    - https://docs.swmansion.com/react-native-reanimated/
    - https://docs.swmansion.com/react-native-gesture-handler/docs/
  - configureNext() docs: https://reactnative.dev/docs/layoutanimation#configurenext

### device interactions

- haptics
  - `npx expo install expo-haptics`
- push notifications
  - https://docs.expo.dev/push-notifications/sending-notifications/
  - remote notifications
    - not covered by course
    - require server to send
  - Android
    - requires channel to specified beforehand: https://developer.android.com/training/notify-user/channels
  - schedule notifications
    - https://docs.expo.dev/versions/latest/sdk/notifications/#schedule-notifications
    - environment variables and secrets docs: https://docs.expo.dev/build-reference/variables/#how-to-upload-a-secret-file-and-use-it-in-my-app-config

### building a recurring reminder component

- creating a timer
  - date-fns: https://date-fns.org/
  - `npx expo install date-fns`
- confetti & haptics
  - `npx expo install react-native-confetti-cannon`
  - troubleshooting:
    - restart server
    - reset cache: `nr start --reset-cache`
  - react-native dimensions - allows you to find the "center" of the screen
    - Dimensions
    - useWindowDimensions
      - dynamic, and updates when the screen rotates

## resources

- course notes: https://kadikraman.github.io/react-native-v3-course/
