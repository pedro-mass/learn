import { intervalToDuration, isBefore } from "date-fns";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { TimeSegment } from "../../components/TimeSegment";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import { saveToStorage } from "../../utils/storage";
import {
  PersistedCountdownState,
  countdownStorageKey,
  useCountdownState,
} from "./useCountdownState";

// 2 weeks in ms
const frequency = 14 * 24 * 60 * 60 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

export default function CounterScreen() {
  const screen = useWindowDimensions(); // slight improvement over Dimensions.get("window") b/c this updates when the screen updates

  const confettiRef = useRef<any>();
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
        <Text style={[styles.heading]}>Car wash due in...</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>
          Car wash overdue by
        </Text>
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
        <Text style={styles.buttonText}>I've washed the car!</Text>
      </TouchableOpacity>
      <ConfettiCannon
        ref={confettiRef}
        count={50}
        // origin={{ x: Dimensions.get("window").width / 2, y: -30 }}
        origin={{ x: screen.width / 2, y: -30 }}
        fadeOut={true}
        autoStart={false}
      />
    </View>
  );

  async function handleRequestPermissions() {
    const result = await registerForPushNotificationsAsync();
    console.log({ fn: "handleRequestPermissions", result });
    return result;
  }

  async function scheduleNotification() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    confettiRef?.current?.start();
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
        title: "Car wash overdue!",
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
