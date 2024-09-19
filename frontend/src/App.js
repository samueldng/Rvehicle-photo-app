// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Capture from './components/Capture';
import Review from './components/Review';
import Done from './components/Done';
import CadastrarVeiculo from './components/CadastrarVeiculo'; // Importa o componente para cadastrar veículo

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/review" element={<Review />} />
        <Route path="/done" element={<Done />} />
        <Route path="/cadastrar-veiculo" element={<CadastrarVeiculo />} /> {/* Rota para cadastrar veículo */}
      </Routes>
    </Router>
  );
}

export default App;
