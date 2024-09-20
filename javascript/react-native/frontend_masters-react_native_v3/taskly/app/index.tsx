import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View, Text } from "react-native";
import { theme } from "../theme";
import ShoppingListItem from "../components/ShoppingListItem";

type IShoppingListItem = {
  id: string;
  name: string;
};

export default function App() {
  const [shoppingList, setShoppingList] = useState<IShoppingListItem[]>([]);
  const [value, setValue] = useState<string>();

  const handleSubmit = () => {
    if (!value) return;

    const newShoppingList = [
      { id: new Date().toISOString(), name: value },
      ...shoppingList,
    ];

    setShoppingList(newShoppingList);
    setValue(undefined);
  };

  return (
    <FlatList
      ListHeaderComponent={
        <TextInput
          value={value}
          style={styles.textInput}
          onChangeText={setValue}
          placeholder="E.g Coffee"
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      }
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      data={shoppingList}
      renderItem={({ item }) => <ShoppingListItem name={item.name} />}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
    paddingTop: 12,
  },
  contentContainer: {
    paddingTop: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    fontSize: 18,
    borderRadius: 50,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: theme.colorWhite,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
