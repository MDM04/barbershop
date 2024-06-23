import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../client/Home";
import Payment from "../client/Payment";
import Appointment from "../client/Appointment";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="appointment" element={<Appointment />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
