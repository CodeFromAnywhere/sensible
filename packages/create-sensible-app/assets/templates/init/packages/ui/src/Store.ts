import {
  createStoreProvider,
  createUseStore,
} from "react-with-native-store";

type StoreType = {
  loginToken: string | null;
};

export const initialValues: StoreType = {
  loginToken: null,
};

export const StoreProvider = createStoreProvider({ initialValues });
export const useStore = createUseStore(initialValues);

export default useStore;
