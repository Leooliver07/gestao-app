import { useContext, useCallback, useEffect } from "react";
import { createContext, useRef, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";

interface MonthsContextData {
    month: string;
    setMonth: (month: string) => void;
    toggleMenu: () => void;
    isMenuOpen: boolean;
   
   
}
interface MonthsContextProviderProps {
    children: ReactNode;
}



export const MonthsContext = createContext({} as MonthsContextData);

export function MonthsContextProvider({ children } : MonthsContextProviderProps) {  
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    
    const [month, setMonth] = useState<string>("");

    const toggleMenu = useCallback(()=>{
        setIsMenuOpen(prev => !prev);
    },[])

    return(
        <MonthsContext.Provider 
            value={{ month,
                     setMonth,
                    toggleMenu,
                     isMenuOpen,
                     
                     
             }}>
            {children}
        </MonthsContext.Provider>
    )
}

    
   
   

export function MonthsMenu(){
    const {setMonth, toggleMenu, isMenuOpen } = useContext(MonthsContext);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);



    
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"
        , "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const handleMonthClick = (selectedMonth: string)=>{
        setMonth(selectedMonth);
        toggleMenu();
        navigate("/");

    
    }

   
    
    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent)=>{
            if(
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)&&
                hamburgerRef.current && 
                !(hamburgerRef.current as HTMLElement).contains(event.target as Node)
                ){
                if(isMenuOpen) toggleMenu();
            }
 
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[isMenuOpen, toggleMenu])

          
    return(
          <div className="ml-4">
                    <div ref={hamburgerRef}>
                    
                        <Hamburger 
                            toggled={isMenuOpen}
                            toggle={toggleMenu}
                            color="#000"
                        />
                    </div>
                        {isMenuOpen && (

                            <div 
                                ref={menuRef}
                                className="fixed top-20 left-0 rounded-sm bg-pink-200 p-6 "
                             >
                            <ul className="flex flex-col gap-2">
                                {months.map((monthName)=>(
                                    <li 
                                        key={monthName}
                                        onClick={()=>handleMonthClick(monthName)}
                                        className="cursor-pointer hover:text-pink-700"
                                        value={monthName}
                                    >
                                        {monthName}
                                    </li>
                                ))}     
                               </ul>
                        </div>
                )}   
                </div>
          )
}

export default MonthsContextProvider;

