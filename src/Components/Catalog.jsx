import React, { useState, useEffect } from 'react';
import '../Components/Catalog.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../modal/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Catalog() {
  const { user } = useAuth();
  const userId = user ? user.user : null;

  const [filteredData, setFilteredData] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(5000);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem('basket');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories({
      ...selectedCategories,
      [categoryId]: !selectedCategories[categoryId],
    });
  };

  const filterByPriceAndCategory = (searchQuery = '') => {
    if (!Array.isArray(data)) return;

    let filtered = data.filter((item) => item.price >= minValue && item.price <= maxValue);

    const selectedCategoryValues = Object.values(selectedCategories);
    if (selectedCategoryValues.some((value) => value)) {
      filtered = filtered.filter((item) => selectedCategories[item.info_id]);
    }
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.articul.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://781c-94-141-125-64.ngrok-free.app/api/detail/all', {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });
        if (Array.isArray(response.data)) {
          setData(response.data);
          setFilteredData(response.data);
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const infoId = params.get('info_id');
    const searchQuery = params.get('search');
    if (infoId) {
      setSelectedCategories((prevCategories) => ({
        ...prevCategories,
        [infoId]: true,
      }));
    }
    filterByPriceAndCategory(searchQuery);
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    filterByPriceAndCategory(searchQuery);
  }, [minValue, maxValue, data, selectedCategories]);

  const handleCardClick = (detailId) => {
    navigate(`/details/${detailId}`);
  };

  const handleAddToBasket = (item) => {
    if (!user) {
      toast.error('Пожалуйста, войдите в систему, чтобы добавить товар в корзину');
      return;
    }

    const isItemInBasket = basket.some(basketItem => basketItem.detail_id === item.detail_id);
    if (isItemInBasket) {
      toast.warn('Данный товар уже имеется в корзине');
      return;
    }

    setBasket(prevBasket => {
      const newBasket = [...prevBasket, { ...item, quantity: 1 }];
      localStorage.setItem('basket', JSON.stringify(newBasket));
      toast.success('Товар добавлен в корзину');
      return newBasket;
    });
  };

  return (
    <div className='glivn'>
      <ToastContainer />
      <div className="container-common">
        <div className="sidebarr">
          <div className="filter-section">
            <h4>Ценовой диапазон</h4>
            <div className="range-container">
              <input
                type="number"
                className="range-input"
                value={minValue}
                onChange={handleMinChange}
                min="0"
                max="10000"
              />
              <span>:</span>
              <input
                type="number"
                className="range-input"
                value={maxValue}
                onChange={handleMaxChange}
                min="0"
                max="10000"
              />
              <div className="slider-container-ct">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={minValue}
                  onChange={handleMinChange}
                  className="slider-ct"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={maxValue}
                  onChange={handleMaxChange}
                  className="slider-ct"
                />
              </div>
            </div>
          </div>
          <div className="filter-section">
            <h4>Категории</h4>
            {Object.keys(selectedCategories).map((categoryId) => (
              <label key={categoryId} className={`category-label category-${categoryId}`}>
                <input
                  type="checkbox"
                  value={categoryId}
                  checked={selectedCategories[categoryId]}
                  onChange={() => handleCategoryChange(categoryId)}
                  className={`category-checkbox category-${categoryId}`}
                />
                {categoryId === '1' && "Шины"}
                {categoryId === '2' && "Тех запчасти"}
                {categoryId === '3' && "Масла"}
                {categoryId === '4' && "Инструменты"}
                {categoryId === '5' && "АвтоХимия"}
              </label>
            ))}
          </div>
        </div>
        <div className="product-grid">
          {filteredData && filteredData.map((item) => (
            <div key={item.detail_id} className="product-card" onClick={() => handleCardClick(item.detail_id)}>
              <img src={`data:image/png;base64,${item.img}`} alt={item.name} />
              <h2>{item.name}</h2>
              <div className="info">
                <p className="price">Цена : {item.price} Pуб.</p>
                <button
                  className="buy-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToBasket(item);
                  }}
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
