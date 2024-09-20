import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaCar, FaEye, FaCamera } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light p-4">
      <h1 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#47018f', fontSize: '2.5rem' }}>Bem-vindo ao Sistema de Gestão de Veículos!</h1>
      <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#555', fontSize: '1.5rem' }}>Escolha uma das opções abaixo:</h2>
      <Row className="w-100">
        <Col className="mb-4" xs={12} md={4}>
          <Card
            className="text-center p-4 shadow-lg border-0 rounded-3"
            style={{ background: 'linear-gradient(135deg, #47018f, #7d4cbe)', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => navigate('/review')}
          >
            <Card.Body>
              <FaEye size={50} className="mb-3 text-white" />
              <Card.Title className="text-white">Visualizar Conferência</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" xs={12} md={4}>
          <Card
            className="text-center p-4 shadow-lg border-0 rounded-3"
            style={{ background: 'linear-gradient(135deg, #ff5404, #ff8c00)', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => navigate('/capture')}
          >
            <Card.Body>
              <FaCamera size={50} className="mb-3 text-white" />
              <Card.Title className="text-white">Conferir Veículo</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
