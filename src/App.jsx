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
import ModalAuth from './modal/ModalAuth'; // Import ModalAuth component
import YourComponent from './Components/test';
import DetailForm from './Components/AdminPanel';
import Slider from './Components/Slider';
import PrivateRoute from './modal/PrivateRoute';

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
            <DetailForm />
          </PrivateRoute>
        } />
        <Route path="/slider" element={<Slider />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
