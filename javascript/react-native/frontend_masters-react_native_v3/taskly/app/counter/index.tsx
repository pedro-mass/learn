import { intervalToDuration, isBefore } from "date-fns";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TimeSegment } from "../../components/TimeSegment";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { saveToStorage } from "../../utils/storage";
import {
  useCountdownState,
  PersistedCountdownState,
  countdownStorageKey,
} from "./useCountdownState";

// 10 seconds from now
const frequency = 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

export default function CounterScreen() {
  const [countdownState, setCountdownState] = useCountdownState();
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  const lastCompletedAt = countdownState?.complatedAtTimestamps[0];

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = lastCompletedAt
        ? lastCompletedAt + frequency
        : Date.now();
      const isOverdue = isBefore(timestamp, Date.now());

      const distance = intervalToDuration(
        isOverdue
          ? { end: Date.now(), start: timestamp }
          : { start: Date.now(), end: timestamp }
      );

      setStatus({ isOverdue, distance });
    }, 1000);

    return () => clearInterval(interval);
  }, [lastCompletedAt]);

  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading]}>Thing due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
      )}
      <View style={styles.row}>
        {(
          [
            "days",
            "hours",
            "minutes",
            "seconds",
          ] as (keyof typeof status.distance)[]
        ).map((unit) => (
          <TimeSegment
            unit={unit}
            number={status.distance?.[unit] ?? 0}
            key={unit}
          />
        ))}
      </View>
      <TouchableOpacity
        onPress={scheduleNotification}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>I've done the thing!</Text>
      </TouchableOpacity>
    </View>
  );

  async function handleRequestPermissions() {
    const result = await registerForPushNotificationsAsync();
    console.log({ fn: "handleRequestPermissions", result });
    return result;
  }

  async function scheduleNotification() {
    let pushNotificationId;
    const result = await registerForPushNotificationsAsync();

    if (result !== "granted") {
      Alert.alert(
        "Unable to schedule notification",
        "Enable the notification permission for Expo Go in settings"
      );

      return;
    }

    pushNotificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "I'm a notification from your app! 📨",
      },
      trigger: {
        seconds: 5,
      },
    });

    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState.currentNotificationId
      );
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      complatedAtTimestamps: countdownState?.complatedAtTimestamps
        ? [Date.now(), ...(countdownState?.complatedAtTimestamps ?? [])]
        : [Date.now()],
    };
    setCountdownState(newCountdownState);

    await saveToStorage(countdownStorageKey, newCountdownState);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
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
  row: {
    flexDirection: "row",
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: theme.colorBlack,
  },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: theme.colorWhite,
  },
});
