
import logo from "../../assets/logotwo.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MonthsContext } from "../../contexts/MonthsContext";
import { MonthsMenu } from "../../contexts/MonthsContext";
import { AuthContext } from "../../contexts/AuthContext";
import { supabase } from "../../services/supabaseClient";
import toast from "react-hot-toast";



export function Header(){
    const {setMonth} = useContext(MonthsContext);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate()


    async function logout(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) {
          toast.error(error.message);
        } else {
           
            navigate("/login");
        }
      };
      

    return(
        
            <div className="flex flex-col  bg-pink-300 h-22 mb-5">
                <header className=" my-3 flex flex-row  justify-between items-center">
                    <MonthsMenu/>
                       
                    
                    <div>
                        <Link to="/">
                            <img src={logo} alt=""
                            onClick={()=>setMonth("")}
                            
                            />
                        </Link>
                    </div>
                    {user ? (
                        <div className="mr-5">
                            <span className="font-semibold text-black cursor-pointer"
                            onClick={logout}
                            >
                                Sair</span>
                            
                        </div>
                    ): (

                     <div className="mr-5">
                            <span className="font-semibold text-black cursor-pointer"
                           onClick={() => {
                                navigate("/login");
                            }
                            }
                            >Entrar</span>
                            
                        </div>
                    )}
                
                </header>
                <nav className="flex flex-row bg-pink-200 p-2 rounded-b-sm ">
                    <ul className="flex flex-row justify-around mx-auto gap-6">
                       <Link to="/cadastro"><li>Cadastro</li></Link> 
                       <Link to="/dashboard"><li>Dashboard</li></Link> 
                       <Link to="/controle"><li>Pegue & monte</li></Link>
                    </ul>
                </nav>
               
            </div>
        
        
    )
}

export default Header;
