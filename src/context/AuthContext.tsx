import React, { useEffect } from "react";
import { ENDPOINTS } from "../constants/endpoints";
import useAxios from "../hooks/useAxios";
import { authManager } from "../services/authManager";

type UserData = {
  email?: string;
  token: string | null;
};

interface AuthContextType {
  user: UserData;
  signIn: (user: UserData, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}
export const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const axios = useAxios();

  let [user, setUser] = React.useState<UserData>({
    email: "",
    token: authManager.get(),
  });

  const pingServer = () => {
    if(window.location.pathname === '/login') return;
    axios
    .get(ENDPOINTS.ping)
    .catch((err) => {
        if(err.response.status === 403){
            setUser({token: null});
            authManager.clear();
        }
    });
  }

  useEffect(() => {
    console.log('entrou aqui')
    pingServer();
    const interval = setInterval(() => {
      if(!authManager.get()) return;
      pingServer();
    }, 60000 * 10);
    return () => clearInterval(interval);
  });

  let signIn = (user: UserData, callback: VoidFunction) => {
    setUser(user);
    authManager.set(user.token!);
    callback();
  };

  let signOut = (callback: VoidFunction) => {
    setUser({token: null});
    authManager.clear();
    callback();
  };

  let value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;


