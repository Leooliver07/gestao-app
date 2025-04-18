import TableData from "../../components/table/Table";
import { MonthsContext } from "../../contexts/MonthsContext"
import { useEffect, useContext } from "react";
import { TableContext } from "../../contexts/TableContext";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-hot-toast";
interface AuthContextType {
    user: { id: string; email: string } | null;
  }
  
export function Home(){
    const {month} = useContext(MonthsContext);
    const {table, refreshTable, setCurrentTable} = useContext(TableContext);
    const tableName = "montagem";
    useEffect(() => {
        const shouldShowToast = localStorage.getItem("showLoginToast");
        if (shouldShowToast) {
            toast.success("Login realizado com sucesso");
            localStorage.removeItem("showLoginToast");
        }
    }, []);   
    
    useEffect(()=>{
        setCurrentTable("montagem");
        refreshTable("montagem");
       },[setCurrentTable, refreshTable]);
   
   const { user } = useContext(AuthContext) as AuthContextType;
     if (!user) {
       return <div className="flex flex-col items-center  mt-20 h-screen">
        <h1 className="text-xl font-medium mb-15 mt-10">Faça login para acessar este conteúdo.</h1>
        <p>	Login teste: teste@teste.com</p>
        <p> Senha: 12341234</p>
        </div>;
     }
    
        return(

            <div className="flex flex-col items-center bg-gray-100 h-dvh w-full">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold mb-15 mt-10">Agenda {month} </h1>
                    </div>
                    <div className="flex items-center justify-center  max-w-xl bg-gray-100">
                        <div className=" bg-gray-100  flex flex-col gap-6">
                            <TableData table={table} filterMonth={month} tableName={tableName}/>
                    
                    </div>

                </div>
                
            </div>
        )
}
