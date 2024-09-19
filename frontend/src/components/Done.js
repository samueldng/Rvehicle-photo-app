import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Done() {
  function handleStartNewConference() {
    window.location.href = 'http://localhost:3001/'; // Redireciona para a URL específica
  }

  return (
    <Container className="text-center mt-5">
      <h2 className="text-2xl font-bold mb-4">Todas as fotos foram tiradas com sucesso!</h2>
      <Button variant="primary" onClick={handleStartNewConference} className="mt-3">
        Iniciar Nova Conferência de Veículo
      </Button>
    </Container>
  );
}

export default Done;
