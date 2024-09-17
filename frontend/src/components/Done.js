// frontend/src/components/Done.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Done() {
  const navigate = useNavigate();

  function handleDone() {
    navigate('/home');
  }

  return (
    <Container className="text-center mt-5">
      <h2>Todas as fotos foram tiradas com sucesso!</h2>
      <Button variant="primary" onClick={handleDone}>Voltar para o Início</Button>
    </Container>
  );
}

export default Done;
