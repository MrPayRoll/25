import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './ModalAuth.css';
import { useAuth } from '../modal/AuthContext';

const ModalAuth = ({ activeAuth, setActiveAuth }) => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://781c-94-141-125-64.ngrok-free.app/api/user/login', formData);
            login(response.data);
            setActiveAuth(false);
            toast.success("Успешная авторизация!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error("Неверный email или пароль.");
                    } else {
                        toast.error(`Ошибка сервера: ${error.response.status} - ${error.response.data}`);
                    }
                } else if (error.request) {
                    toast.error("Ошибка запроса: нет ответа от сервера");
                } else {
                    toast.error(`Ошибка: ${error.message}`);
                }
            } else {
                toast.error("Произошла непредвиденная ошибка");
            }
        }
    };

    return (
        <>
            <div className={activeAuth ? "modal-overlay active" : "modal-overlay"} onClick={() => setActiveAuth(false)}></div>
            <div className={activeAuth ? "ModalAuth activeAuth" : "ModalAuth"} onClick={() => setActiveAuth(false)}>
                <div className="ModalAuth__content" onClick={e => e.stopPropagation()}>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Электронная почта"     
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Пароль" 
                    />
                    <button onClick={handleSubmit}>Войти</button>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default ModalAuth;
