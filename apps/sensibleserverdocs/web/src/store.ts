import { createStoreProvider, createUseStore } from "react-with-native-store";

type StoreType = {
  recentSites: string[];
};

export const initialValues: StoreType = {
  recentSites: [],
};

export const StoreProvider = createStoreProvider({ initialValues });
export const useStore = createUseStore(initialValues);
export default useStore;
