import React from 'react'; 
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Done() {
  const navigate = useNavigate(); // Cria a função de navegação

  function handleStartNewConference() {
    navigate('/'); // Redireciona para a rota raiz da aplicação
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
