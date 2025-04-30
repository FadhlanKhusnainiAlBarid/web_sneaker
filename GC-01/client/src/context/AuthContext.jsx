import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: null,
  loading: false,
});

export default function AuthContextProvider({ children }) {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      console.log(userData);
      if (userData) {
        setuser(userData);
      } else {
        setuser(null);
      }
      setloading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
