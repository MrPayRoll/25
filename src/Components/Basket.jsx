import React, { useState, useEffect } from 'react';
import { useAuth } from '../modal/AuthContext';
import Zakaz from './Zakaz';
import '../Components/Basket.css';

const Basket = () => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState(() => {
    const savedBasket = localStorage.getItem('basket');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });
  const [favorites, setFavorites] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      setItems(JSON.parse(savedBasket));
    }
  }, []);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (id, delta) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.detail_id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      );
      localStorage.setItem('basket', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleRemove = (id) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.detail_id !== id);
      localStorage.setItem('basket', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleAddToFavorites = (id) => {
    const item = items.find(item => item.detail_id === id);
    if (item) {
      setFavorites(prevFavorites => [...prevFavorites, item]);
    }
  };

  if (!isAuthenticated) {
    return <p className='authp'>Вы должны войти в систему, чтобы получить доступ к корзине.</p>;
  }

  return (
    <>
      <div className="cart-container">
        {items.length === 0 ? (
          <p className="empty-basket">В данный момент корзина пуста</p>
        ) : (
          <>
            <div className="items">
              {items.map((item) => (
                <div className="item" key={item.detail_id}>
                  <img src={`data:image/png;base64,${item.img}`} alt={item.name} />
                  <div className="dlr">
                    <div className="details">
                      <p className="name">{item.name}</p>
                      <p className="articul">Артикул: {item.articul}</p>
                      <p className="description">{item.description}</p>
                      <div className="actions">
                        <button onClick={() => handleRemove(item.detail_id)}>Удалить</button>
                      </div>
                    </div>
                    <div className="quantity-price">
                      <div className="quantity">
                        <button onClick={() => handleQuantityChange(item.detail_id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.detail_id, 1)}>+</button>
                      </div>
                      <div className="price">{item.price} Р</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary">
              <p>Ваш заказ</p>
              <p>Всего: {items.length} шт</p>
              <p>Стоимость товаров в заказе: {totalPrice} Р</p>
              <p>Итого к оплате: {totalPrice} Р</p>
              <button onClick={() => setIsFormOpen(true)}>Перейти к оформлению</button>
            </div>
          </>
        )}
      </div>
      {isFormOpen && <Zakaz onClose={() => setIsFormOpen(false)} items={items} />}
    </>
  );
};

export default Basket;
