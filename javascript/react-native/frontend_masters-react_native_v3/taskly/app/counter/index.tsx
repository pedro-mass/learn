import * as Notifications from "expo-notifications";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";

export default function CounterScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={scheduleNotification}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>schedule notification</Text>
      </TouchableOpacity>
    </View>
  );

  async function handleRequestPermissions() {
    const result = await registerForPushNotificationsAsync();
    console.log({ fn: "handleRequestPermissions", result });
    return result;
  }

  async function scheduleNotification() {
    const result = await registerForPushNotificationsAsync();

    if (result !== "granted") {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notification permission for Expo Go in settings",
      );

      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "I'm a notification from your app! 📨",
      },
      trigger: {
        seconds: 5,
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
