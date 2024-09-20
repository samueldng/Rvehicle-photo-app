import React from 'react';
import { Container, Button, Row, Col, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function Review() {
  const location = useLocation();
  const navigate = useNavigate();
  const { photos } = location.state || { photos: [] };

  // Validação de estado
  if (!photos.length) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">
          Erro: Nenhuma foto encontrada.
        </Alert>
        <Button onClick={() => navigate('/capture')} variant="primary">
          Voltar para Captura
        </Button>
      </Container>
    );
  }

  const instructions = [
    "Frente do veículo",
    "Frente do veículo (próxima)",
    "Lateral direita do veículo",
    "Lateral direita do veículo (próxima)",
    "Lateral esquerda do veículo",
    "Lateral esquerda do veículo (próxima)",
    "Traseira do veículo",
    "Traseira do veículo (próxima)",
    "Condutor e passageiro",
    "Condutor e passageiro (próxima)",
    "Km do veículo",
    "Km do veículo (próxima)",
    "Foto do estepe" // Adicionando a foto do estepe como passo 13
  ];

  const handleRetakePhoto = (index) => {
    navigate('/capture', { state: { index } });
  };

  const finishReview = () => {
    alert("Processo concluído com sucesso!");
    navigate('/done');
  };

  return (
    <Container className="text-center mt-5">
      <h2 className="text-2xl font-bold">Reveja suas fotos</h2>
      <Row className="mt-4">
        {photos.length === 13 ? ( // Atualizar a verificação para 13
          photos.map((photo, index) => (
            <Col key={index} xs={12} md={6} className="mb-4">
              <div className="card p-3 shadow-sm rounded-3" style={{ background: 'linear-gradient(135deg, #47018f, #ff5404)' }}>
                <h4 className="text-lg mb-2" style={{ color: '#fff' }}>{`Foto ${index + 1}: ${instructions[index]}`}</h4>
                <img
                  src={photo}
                  alt={`Foto da ${instructions[index]}`}
                  className="img-fluid border border-gray-300 rounded shadow-md mb-2"
                  loading="lazy"
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
                <Button
                  variant="secondary"
                  onClick={() => handleRetakePhoto(index)}
                  className="mt-2"
                  style={{
                    backgroundColor: '#69727d',
                    borderColor: '#69727d',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#5c6b6f';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#69727d';
                    e.currentTarget.style.boxShadow = '0 4px 8px  rgba(0, 0, 0, 0.2)';
                  }}
                >
                  Tirar Foto Novamente
                </Button>
              </div>
            </Col>
          ))
        ) : (
          <Col>
            <h4 className="text-lg">Erro: Esperava 13 fotos, mas apenas {photos.length} foram encontradas.</h4>
            <Button onClick={() => navigate('/capture')} variant="primary">Voltar para Captura</Button>
          </Col>
        )}
      </Row>
      <Row className="mt-4 justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <div style={{ marginBottom: '30px' }}>
            <Button 
              variant="primary" 
              onClick={finishReview} 
              style={{
                backgroundColor: '#47018f', 
                borderColor: '#47018f',
                padding: '12px 20px',
                fontSize: '18px',
                width: '100%'
              }}
            >
              Concluir
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Review;
