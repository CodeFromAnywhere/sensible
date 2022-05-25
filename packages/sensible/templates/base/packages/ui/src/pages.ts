import menu from "./pages/menu";
import index from "./pages/index";
import form from "./pages/form";
import utilities from "./pages/utilities";
import login from "./pages/login";
import signup from "./pages/signup";
import messages from "./pages/messages";
import { PageType } from "./types";
import users from "./pages/users";

// here we create an object containing all our pages
export const pagesObject = {
  menu,
  index,
  form,
  utilities,
  login,
  signup,
  messages,
  users,
};
// based on this, a type is created for all page keys
type PageKey = keyof typeof pagesObject;
// these keys are put in an array
const pageKeys = Object.keys(pagesObject) as PageKey[];
// then we generate an PageType object for every page,
// based on the pagesObject and the pageKey, and put the result in an array
export const pages: PageType[] = pageKeys.map((pageKey) => ({
  ...pagesObject[pageKey].options,
  component: pagesObject[pageKey],
  key: pageKey,
}));
/**
 * utility function to get a title from a page
 */
export const getPageTitle = (page: PageType) =>
  page.title || page.key.charAt(0).toUpperCase().concat(page.key.slice(1));

export default pages;
