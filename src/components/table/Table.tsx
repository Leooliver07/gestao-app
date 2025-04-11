import {  useContext, useMemo, useState } from "react";
import { TableContext } from "../../contexts/TableContext";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/edit.png";
import contractIcon from "../../assets/contract.png";
import { supabase } from "../../services/supabaseClient";

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
interface TableDataProps {
    filterMonth?: string | null;
    filterDate?: string | null;
    table?: Table[];
    onDeleteProp?: (id: number, tableName: string) => void;
    
}
export function TableData({filterMonth, filterDate, table, }: TableDataProps) {
    const {table : contextTable} = useContext(TableContext);
    const [activeCardId, setActiveCardId] = useState<number | null>(null);
   
    const dataSource = table || contextTable;
    
    const filteredTable = useMemo(()=>{
        let result = [...dataSource];
            
        if(filterDate){
            result = result.filter(item => item.date === filterDate);
        }
            
        else if(filterMonth){

            const monthMap: Record<string, string> = {
                'Janeiro': '01',
                'Fevereiro': '02',
                'Março': '03',
                'Abril': '04',
                'Maio': '05',
                'Junho': '06',
                'Julho': '07',
                'Agosto': '08',
                'Setembro': '09',
                'Outubro': '10',
                'Novembro': '11',
                'Dezembro': '12'
            }

            const monthNumber = monthMap[filterMonth];
            if (monthNumber){
                result = result.filter(item => item.date.substring(5, 7) === monthNumber);  
            
            }

        }
        return result;
        
    },[dataSource, filterDate, filterMonth])

  
    const formatDate = (dateString: string) => {
        if(!dateString) return "";
        const [year, month, day] = dateString.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        // Formata a data no formato "dd/mm/yyyy"
        return date.toLocaleDateString('pt-BR')

    }
  
    if(filteredTable.length === 0){
        if (filterDate){
            return <div>Nenhum dado encontrado para a data {filterDate}</div>
        } else if (filterMonth){
            return <div>Nenhum dado encontrado para o mês de {filterMonth}</div>
        } else {
            return <div>Nenhum dado encontrado</div>
        }
        
    }

    function toggleCard(id: number) {
        setActiveCardId(prev => prev === id ? null : id);
    }

    //Funcao para excluir item do supabase
    
    async function handleDelete(id: number) {
        const {error} = await supabase.from('montagem').delete().eq('id', id);
        if (error) {
            console.error('Erro ao excluir o item:', error.message);
        }
        else {
            console.log('Item excluído com sucesso!');
        }
        // Atualizar a tabela após a exclusão   
        const {error: fetchError} = await supabase.from('montagem').select('*');
        if (fetchError) { 
            console.error('Erro ao buscar os dados atualizados:', fetchError.message);
        }
        else {
            console.log('Dados atualizados com sucesso!');
        }
    }
    // ✏️ Editar item
    async function handleEdit(id: number) { 
        const {error} = await supabase.from('table').update({}).eq('id', id);
        if (error) {
            console.error('Erro ao editar o item:', error.message);
        }
        else {
            console.log('Item editado com sucesso!');
        }
    }
    return(
        
           <div className="bg-gray-100 w-full">
                <div className="hidden sm:block w-full">
                    <table className="table-auto w-full bg-pink-50 shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-pink-200 text-gray-700 text-center">
                        <th className="py-3 px-6 border-b border-pink-300">Data</th>
                        <th className="py-3 px-6 border-b border-pink-300">Cliente</th>
                        <th className="py-3 px-6 border-b border-pink-300">Tema</th>
                        <th className="py-3 px-6 border-b border-pink-300">Local</th>
                        <th className="py-3 px-6 border-b border-pink-300">Preço</th>
                        <th className="py-3 px-6 border-b border-pink-300">Custo</th>
                        <th className="py-3 px-6 border-b border-pink-300">Lucro</th>
                        <th className="py-3 px-6 border-b border-pink-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTable.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-pink-100 transition-colors duration-200"
                        >
                            <td className="py-3 px-6 text-center border-b border-pink-300">
                            {formatDate(row.date)}
                            </td>
                            <td className="py-3 px-6 text-center border-b border-pink-300">
                            {row.client}
                            </td>
                            <td className="py-3 px-6 text-center border-b border-pink-300">
                            {row.theme}
                            </td>
                            <td className="py-3 px-6 text-center border-b border-pink-300">
                            {row.location}
                            </td>
                            <td className="py-3 px-6 text-center border-b border-pink-300">
                            R${row.price}
                            </td>
                            <td className="py-3 px-6 text-center border-b border-pink-300">
                            R${row.cost}
                            </td>
                            <td className="py-3 px-6 text-center border-b border-pink-300">
                            R${row.profit}
                            </td>
                            <td className="text-center border-b border-pink-300">
                            <span className="inline-block mx-1">
                                <img
                                className="w-4 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
                                onClick={() => handleDelete(row.id)}
                                src={deleteIcon}
                                alt="Excluir"
                                />
                            </span>
                            <span className="inline-block mx-1">
                                <img
                                className="w-4 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
                                onClick={() => handleEdit(row.id)}
                                src={editIcon}
                                alt="Editar"
                                />
                            </span>
                            <span className="inline-block mx-1">
                                <img
                                className="w-4 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
                                onClick={() => {/* Implemente a função para gerar contrato PDF */}
                                }
                                src={contractIcon}
                                alt="Contrato"
                                />
                            </span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                <div className="block sm:hidden bg-gray-100 border-none shadow-none w-full">
        
                    {filteredTable.map((row) => (
                        <div key={row.id} className="relative flex  mb-10 w-full">
                            <div
                                onClick={() => toggleCard(row.id)}
                               className="border-2 border-gray-500 rounded-lg  p-5 bg-pink-50 shadow-lg shadow-pink-200 cursor-pointer w-full ">
                                <div className="font-bold">Data: {formatDate(row.date)}</div>
                                <div>Cliente: {row.client}</div>
                                <div>Tema: {row.theme}</div>
                                <div>Local: {row.location}</div>
                                <div>Preço: R${row.price}</div>
                                <div>Custo: R${row.cost}</div>
                            </div>
                            <div 
                                className={`absolute right-0 top-0 border-2 h-full border-l-0 minWidth: 'auto'  border-gray-500 rounded-lg p-3
                                 flex flex-col justify-center gap-5  bg-pink-50 shadow-lg shadow-pink-200 transition-all duration-700 ease-in-out 
                                 ${activeCardId === row.id ? "opacity-100 translate-x-full" : "opacity-0 translate-x-0 pointer-events-none"}`}
                                >                                
                                <span><img className="w-5 h-6 cursor-pointer  hover:scale-110 hover:transition-all duration-500" onClick={()=> handleDelete(row.id)}  src={deleteIcon} alt="trash" /></span>
                                <span><img className="w-5 h-6 cursor-pointer hover:scale-110 hover:transition-all duration-500" onClick={()=> handleEdit(row.id)} src={editIcon} alt="edit" /></span> 
                                <span><img className="w-5 h-6 cursor-pointer hover:scale-110 hover:transition-all duration-500"  src={contractIcon} alt="contract" /></span>
                            </div>
                        </div>
                        ))}

                </div>
            </div>
           
        
    )
}
export default TableData;
