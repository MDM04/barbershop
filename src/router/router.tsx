import { Route, Routes, BrowserRouter } from "react-router-dom";
import Payment from "../client/Payment";
import Appointment from "../client/Appointment";
import HomePageClient from "../client/HomePage";
import LoginPage from "../client/LoginPage";
import SignUpPage from "../client/SignUpPage"; // Importar o novo componente
import ForgotPasswordPage from "../client/ForgotPassword";
import ResetPasswordPage from "../client/ResetPassword";
import WelcomePage from "../client/Welcome";
import PaymentPage from "../client/PaymentPage";
import CreditCard from "../client/CreditCard";
import PixPaymentPage from "../client/PixPayment";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageClient />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/payment-method" element={<PaymentPage />} />
        <Route path="/credit-card" element={<CreditCard />} />
        <Route path="/pix-payment" element={<PixPaymentPage />} />

        <Route path="appointment" element={<Appointment />} />
        <Route path="payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
