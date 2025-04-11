import { createContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../services/supabaseClient";
import { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({ user: null } as AuthContextType);

interface AuthContextType {
  user: User | null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedRoute, setCheckedRoute] = useState(false); // novo controle
  const location = useLocation();
  const navigate = useNavigate();

  // Busca sessão ao iniciar
  useEffect(() => {
      const fetchData = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user ?? null);
    setLoading(false);
  };

  fetchData();

  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
    setLoading(false);
  });

  return () => {
    authListener.subscription.unsubscribe();
  };
}, []);;

  // Listener de login/logout
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);

      if (event === "SIGNED_IN") {
        const shouldShowToast = localStorage.getItem("showLoginToast");
        if (shouldShowToast) {
          toast.success("Login realizado com sucesso");
          localStorage.removeItem("showLoginToast");
        }
      } else if (event === "SIGNED_OUT") {
        toast.success("Logout realizado com sucesso");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Remove o token ao fechar aba
  

  // Protege rota e exibe toast
  useEffect(() => {
    if (!loading && !user && location.pathname !== "/login") {
      if (!checkedRoute) {
        
        setCheckedRoute(true); // impede múltiplas execuções
        navigate("/login", { replace: true });
      }
    } else if (user) {
      setCheckedRoute(false); // reseta controle ao logar
    }
  }, [user, loading, location.pathname, checkedRoute, navigate]);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
