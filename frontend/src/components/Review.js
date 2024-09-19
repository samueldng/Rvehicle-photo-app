import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function Review() {
  const location = useLocation();
  const navigate = useNavigate();
  const { photos } = location.state || { photos: [] };

  const instructions = [
    "Frente do veículo",
    "Lateral direita do veículo",
    "Lateral esquerda do veículo",
    "Traseira do veículo",
    "Condutor e passageiro",
    "Km do veículo"
  ];

  const handleRetakePhoto = (index) => {
    navigate('/capture', { state: { index } });
  };

  const finishReview = () => {
    navigate('/done');
  };

  return (
    <Container className="text-center mt-5">
      <h2 className="text-2xl font-bold">Reveja suas fotos</h2>
      <Row className="mt-4">
        {photos.length === 6 ? (
          photos.map((photo, index) => (
            <Col key={index} xs={12} md={6} className="mb-4">
              <h4 className="text-lg">{`Foto ${index + 1}: ${instructions[index]}`}</h4>
              <img
                src={photo}
                alt={`Foto ${index + 1}`}
                className="w-full h-auto border border-gray-300 rounded shadow-md"
              />
              <Button
                variant="danger"
                onClick={() => handleRetakePhoto(index)}
                className="mt-2"
              >
                Tirar Foto Novamente
              </Button>
            </Col>
          ))
        ) : (
          <Col>
            <h4 className="text-lg">Erro: Esperava 6 fotos, mas apenas {photos.length} foram encontradas.</h4>
          </Col>
        )}
      </Row>
      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={finishReview}>
            Concluir
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Review;
