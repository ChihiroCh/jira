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
    // fetch(`${apiURL}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });
  const debounceParam = useDebounce(param, 2000);
  useEffect(() => {
    client("projects", { data: cleanObiect(debounceParam) }).then(setList);
    // fetch(
    //   `${apiURL}/projects?${qs.stringify(cleanObiect(debounceParam))}`,
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
  }, [debounceParam]);
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
export default ProjectList;
