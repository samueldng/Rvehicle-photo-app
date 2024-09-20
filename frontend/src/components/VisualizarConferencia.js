import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const VisualizarConferencia = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { photos, vehicle } = location.state || { photos: [], vehicle: {} };

  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4">Visualizar Conferência de Veículo</h2>
      <h4 className="mb-4">{`Veículo: ${vehicle.marca} ${vehicle.modelo} - Placa: ${vehicle.placa}`}</h4>
      <Row className="mt-4">
        {photos.length === 6 ? (
          photos.map((photo, index) => (
            <Col key={index} xs={12} md={6} className="mb-4">
              <img
                src={photo}
                alt={`Foto ${index + 1}`}
                className="img-fluid border rounded shadow-md"
                style={{ maxHeight: '300px', objectFit: 'contain' }} // Mantém as proporções
              />
            </Col>
          ))
        ) : (
          <Col>
            <h4>Erro: Esperava 6 fotos, mas apenas {photos.length} foram encontradas.</h4>
          </Col>
        )}
      </Row>
      <Button variant="primary" onClick={() => navigate('/')} className="mt-4">
        Voltar para a Home
      </Button>
    </Container>
  );
};

export default VisualizarConferencia;
