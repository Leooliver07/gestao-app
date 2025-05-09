
import { useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { SendMessage } from "../../components/sendMessage/sendMessage";
import { ImportContact } from "../../components/importcontact";
interface AuthContextType {
    user: { id: string; email: string } | null;
  }
  
export function Home(){
    
    
    useEffect(() => {
        const shouldShowToast = localStorage.getItem("showLoginToast");
        if (shouldShowToast) {
            toast.success("Login realizado com sucesso");
            localStorage.removeItem("showLoginToast");
        }
    }, []);   
    
   
   
   const { user } = useContext(AuthContext) as AuthContextType;
     if (!user) {
       return <div className="flex flex-col items-center  mt-20 h-screen">
        <h1 className="text-xl font-medium mb-15 mt-10">Faça login para acessar este conteúdo.</h1>
        <p>	Login teste: teste@teste.com</p>
        <p> Senha: 12341234</p>
        </div>;
     }
    
        return (
          <div className="flex flex-col items-center bg-gray-100 h-dvh w-full">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold mb-15 mt-10">
                Disparo de mensagens{" "}
              </h1>
            </div>
            <div className="flex items-center justify-center  max-w-xl bg-gray-100">
              
              <div className=" bg-gray-100  flex flex-col gap-6">
                <div className="px-4">
                {/* if(whatsapp not connected)  show this message*/}
                <h2>
                  Conecte seu whatsapp no menu de configuracoes...
                  <span className="text-blue-500 cursor-pointer">
                    Clique aqui para configurar
                  </span>
                </h2>
              </div>
                <ImportContact />

                <SendMessage />
              </div>
            </div>
          </div>
        );
}
