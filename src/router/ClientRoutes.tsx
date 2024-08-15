import { Route, Routes } from "react-router-dom";
import HomePageClient from "../client/HomePage";
import LoginPage from "../client/LoginPage";
import SignUpPage from "../client/SignUpPage";
import ForgotPasswordPage from "../client/ForgotPassword";
import ResetPasswordPage from "../client/ResetPassword";
import WelcomePage from "../client/Welcome";
import PaymentPage from "../client/PaymentPage";
import DateTimePage from "../client/DateTime";
import CreditCard from "../client/CreditCard"
import PixPaymentPage from "../client/PixPaymentPage"

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageClient />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/payment-method" element={<PaymentPage />} />
      <Route path="/credit-card" element={<CreditCard  />} />
      <Route path="/pix-payment" element={<PixPaymentPage />} />
      <Route path="/date-time" element={<DateTimePage />} />
    </Routes>
  );
};

export default ClientRoutes
