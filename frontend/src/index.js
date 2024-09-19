import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Alterado para importação do 'react-dom/client'
import App from './App';

// Obtém o elemento raiz do DOM
const rootElement = document.getElementById('root');

// Cria a raiz usando createRoot
const root = ReactDOM.createRoot(rootElement);

// Renderiza o aplicativo
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
