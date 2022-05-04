import { useQuery } from "react-query";
import useStore from "../Store";
import { api } from "../appApi";

export const useMe = () => {
  const [loginToken] = useStore("loginToken");
  return useQuery(
    ["me", loginToken],
    () => {
      if (loginToken) {
        return api("me", "GET", { loginToken: loginToken! });
      } else {
        return null;
      }
    },
    { enabled: !!loginToken }
  );
};
