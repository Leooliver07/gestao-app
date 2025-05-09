


export function SendMessage() {

    return (
        <div className="flex flex-col items-center bg-gray-100 h-dvh w-full px-4">
           <div>
            {/* if(whatsapp not connected)  show this message*/}
                <h2>Conecte seu whatsapp no menu de configuracoes...
                    <span className="text-blue-500 cursor-pointer">
                        Clique aqui para configurar
                    </span>
                </h2>
            </div>
             {/* if(whatsapp connected)  show this message*/}
             <div>

             </div>
            <div className="flex flex-col items-center bg-white shadow-md rounded-md p-6 mt-4 w-full max-w-md mx-auto">
                <p className="mb-4">Mensagem</p>
                <textarea rows={4}  placeholder="Digite sua mensagem" className=" resize-none border border-gray-300 rounded-md p-2 w-full mb-4 h-36" />
                <button className="bg-blue-500 text-white rounded-md p-2 w-full">Enviar</button>
            </div>
               
                
            
           
        </div>
    )


}