import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme";

export default function ShoppingListItem(props: {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onPress: () => void;
}) {
  const handleDelete = () => {
    Alert.alert(
      props.name,
      "Are you sure you want to delete this?",
      // "It will be gone for good",
      [
        {
          text: "Delete",
          onPress: () => props.onDelete(),
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
    <Pressable
      style={[
        styles.itemContainer,
        props.isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={props.onPress}
    >
      <View style={styles.row}>
        <Entypo
          name={props.isCompleted ? "check" : "circle"}
          size={24}
          color={props.isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          style={[
            styles.itemText,
            props.isCompleted ? styles.completedText : undefined,
          ]}
        >
          {props.name}
        </Text>
      </View>
      <TouchableOpacity hitSlop={20} onPress={handleDelete}>
        <AntDesign
          name="closecircle"
          size={24}
          color={props.isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
    marginLeft: 8,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});
