import React, { useState } from 'react';
import axios from 'axios';
import '../AdminPanel.css';
import Sidebar from '../SidebarAdmin';

function PutsPage() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        name: name,
        price: price
      };

      const response = await axios.put(`https://394d-94-141-125-64.ngrok-free.app/api/detail/update/${id}`, dataToSend);
      setMessage('Деталь успешно обновлена');
      setError(null);
    } catch (error) {
      console.error('Ошибка при обновлении детали:', error);
      setError('Ошибка при обновлении детали');
      setMessage('');
    }
  };

  return (
    <>
      <div className="glav-adminpanel">
        <Sidebar />
        <form onSubmit={handleUpdate} className="detail-form">
          <label>
            ID детали:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </label>
          <label>
            Название:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Цена:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <button type="submit">Изменить деталь</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
      </div>
    </>
  );
}

export default PutsPage;
