import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./components/layout"
import {Home} from "./pages/home/home"
import Login from "./pages/login/Login"
import { Cadastro } from "./pages/cadastro"
import { Dashboard } from "./pages/dashboard"
import { Controle } from "./pages/controlPM"

const router = createBrowserRouter([
  {
    element: <Layout/>,
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