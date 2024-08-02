import { Route, Routes, BrowserRouter } from "react-router-dom";
import Payment from "../client/Payment";
import Appointment from "../client/Appointment";
import HomePageClient from "../client/HomePage";
import LoginPage from "../client/LoginPage";
import SignUpPage from "../client/SignUpPage"; // Importar o novo componente
import ForgotPasswordPage from "../client/ForgotPassword";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageClient />} /> {/* Rota para a HomePageClient */}
        <Route path="/login" element={<LoginPage />} /> {/* Rota para a página de login */}
        <Route path="/register" element={<SignUpPage />} /> {/* Nova rota para a página de cadastro */}
       <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="appointment" element={<Appointment />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
