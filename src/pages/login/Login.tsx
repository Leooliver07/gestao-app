import { useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import {supabase } from "../../services/supabaseClient";


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    async function signIn(email: string, password: string){
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            toast.error(error.message)
        }else{
            
            navigate("/")
        }
    
    }
    return(
        <>
        
            <div className="mt-20 text-2xl font-bold text-center">
                <h1>Login</h1>
            </div>
            <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-center mt-10">
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="border border-gray-300 rounded-md p-2 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="border border-gray-300 rounded-md p-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    type="submit"
                    className="bg-pink-500 text-white rounded-md p-2"
                    onClick={() => signIn(email, password)}
                >
                    Login
                </button>
            </form>
        
        </>
    )
}


export default Login;
