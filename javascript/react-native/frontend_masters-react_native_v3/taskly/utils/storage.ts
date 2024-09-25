import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) return null;

    return JSON.parse(data);
  } catch (e) {
    console.error(e, { fn: "getFromStorage" });
    return null;
  }
}

export async function saveToStorage(key: string, value: object) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(e, { fn: "saveToStorage" });
  }
  return false;
}
