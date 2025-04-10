/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js"; // Import User type from Supabase
import { supabase } from "../services/supabaseClient"; // Import your Supabase client instance
import { ReactNode } from "react";

import { toast } from "react-hot-toast";

export const AuthContext = createContext({user:null} as AuthContextType);

interface AuthContextType {
    user: User | null;
    // ... other properties if any
}






export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
   

    useEffect(() => {
        // Listener para mudanças no estado de autenticação
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);

            // Opcional: Adicionar redirecionamento e feedback ao usuário
            if (event === "SIGNED_IN") {
                const shouldShowToast = localStorage.getItem("showLoginToast")
                if (shouldShowToast) {
                    toast.success("Login realizado com sucesso");
                    localStorage.removeItem("showLoginToast"); // Remove o item após mostrar o toast
                    
                }
                
            } else if (event === "SIGNED_OUT") {
                toast.success("Logout realizado com sucesso");
                
            }
        });

        // Cleanup: Cancela a inscrição no listener
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};