import { createStoreProvider, createUseStore } from "react-with-native-store";

type ApiUrl = string;
type Site = {
  apiUrl: string;
  appName?: string;
  domain?: string;
  email?: string;
};
type StoreType = {
  recentSites: Site[];
  darkMode: boolean;
  collapsedModels: { [key: ApiUrl]: string[] };
  expandedTypes: { [key: ApiUrl]: string[] };
};

export const initialValues: StoreType = {
  recentSites: [],
  darkMode: false,
  collapsedModels: {},
  expandedTypes: {},
};

export const StoreProvider = createStoreProvider({
  initialValues,
  baseKey: "sensibledocs2",
});
export const useStore = createUseStore(initialValues);
export default useStore;
