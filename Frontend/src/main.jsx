import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ added
import App from './App.jsx';
import './index.css';
import 'react-toastify/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ wrap App with Router */}
      <App />
    </BrowserRouter>
  </StrictMode>
);

