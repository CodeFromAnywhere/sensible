import { createStoreProvider, createUseStore } from "react-with-native-store";

type StoreType = {
  name: string | null;
};

export const initialValues: StoreType = {
  name: null,
};

export const StoreProvider = createStoreProvider({ initialValues });
export const useStore = createUseStore(initialValues);
export default useStore;
