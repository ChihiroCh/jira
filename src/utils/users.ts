import { User } from "screens/project-list/search-panel";
import { useAsync } from "./use-async";
import { cleanObiect } from "utils";
import { useHttp } from "./http";
import { useEffect } from "react";

export const useUser = (param: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useEffect(() => {
    client("users", { data: cleanObiect(param || {}) });
  }, [param]);
  return result;
};
