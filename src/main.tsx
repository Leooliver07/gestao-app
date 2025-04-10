import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from './App.tsx';
import { RouterProvider } from 'react-router-dom';
import TableProvider from './contexts/TableContext.tsx';
import { MonthsContextProvider } from './contexts/MonthsContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MonthsContextProvider>
      <TableProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          
        </AuthProvider>
      </TableProvider>
    </MonthsContextProvider>
  </StrictMode>
);