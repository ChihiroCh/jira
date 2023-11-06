import React, { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObiect, useDebounce, useMount } from "utils";
import qs from "qs";

const apiURL = process.env.REACT_API_URL;

const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  useMount(() => {
    fetch(`${apiURL}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 2000);
  const [list, setList] = useState();
  useEffect(() => {
    fetch(
      `${apiURL}/projects?${qs.stringify(cleanObiect(debounceParam))}`,
    ).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, [debounceParam]);
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {/* <List users={users} list={list} /> */}
    </div>
  );
};
export default ProjectList;
