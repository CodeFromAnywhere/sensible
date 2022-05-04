import { createStoreProvider, createUseStore } from "react-with-native-store";

type StoreType = {
  key1: YourType | null;
  key2: string | null;
};

export const initialValues: StoreType = {
  key1: null,
  key2: null,
};

export const StoreProvider = createStoreProvider({ initialValues });
export const useStore = createUseStore(initialValues);
export default useStore;
