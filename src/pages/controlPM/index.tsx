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
                    <TableData table={table} filterDate={selectedDate}></TableData>
                </div>
            </div>
        </>
    )}
    return (
        <div className="flex justify-center mt-20 h-screen">
            <h1 className="text-2xl font-bold">Você não está logado</h1>
        </div>
    )
}