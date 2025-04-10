import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";


interface Table {
    id: number;
    date: string;
    client: string;
    theme: string;
    location: string;
    price: number | null;
    cost: number | null;
    profit: number;
}

interface TableContextData {
    table: Table[];
    refreshTable: (tableName: string) => void;
    currentTable: string;
    setCurrentTable: (tableName: string) => void;
}

interface TableProviderProps {
    children: ReactNode;
}


export const TableContext = createContext({} as TableContextData);

export function TableProvider({children} : TableProviderProps){

    const [table, setTable] = useState<Table[]>([])
    const [currentTable, setCurrentTable] = useState<string>("montagem");
    
    async function getDataTable(tableName: string){
        try{
            const {data, error} = await supabase
            .from(tableName)
            .select('*')
            .order('date', {ascending: true});
            if(error){
                throw error;
            }
           
            setTable(data || []);
           

        }catch(error){
            console.error("Dados nao disponiveis", error)
        }

        
    }
     useEffect(()=>{
         getDataTable(currentTable);
     
    
     //Real time subscription, watch the change on database
         const subscription = supabase
             .channel(`public: ${currentTable}`)
             .on("postgres_changes",{event: "*", schema: "public", table: currentTable}, payload => {
                 console.log("Change...", payload);
                 getDataTable(currentTable);
             })
             .subscribe();
 
         return () => {
             subscription.unsubscribe();
         }
     }, [currentTable]);
     
     const refreshTable = (tableName: string) => {
         getDataTable(tableName);
     }

     
 
     return(
        <TableContext.Provider value={{table, refreshTable, currentTable, setCurrentTable}}>
            {children}

        </TableContext.Provider>
    )
}

 
export default TableProvider;