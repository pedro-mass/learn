import { StyleSheet, View } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Link
        href="/counter"
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to /counter
      </Link>
      <ShoppingListItem name="coffee" />
      <ShoppingListItem name="tea" isCompleted />
      <ShoppingListItem name="sugar" isCompleted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
    justifyContent: "center",
  },
});
