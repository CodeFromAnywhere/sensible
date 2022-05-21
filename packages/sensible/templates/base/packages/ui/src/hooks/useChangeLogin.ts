import { useEffect } from "react";
import { LoginResponse } from "./useLogin";

export const useChangeLogin = ({ me, setLoginToken }: LoginResponse) => {
  useEffect(() => {
    if (!me.isLoading && me.isFetched) {
      if (me.data?.me) {
        //this is normal.
      } else {
        //loginToken doesn't work anymore
        setLoginToken(null);
      }
    }
  }, [me.isLoading, me.isFetched, me.data]);
};
