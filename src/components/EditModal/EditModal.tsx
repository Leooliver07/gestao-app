import { useEffect, useState } from 'react';
import {Input} from "../input/input";



interface AgendaData {
  id: number; // Será gerado automaticamente pelo Supabase
  client: string;
  cpf: string;
  phone: string;
  location: string;
  theme: string;
  price: number | null;
  cost: number | null;
  date: string;
  profit: number;
  serviceType: "montagem" | "PM";
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AgendaData
  onSave: (updatedData: AgendaData) => void;
}

export function EditModal({ isOpen, onClose, data, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<AgendaData>({
    ...data,
    serviceType: data.serviceType || "montagem",
  });
  // Manipula mudanças nos inputs
  useEffect(() => {
    setFormData({
      ...data,
      serviceType: data.serviceType || "montagem",
      
  });
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
       [name]: name === 'price' || name === 'cost' ? Number(value) : value,
  }));

  }
  const handleSave = () => {
    const updated = {
      ...formData,
      profit: (formData.price ?? 0) - (formData.cost ?? 0),
    };
    onSave(updated);
    onClose();
  }

  if (!isOpen) {
    return null;
    }


  return (
    <div className="fixed inset-0 z-50 flex flext-col items-center justify-center bg-pink-100 bg-opacity-50">
        <div className="bg-gray-100 rounded-xl shadow-lg p-6 w-full max-w-md transform transition duration-300 scale-95 hover:scale-100">
         
              <h5 className="modal-title text-center" id="exampleModalLabel">Editar</h5>
          
              <form className="mx-10 mt-4" >
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p>Nome</p>
                                <Input
                                  placeholder="Nome do cliente..."
                                  type="text"
                                  name="client"
                                  value={formData.client}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <p>CPF</p>
                                <Input
                                  placeholder="CPF..."
                                  type="text"
                                  name="cpf"
                                  value={formData.cpf}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <p>Contato</p>
                                <Input
                                  placeholder="Celular..."
                                  type="text"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <p>Tema</p>
                                <Input
                                  placeholder="Tema..."
                                  type="text"
                                  name="theme"
                                  value={formData.theme}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <p>Local</p>
                                <Input
                                  placeholder="Endereço..."
                                  type="text"
                                  name="location"
                                  value={formData.location}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <p>Preço</p>
                                <Input
                                  placeholder="R$..."
                                  type="number"
                                  name="price"
                                  value={formData.price !== null ? formData.price : ""}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <p>Custo</p>
                                <Input
                                  placeholder="R$..."
                                  type="number"
                                  name="cost"
                                  value={formData.cost !== null ? formData.cost : ""} 
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <p>Data:</p>
                                <Input
                                  placeholder="data"
                                  type="date"
                                  name="date"
                                  value={formData.date}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="mt-10 flex flex-col items-center">
                              <legend className="font-bold mb-4">Tipo de serviço</legend>
                              <div className="flex gap-8">
                                <div>
                                  <input
                                    type="radio"
                                    id="montagem"
                                    name="serviceType"
                                    value="montagem"
                                    checked={formData.serviceType === "montagem"}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="montagem"> Montagem</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    id="PM"
                                    name="serviceType"
                                    value="PM"
                                    checked={formData.serviceType === "PM"}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="PM"> Pegue e monte</label>
                                </div>
                              </div>
                            </div>
                            
              </form>
              <div className='flex justify-center  gap-5 mt-10'>
                <button type='button' className='bg-pink-400 text-white p-2 rounded-lg  cursor-pointer hover:bg-pink-500' onClick={onClose}>Fechar</button>
                <button type='submit'className='bg-pink-400 text-white p-2 rounded-lg  cursor-pointer hover:bg-pink-500' onClick={handleSave}>Salvar</button>
              </div>
            
        </div>
        
    </div>
     
  );
}

export default EditModal;