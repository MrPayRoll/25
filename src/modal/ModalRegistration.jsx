import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Registration.css';

const Modal = ({ active, setActive }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async () => {
        if (!formData.name) {
            toast.error("Введите имя");
            return;
        }

        if (!formData.email) {
            toast.error("Введите email");
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error("Введите корректный email");
            return;
        }

        if (!formData.password) {
            toast.error("Введите пароль");
            return;
        }

        if (!agreeTerms) {
            toast.error("Пожалуйста, согласитесь с условиями и политикой конфиденциальности");
            return;
        }

        try {
            const response = await axios.post('https://781c-94-141-125-64.ngrok-free.app/api/user/registration', formData);
            setActive(false);
            toast.success("Регистрация прошла успешно!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 404) { 
                        toast.error("Пользователь с таким email уже зарегистрирован");
                    } else {
                        toast.error(`Ошибка сервера: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
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
        <div className={`modal-overlay ${active ? "active" : ""}`} onClick={() => setActive(false)}></div>
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите имя"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                />
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        checked={agreeTerms}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="termsCheckbox">
                        <span>Я соглашаюсь с <a href="/privacy" target="_blank">политикой конфиденциальности</a></span>
                    </label>
                </div>
                <button onClick={handleSubmit}>Регистрация</button>
            </div>
            <ToastContainer />
        </div>
        </>
    );
};

export default Modal;
