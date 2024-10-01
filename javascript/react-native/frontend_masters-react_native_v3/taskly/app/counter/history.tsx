import { Text, View, StyleSheet, FlatList } from "react-native";
import { useCountdownState } from "./useCountdownState";
import { format } from "date-fns";
import { theme } from "../../theme";

const fullDataFormat = "LLL d yyyy, h:mm aaa";

export default function HistoryScreen() {
  const [countdownState] = useCountdownState();

  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: theme.colorWhite,
      }}
      contentContainerStyle={{
        marginTop: 8,
      }}
      data={countdownState?.complatedAtTimestamps}
      renderItem={({ item }) => (
        <View
          style={{
            marginHorizontal: 8,
            marginBottom: 8,
            alignItems: "center",
            backgroundColor: theme.colorLightGrey,
            padding: 12,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {format(item, fullDataFormat)}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 18,
            backgroundColor: "red",
          }}
        >
          <Text>No history</Text>
        </View>
      }
    />
  );
}
