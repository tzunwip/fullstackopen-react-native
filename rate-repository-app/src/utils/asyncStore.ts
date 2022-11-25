import AsyncStorage from "@react-native-async-storage/async-storage";

type Key = "accessToken";

export async function setStore<T>(key: Key, data: T) {
  try {
    const stringifiedData = JSON.stringify(data);
    await AsyncStorage.setItem(key, stringifiedData);
  } catch (error: unknown) {
    if (error instanceof Error) throw Error(error.message);
  }
}

export async function removeStore(key: Key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error: unknown) {
    if (error instanceof Error) throw Error(error.message);
  }
}

export async function getStore(key: Key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) return JSON.parse(value);
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) throw Error(error.message);
  }
}
