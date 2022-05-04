import { createStoreProvider, createUseStore } from "react-with-native-store";

type StoreType = {
  loginToken: string | null;
  email: string;
};

export const initialValues: StoreType = {
  loginToken: null,
  email: "",
};

export const StoreProvider = createStoreProvider({ initialValues });
export const useStore = createUseStore(initialValues);

export default useStore;
