import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData<T>(key: string, data: T) {
  try {
    const stringifiedData = JSON.stringify(data);
    await AsyncStorage.setItem(key, stringifiedData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function removeData(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
