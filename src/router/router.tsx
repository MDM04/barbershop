import { Route, Routes, BrowserRouter } from "react-router-dom";
import ClientRoutes from "./ClientRoutes"; // Rotas do cliente
import AdminRoutes from "./AdminRoutes";   // Rotas do administrador

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas do cliente */}
        <Route path="/*" element={<ClientRoutes />} />
        
        {/* Rotas do administrador */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

