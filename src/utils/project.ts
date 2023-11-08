import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { cleanObiect, useDebounce } from "utils";

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObiect(param || {}) });
  }, [param]);
  return result;
};
