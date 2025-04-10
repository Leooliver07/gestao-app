

import { Input } from "../../components/input/input";
import { useContext, useState } from "react";
import {supabase } from "../../services/supabaseClient";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import Footer from "../../components/footer";



// Tipagem do contexto de autenticação
interface AuthContextType {
  user: { id: string; email: string } | null;
}

// Tipagem dos dados da agenda
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
}

export function Cadastro() {
  const [nameClient, setNameClient] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [theme, setTheme] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [cost, setCost] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [tableData, setTableData] = useState<AgendaData[]>([]);
  const [serviceType, setServiceType] = useState<string>("");

  // Manipula mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "client":
        setNameClient(value);
        break;
      case "cpf":
        setCpf(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "theme":
        setTheme(value);
        break;
      case "price":
        setPrice(value ? Number(value) : null);
        break;
      case "cost":
        setCost(value ? Number(value) : null);
        break;
      case "date":
        setDate(value);
        break;
      case "serviceType":
        setServiceType(value);
        break;
      default:
        break;
    }
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valida se todos os campos estão preenchidos
    if (!nameClient || !cpf || !phone || !location || !theme || price === null || cost === null || !date || !serviceType) {
      toast.error("Preencha todos os campos");
      return;
    }

    // Valida se price e cost são números válidos
    if (isNaN(price) || isNaN(cost)) {
      toast.error("Preço e custo devem ser números válidos");
      return;
    }

    const newData = {
      client: nameClient,
      cpf,
      phone,
      location,
      theme,
      price,
      cost,
      date,
      profit: price - cost,
    };

    try {
      // Insere os dados no Supabase e recupera o registro inserido
      const { data, error } = await supabase
        .from(serviceType)
        .insert([newData])
        .select(); // Retorna o registro inserido com o ID gerado

      if (error) throw error;

      // Atualiza o estado local com os dados retornados
      setTableData([...tableData, data[0]]);
      toast.success("Cadastro realizado com sucesso");

      // Limpa os campos do formulário
      setNameClient("");
      setCpf("");
      setPhone("");
      setLocation("");
      setTheme("");
      setPrice(null);
      setCost(null);
      setDate("");
      setServiceType("");
    } catch (error) {
      console.error("Erro ao enviar para o banco de dados", error);
      toast.error("Erro ao cadastrar os dados");
    }
  };

  // Verifica autenticação do usuário
  const { user } = useContext(AuthContext) as AuthContextType;
  if (!user) {
    return <div className="flex justify-center mt-20 text-xl font-bold h-screen">Faça login para acessar este conteúdo.</div>;
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen mt-20">
        <div className="max-w-xl flex items-center justify-center bg-pink-50 mx-auto">
          <form className="mx-10 mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>Nome</p>
                <Input
                  placeholder="Nome do cliente..."
                  type="text"
                  name="client"
                  value={nameClient}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>CPF</p>
                <Input
                  placeholder="CPF..."
                  type="text"
                  name="cpf"
                  value={cpf}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Contato</p>
                <Input
                  placeholder="Celular..."
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Tema</p>
                <Input
                  placeholder="Tema..."
                  type="text"
                  name="theme"
                  value={theme}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Local</p>
                <Input
                  placeholder="Endereço..."
                  type="text"
                  name="location"
                  value={location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Preço</p>
                <Input
                  placeholder="R$..."
                  type="number"
                  name="price"
                  value={price !== null ? price : ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Custo</p>
                <Input
                  placeholder="R$..."
                  type="number"
                  name="cost"
                  value={cost !== null ? cost : ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Data:</p>
                <Input
                  placeholder="data"
                  type="date"
                  name="date"
                  value={date}
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
                    onChange={handleChange}
                  />
                  <label htmlFor="PM"> Pegue e monte</label>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 mb-6">
              <button
                className="bg-blue-400 text-white p-2 rounded-lg font-medium cursor-pointer hover:bg-blue-500 transition-colors"
                type="submit"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
        
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}