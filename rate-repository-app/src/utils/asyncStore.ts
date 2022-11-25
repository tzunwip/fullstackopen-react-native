import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setStore<T>(key: string, data: T) {
  try {
    const stringifiedData = JSON.stringify(data);
    await AsyncStorage.setItem(key, stringifiedData);
  } catch (error: unknown) {
    if (error instanceof Error) throw Error(error.message);
  }
}

export async function removeStore(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error: unknown) {
    if (error instanceof Error) throw Error(error.message);
  }
}

export async function getStore(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error: unknown) {
    if (error instanceof Error) throw Error(error.message);
  }
}
