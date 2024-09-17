// frontend/src/components/Review.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Review() {
    const navigate = useNavigate();
    

  const finishReview = () => {
    history.push('/done');
  };

  return (
    <Container className="text-center mt-5">
      <h2>Revisão das Fotos</h2>
      {/* Substitua os exemplos abaixo com suas fotos */}
      <Row>
        <Col>
          <img src="path-to-photo-1.jpg" alt="Foto 1" style={{ width: '320px', height: '240px', margin: '10px' }} />
          <img src="path-to-photo-2.jpg" alt="Foto 2" style={{ width: '320px', height: '240px', margin: '10px' }} />
          {/* Adicione as outras fotos aqui */}
        </Col>
      </Row>
      <Button variant="primary" onClick={finishReview} className="mt-4">Concluir</Button>
    </Container>
  );
}

export default Review;
