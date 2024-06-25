import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Basket from "./Components/Basket";
import Catalog from "./Components/Catalog";
import ContactPage from "./Components/Contact";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ProfilePage from "./Components/Lk";
import Onas from "./Components/Onas";
import Modal from './modal/ModalRegistration';
import ModalAuth from './modal/ModalAuth';
import YourComponent from './Components/test';
import DetailPage from './Components/AdminPanel';
import Slider from './Components/Slider';
import PrivateRoute from './modal/PrivateRoute';
import DeletePage from './Components/admins/delete';
import PutsPage from './Components/admins/puts';
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/onas" element={<Onas />} />
        <Route path="/modal" element={<Modal active={true} setActive={() => {}} />} />
        <Route path="/auth" element={<ModalAuth activeAuth={true} setActiveAuth={() => {}} onLogin={() => {}} />} />
        <Route path="/test" element={<YourComponent />} />
        <Route path="/admin" element={
          <PrivateRoute requiredRole="ADMIN">
            <DetailPage />
          </PrivateRoute>
        } />
        <Route path="/slider" element={<Slider />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/delete" element={<DeletePage />} />
        <Route path="/put" element={<PutsPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
