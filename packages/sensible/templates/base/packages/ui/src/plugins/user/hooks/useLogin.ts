import { MeUserType } from "core";
import { DefaultResponse } from "sensible-core";
import { useNavigation } from "@react-navigation/native";
import { UseQueryResult } from "react-query";
import useStore from "../Store";
import { resetStackTo } from "../Util";
import { useMe } from "./useMe";

export type LoginResponse = {
  loginToken: string | null;
  setLoginToken: (loginToken: string | null) => void;
  me: UseQueryResult<
    | ({
        me?: MeUserType | undefined;
        loginToken?: string | undefined;
      } & DefaultResponse)
    | null,
    unknown
  >;
  isLoggedIn: boolean;
  setLogin: (loginToken: string | null) => void;
};

export const useLogin = (): LoginResponse => {
  const [loginToken, setLoginToken] = useStore("loginToken");
  const me = useMe();
  const navigation = useNavigation<any>();
  const isLoggedIn = !!loginToken;

  const setLogin = (loginToken: string | null) => {
    setLoginToken(loginToken);
    if (!loginToken) {
      me.remove();
    }
    resetStackTo(loginToken ? "MenuScreen" : "LoginScreen", navigation);
  };

  return { loginToken, setLoginToken, setLogin, me, isLoggedIn };
};

export const useLoader = (): boolean => {
  const [loginToken] = useStore("loginToken");
  const isLoggedIn = !!loginToken;
  const me = useMe();
  if (me.data?.me && isLoggedIn) {
    return true;
  }
  return false;
};
