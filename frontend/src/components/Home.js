import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo ao Aplicativo de Fotos de Veículo</h1>
      <Button onClick={() => navigate('/capture')}>Conferir Veículo</Button>
    </div>
  );
};

export default Home;
