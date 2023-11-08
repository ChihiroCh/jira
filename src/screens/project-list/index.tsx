import React, { useEffect, useState } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObiect, useDebounce, useMount } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";
import { useProjects } from "utils/project";
import { Helmet } from "react-helmet";

const apiURL = process.env.REACT_API_URL;

const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const client = useHttp();
  const [users, setUsers] = useState([]);
  // const [list, setList] = useState([]);
  useMount(() => {
    client("users").then((data) => setUsers(data));
  });
  const debounceParam = useDebounce(param, 2000);
  const { isLoading, isError, data: list } = useProjects(debounceParam);
  return (
    <div>
      <Helmet>
        <title>项目列表</title>
      </Helmet>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} dataSource={list || []} loading={isLoading} />
    </div>
  );
};
export default ProjectList;
