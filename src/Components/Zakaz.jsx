import React, { useState, useEffect } from 'react';
import './Zakaz.css';

const ContactForm = ({ onClose, items }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const orderDetails = items.map(item => `Артикул: ${item.articul}, Количество: ${item.quantity}, Цена: ${item.price * item.quantity} Р`).join('\n');
    setFormData(prevFormData => ({ ...prevFormData, message: orderDetails }));
  }, [items]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Заказ отправлен!');
        onClose();
      } else {
        const errorText = await response.text();
        console.error('Ошибка при отправке заказа:', errorText);
        alert('Ошибка при отправке заказа');
      }
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      alert('Ошибка при отправке заказа');
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <p>Отправьте нам сообщение</p>
        <p>Для оформления заказа заполните форму ниже</p>
        <form onSubmit={handleSubmit} className="form-container">
          <input type="text" name="username" placeholder="Введите имя" onChange={handleChange} value={formData.username} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
          <input type="phone" name="phone" placeholder="Введите телефон" onChange={handleChange} value={formData.phone} />
          <textarea name="message" placeholder="Сообщение" onChange={handleChange} value={formData.message} readOnly></textarea>
          <button type="submit">Отправить заказ</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
