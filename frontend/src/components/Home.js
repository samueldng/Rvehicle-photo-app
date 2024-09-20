import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCar, FaClipboardCheck, FaCamera } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light p-4" style={{ paddingBottom: '60px' }}>
      <h1 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#47018f', fontSize: '2.5rem' }}>Bem-vindo ao Sistema de Gestão de Veículos!</h1>
      <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#555', fontSize: '1.5rem' }}>Escolha uma das opções abaixo:</h2>
      <Row className="w-100">
        <Col className="mb-4" xs={12} md={4}>
          <Card
            className="text-center p-4 shadow-lg border-0 rounded-3"
            style={{ background: 'linear-gradient(135deg, #47018f, #7d4cbe)', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onClick={() => navigate('/cadastrar-veiculo')}
          >
            <Card.Body>
              <FaCar size={50} className="mb-3 text-white" />
              <Card.Title className="text-white">Cadastrar Veículo</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" xs={12} md={4}>
          <Card
            className="text-center p-4 shadow-lg border-0 rounded-3"
            style={{ background: 'linear-gradient(135deg, #69727d, #b0b0b0)', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onClick={() => navigate('/vistoria')}
          >
            <Card.Body>
              <FaClipboardCheck size={50} className="mb-3 text-white" />
              <Card.Title className="text-white">Fazer Vistoria</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" xs={12} md={4}>
          <Card
            className="text-center p-4 shadow-lg border-0 rounded-3"
            style={{ background: 'linear-gradient(135deg, #ff5404, #ff8c00)', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onClick={() => navigate('/capture')}
          >
            <Card.Body>
              <FaCamera size={50} className="mb-3 text-white" />
              <Card.Title className="text-white">Conferir Veículo</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Exibir Data e Hora com Transparência */}
      <footer style={{ position: 'fixed', bottom: '20px', right: '20px', color: '#47018f', fontSize: '1rem', opacity: 0.7 }}>
        {currentDateTime}
      </footer>
    </Container>
  );
};

export default Home;
