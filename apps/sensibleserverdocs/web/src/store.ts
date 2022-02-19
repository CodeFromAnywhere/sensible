import { createStoreProvider, createUseStore } from "react-with-native-store";

type Site = {
  apiUrl: string;
  appName?: string;
  domain?: string;
  email?: string;
};
type StoreType = {
  recentSites: Site[];
  darkMode: boolean;
  collapsedModels: string[];
};

export const initialValues: StoreType = {
  recentSites: [],
  darkMode: false,
  collapsedModels: [],
};

export const StoreProvider = createStoreProvider({
  initialValues,
  baseKey: "sensible-docs",
});
export const useStore = createUseStore(initialValues);
export default useStore;
