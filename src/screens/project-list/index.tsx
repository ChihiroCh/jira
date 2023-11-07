import React, { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObiect, useDebounce, useMount } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";

const apiURL = process.env.REACT_API_URL;

const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const client = useHttp();
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  useMount(() => {
    client("users").then((data) => setUsers(data));
  });
  const debounceParam = useDebounce(param, 2000);
  useEffect(() => {
    client("projects", { data: cleanObiect(debounceParam) }).then(setList);
  }, [debounceParam]);
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
export default ProjectList;
