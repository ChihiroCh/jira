import React, { ReactNode, useContext, useState } from "react";
import * as auth from "../auth-provider";
import { User } from "../screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (FormData: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
      register: (FormData: AuthForm) => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | User>(null);
  const login = (FormData: AuthForm) => auth.login(FormData).then(setUser);
  const register = (FormData: AuthForm) =>
    auth.register(FormData).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  useMount(() => {
    bootstrapUser().then(setUser);
  });
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, logout, register }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须要在AuthProvider中使用");
  }
  return context;
};
