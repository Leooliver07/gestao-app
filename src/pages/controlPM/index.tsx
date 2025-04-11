import Calendar from "../../components/calendar";
import TableData from "../../components/table/Table";
import { useEffect, useContext, useState } from "react";
import { TableContext } from "../../contexts/TableContext";
import { AuthContext } from "../../contexts/AuthContext";


interface AuthContextType {
    user: { id: string; email: string } | null;
  }

export function Controle(){
    const {table, refreshTable, setCurrentTable} = useContext(TableContext);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const { user } = useContext(AuthContext) as AuthContextType;
    const tableName = "PM";

   
    useEffect(()=>{
        setCurrentTable("PM");
        refreshTable("PM");
    },[setCurrentTable, refreshTable])
    
    if(user){

    return(
        <>
            <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-10">Pegue e monte</h1>
                <div>
                    <Calendar onDateSelect={setSelectedDate}></Calendar>
                </div>
                <div className="mt-10">
                    <TableData table={table} filterDate={selectedDate} tableName={tableName}></TableData>
                </div>
            </div>
        </>
    )}
    return (
        <>
            <div className="flex flex-col items-center mt-20 text-lg font-medium h-screen">
                
                <h2>Faça login para acessar este conteúdo.</h2>
                <p className="text-sm">Login: teste@teste.com</p>
                <p className="text-sm">Senha: 12341234</p>
            </div>
            
        </>
    )
}