import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../config/firebase";

export const AuthContext = createContext({
  user: null,
  name: null,
  role: null,
  loading: false,
});

export default function AuthContextProvider({ children }) {
  const [user, setuser] = useState(null);
  const [name, setname] = useState(null);
  const [role, setrole] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        const getUser = async () => {
          try {
            const response = await getDoc(doc(db, "users", userData.uid));
            setuser(userData);
            setname(response.data().name);
            setrole(response.data().role);
          } catch (error) {
            console.error(error);
          }
        };
        getUser();
      } else {
        setuser(null);
      }
      setloading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const value = { user, name, role, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
