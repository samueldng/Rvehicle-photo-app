import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light p-4">
      <h1 className="text-center mb-4">Bem-vindo ao Sistema de Gestão de Veículos!</h1>
      <Row className="w-100">
        <Col className="mb-4" xs={12} md={6}>
          <Button
            onClick={() => navigate('/cadastrar-veiculo')} // Rota para cadastrar veículo
            variant="primary"
            className="w-100"
          >
            Cadastrar Veículo
          </Button>
        </Col>
        <Col className="mb-4" xs={12} md={6}>
          <Button
            onClick={() => navigate('/review')} // Rota para visualizar conferência
            variant="primary"
            className="w-100"
          >
            Visualizar Conferência
          </Button>
        </Col>
      </Row>
      <Row className="w-100">
        <Col xs={12}>
          <Button
            onClick={() => navigate('/capture')} // Rota para conferir veículo
            variant="success"
            className="w-100"
          >
            Conferir Veículo
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
