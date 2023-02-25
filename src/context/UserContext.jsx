import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { checkUserIsLoggedIn, login, logout } from "../api/firebase";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    checkUserIsLoggedIn((user) => {
      setUser(user);
    });
  }, []);
  return (
    <UserContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
      // useEffect를 통해 user 업데이트, 업데이트 이전에는 user값이 없으므로 uid로 undefined 넘겨 줌.
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
