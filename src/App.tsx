import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./components/layout"
import {Home} from "./pages/home/home"
import Login from "./pages/login/Login"
import { Cadastro } from "./pages/cadastro"
import { Dashboard } from "./pages/dashboard"
import { Controle } from "./pages/controlPM"
import AuthProvider from "./contexts/AuthContext"
import MonthsContextProvider from "./contexts/MonthsContext"
import TableProvider from "./contexts/TableContext"

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <MonthsContextProvider>
          <TableProvider>
            <Layout />
          </TableProvider>
        </MonthsContextProvider>
      </AuthProvider>
    ), 
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/cadastro",
        element: <Cadastro/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path:"/controle",
        element: <Controle/>
      }
    ]
  }
])


export {router}