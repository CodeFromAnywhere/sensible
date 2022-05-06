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
  collapsedMenus: { [keuy: ApiUrl]: string[] };
  expandedTypes: { [key: ApiUrl]: string[] };
  showMenuMobile: boolean;
};

export const initialValues: StoreType = {
  recentSites: [],
  darkMode: false,
  collapsedModels: {},
  collapsedMenus: {},
  expandedTypes: {},
  showMenuMobile: false,
};

export const StoreProvider = createStoreProvider({
  initialValues,
  baseKey: "rest",
});
export const useStore = createUseStore(initialValues);
export default useStore;
