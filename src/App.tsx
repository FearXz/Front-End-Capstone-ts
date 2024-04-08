import "./assets/css/mybootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToasterComponent from "./components/modularComponent/ToasterComponent";
import AuthPage from "./components/authPage/AuthPage";
import MyNavbar from "./components/navbar/MyNavbar";
import MyMain from "./components/homePage/MyMain";
import MyFooter from "./components/footer/MyFooter";
import Loader from "./components/modularComponent/Loader";
import SearchPage from "./components/SearchPage/SearchPage";
import OrderPage from "./components/orderPage/OrderPage";
import CheckoutForm from "./components/checkoutPage/CheckoutForm";

function App() {
  return (
    <BrowserRouter>
      <ToasterComponent />
      <Loader />
      <MyNavbar />
      <Routes>
        <Route path="/" element={<MyMain />} />
        <Route path="/auth">
          <Route path="login" element={<AuthPage />} />
        </Route>
        <Route path="/searchlocal/:address" element={<SearchPage />} />
        <Route path="/local/:id" element={<OrderPage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
