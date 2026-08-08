import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setUser("admin");
    }

    setLoading(false);

  }, []);

  const signIn = async (email: string, password: string) => {

    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", response.data.token);

    setUser(email);
  };

  const signOut = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}