import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

export default function ShoppingListItem(props: {
  name: string;
  isCompleted?: boolean;
}) {
  const handleDelete = () => {
    Alert.alert(
      props.name,
      "Are you sure you want to delete this?",
      // "It will be gone for good",
      [
        {
          text: "Delete",
          onPress: () => console.log("Ok, deleting."),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  return (
    <View
      style={[
        styles.itemContainer,
        props.isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          props.isCompleted ? styles.completedText : undefined,
        ]}
      >
        {props.name}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          props.isCompleted ? styles.completedButton : undefined,
        ]}
        onPress={handleDelete}
        hitSlop={20}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colorBlack,
    borderRadius: 6,
    padding: 8,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  completedButton: {
    backgroundColor: theme.colorGrey,
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  completedText: {
    color: theme.colorGrey,
    textDecorationColor: theme.colorGrey,
    textDecorationLine: "line-through",
  },
  itemContainer: {
    alignItems: "center",
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
});
