import { StyleSheet, View } from "react-native";
import ShoppingListItem from "./components/ShoppingListItem";
import { theme } from "./theme";

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name="coffee" />
      <ShoppingListItem name="tea" />
      <ShoppingListItem name="sugar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
});
