import { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { theme } from "../theme";
import ShoppingListItem from "../components/ShoppingListItem";

type IShoppingListItem = {
  id: string;
  name: string;
};

const initialList: IShoppingListItem[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Milk" },
  { id: "4", name: "Bread" },
  { id: "5", name: "Butter" },
  { id: "6", name: "Eggs" },
  { id: "7", name: "Cheese" },
  { id: "8", name: "Tomatoes" },
  { id: "9", name: "Lettuce" },
  { id: "10", name: "Chicken" },
  { id: "11", name: "Fish" },
  { id: "12", name: "Rice" },
  { id: "13", name: "Pasta" },
  { id: "14", name: "Apples" },
  { id: "15", name: "Bananas" },
  { id: "16", name: "Oranges" },
];

export default function App() {
  const [shoppingList, setShoppingList] = useState(initialList);
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        value={value}
        style={styles.textInput}
        onChangeText={setValue}
        placeholder="E.g Coffee"
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      {shoppingList.map((item) => (
        <ShoppingListItem key={item.id} name={item.name} />
      ))}
    </ScrollView>
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
});
