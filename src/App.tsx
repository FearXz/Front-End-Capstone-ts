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
import AuthRoute from "./components/modularComponent/AuthRoute";
import { AZIENDA, UTENTE } from "./functions/config";
import Success from "./components/success/Success";
import UtentePage from "./components/utentePage/UtentePage";
import AuthPageAzienda from "./components/authPageAzienda/AuthPageAzienda";
import AziendaPage from "./components/aziendaPage/AziendaPage";
import ContactPage from "./components/contactPage/ContactPage";
import BackOfficePage from "./components/backOffice/BackOfficePage";

function App() {
  return (
    <BrowserRouter>
      <ToasterComponent />
      <Loader />
      <MyNavbar />
      <Routes>
        <Route path="/" element={<MyMain />} />
        <Route path="/contatti" element={<ContactPage />} />

        <Route path="/auth">
          <Route path="login" element={<AuthPage />} />
          <Route path="azienda" element={<AuthPageAzienda />} />
        </Route>
        <Route path="/searchlocal/:address" element={<SearchPage />} />
        <Route path="/local/:id" element={<OrderPage />} />
        <Route
          path="/checkout"
          element={
            <AuthRoute role={[UTENTE]}>
              <CheckoutForm />
            </AuthRoute>
          }
        />
        <Route
          path="/success"
          element={
            <AuthRoute role={[UTENTE]}>
              <Success />
            </AuthRoute>
          }
        />
        <Route
          path="/utente"
          element={
            <AuthRoute role={[UTENTE]}>
              <UtentePage />
            </AuthRoute>
          }
        />
        <Route
          path="/azienda"
          element={
            <AuthRoute role={[AZIENDA]}>
              <AziendaPage />
            </AuthRoute>
          }
        />
        <Route
          path="/backoffice"
          element={
            <AuthRoute role={[AZIENDA]}>
              {" "}
              <BackOfficePage />{" "}
            </AuthRoute>
          }
        />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
