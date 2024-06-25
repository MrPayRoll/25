import React, { useState } from 'react';
import axios from 'axios';
import '../AdminPanel.css';
import Sidebar from './SidebarAdmin';

function DeletePage() {
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`https://394d-94-141-125-64.ngrok-free.app/api/detail/delete/${id}`);
      setMessage('Деталь успешно удалена');
      setError(null);
    } catch (error) {
      console.error('Ошибка при удалении детали:', error);
      setError('Ошибка при удалении детали');
      setMessage('');
    }
  };

  return (
    <>
      <div className="glav-adminpanel">
        <Sidebar />
        <form onSubmit={handleDelete} className="detail-form">
          <label>
            ID детали:
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </label>
          <button type="submit">Удалить деталь</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </form>
      </div>
    </>
  );
}

export default DeletePage;
