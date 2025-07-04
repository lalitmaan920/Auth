import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setLoggedInUser(parsedUser.name || parsedUser.email || 'User');
      fetchProducts();
    }
  }, [navigate, token]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://auth-ayb7.onrender.com/products', {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProducts(data.products || []);
      } else {
        toast.error(data.message || 'Failed to load products');
      }
    } catch (error) {
      toast.error('Something went wrong while fetching products');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="container">
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Products</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id || product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>₹ {product.price}</strong></p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;