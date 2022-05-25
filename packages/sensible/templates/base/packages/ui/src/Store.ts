import { createStoreProvider, createUseStore } from "react-with-native-store";

type StoreType = {
  name: string | null;
  email: string | null;
};

export const initialValues: StoreType = {
  name: null,
  email: null,
};

export const StoreProvider = createStoreProvider({
  initialValues,
  baseKey: "test",
});
export const useStore = createUseStore(initialValues);
export default useStore;
