// frontend/src/components/Review.js
import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Review() {
  const navigate = useNavigate();

  function finishReview() {
    navigate('/done'); // Atualizar com o caminho correto se necessário
  }

  return (
    <Container className="text-center mt-5">
      <h2>Reveja suas fotos</h2>
      {/* Implementar a visualização das fotos capturadas aqui */}
      <Row className="mt-4">
        <Col>
          <Button variant="primary" onClick={finishReview}>Concluir</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Review;
