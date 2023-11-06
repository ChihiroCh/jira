import qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "context/auth-context";
import { type } from "os";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {},
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        auth.logout();
        window.location.reload();
        return Promise.reject({ msg: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

//类型别名在很多情况下可以和interface互换
// interface Person{
//   name: string
// }
// type Person = {name:  string}

//类型别名，interface 在这种情况下无法替代
type FavirNum = string | number;

//interface也无法实现Untility type
type Person = {
  name: string;
  age: number;
};
const xiaoming: Partial<Person> = {};
// const shengmiren: Omit<Person,'name'> = {age: 21}
const shengmiren: Omit<Person, "name" | "age"> = {};
type PersonKeys = keyof Person;
type PersonOnlyName = Pick<Person, "name">;
type Age = Exclude<PersonKeys, "name">;

// Partial的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};
