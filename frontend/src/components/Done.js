import React from 'react'; 
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function Done() {
  const navigate = useNavigate(); 

  function handleStartNewConference() {
    navigate('/'); 
  }

  return (
    <Container className="text-center mt-5">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#47018f' }}>
        Todas as fotos foram tiradas com sucesso!
      </h2>
      <Button 
        onClick={handleStartNewConference} 
        className="mt-3"
        style={{
          backgroundColor: '#ff5404', 
          borderColor: '#ff5404',
          padding: '12px 20px', // Aumenta o tamanho
          fontSize: '18px', // Aumenta a fonte
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e64800'; // Cor um pouco mais escura ao passar o mouse
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ff5404'; // Voltar à cor original
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        }}
      >
        Iniciar Nova Conferência de Veículo
      </Button>
    </Container>
  );
}

export default Done;
