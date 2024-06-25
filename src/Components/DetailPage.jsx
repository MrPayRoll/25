import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./DetailPage.css"

function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://781c-94-141-125-64.ngrok-free.app/api/detail/${id}`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="detail-page">
      <img src={`data:image/png;base64,${product.img}`} alt={product.name} />
      <div className="details-page">
      <h1>{product.name}</h1>
      <p>Артикул: {product.articul}</p>
      <p>Производитель: {product.manufacturer}</p>
      <p>Описание :{product.description}</p>
      <p>Цена: {product.price}</p>
      </div>
    </div>
  );
}

export default DetailPage;
