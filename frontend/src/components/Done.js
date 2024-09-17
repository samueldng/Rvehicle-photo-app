// frontend/src/components/Done.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Done() {
    const navigate = useNavigate();
    

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <Container className="text-center mt-5">
      <h2>Todas as fotos foram tiradas com sucesso!</h2>
      <Button variant="primary" onClick={returnToHome}>Voltar para o Início</Button>
    </Container>
  );
}

export default Done;
