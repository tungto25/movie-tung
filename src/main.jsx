import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './contexts/CategoryProvider';
import { MovieTypeProvider } from './contexts/MovieTypeProvider';
import { CountryProvider } from './contexts/CountryProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CountryProvider>
        <MovieTypeProvider>
          <CategoriesProvider>
            <App />
          </CategoriesProvider>
        </MovieTypeProvider>
      </CountryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
