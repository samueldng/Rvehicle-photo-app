import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { FaClipboardCheck } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const FazerVistoria = () => {
  const [placa, setPlaca] = useState('');
  const [motorista, setMotorista] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState('');

  const checklistItems = [
    { label: 'Calibragem', state: useState(false) },
    { label: 'Capô', state: useState(false) },
    { label: 'Limpeza', state: useState(false) },
    { label: 'Vinculado ao monitoramento', state: useState(false) },
    { label: 'CNH do motorista', state: useState(false) },
    { label: 'Cones no bagageiro', state: useState(false) },
    { label: 'Motorista com cinto', state: useState(false) },
    { label: 'Pisca ligado', state: useState(false) },
  ];

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, checklistItems.length));
  };

  const handleChecklistSubmit = (e) => {
    e.preventDefault();
    const results = checklistItems.map((item) => ({
      label: item.label,
      checked: item.state[0],
    }));
    console.log({ placa, motorista, quilometragem, results });
    setShowModal(false);
    setCurrentStep(0);
  };

  const handleNotChecked = () => {
    checklistItems[currentStep].state[1](false);
    handleNextStep();
  };

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
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light p-4">
      <h1 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#47018f', fontSize: '2.5rem' }}>Fazer Vistoria</h1>
      <Row className="w-100">
        <Col className="mb-4" xs={12}>
          <Card className="text-center p-4 shadow-lg border-0 rounded-3" style={{ background: '#f8f9fa' }}>
            <Card.Body>
              <FaClipboardCheck size={50} className="mb-3" style={{ color: '#ff5404' }} />
              <Card.Title className="text-light" style={{ background: '#47018f', padding: '0.5rem', borderRadius: '5px' }}>Inicie a Vistoria do Veículo</Card.Title>
              
              <Form>
                <Form.Group controlId="formPlaca">
                  <Form.Label>Placa do Veículo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite a placa do veículo"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formMotorista">
                  <Form.Label>Motorista</Form.Label>
                  <Form.Control
                    as="select"
                    value={motorista}
                    onChange={(e) => setMotorista(e.target.value)}
                  >
                    <option value="">Selecione um motorista</option>
                    <option value="motorista1">Motorista 1</option>
                    <option value="motorista2">Motorista 2</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formQuilometragem">
                  <Form.Label>Quilometragem (km)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Digite a quilometragem"
                    value={quilometragem}
                    onChange={(e) => setQuilometragem(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={() => setShowModal(true)} style={{ background: '#47018f', border: 'none' }}>
                  Iniciar Checklist
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center" style={{ color: '#47018f', fontWeight: 'bold' }}>Checklist de Vistoria</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center" style={{ background: '#f8f9fa' }}>
          <Form onSubmit={handleChecklistSubmit}>
            {currentStep < checklistItems.length ? (
              <div style={{ backgroundColor: '#e9ecef', padding: '1rem', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Form.Check
                  type="checkbox"
                  label={<span style={{ textAlign: 'center', display: 'block', color: '#47018f', fontWeight: '500' }}>{checklistItems[currentStep].label}</span>}
                  checked={checklistItems[currentStep].state[0]}
                  onChange={() => {
                    checklistItems[currentStep].state[1](!checklistItems[currentStep].state[0]);
                    handleNextStep();
                  }}
                  style={{ marginBottom: '0.5rem' }}
                />
                <Button 
                  variant="link" 
                  onClick={handleNotChecked} 
                  style={{ color: '#ff5404', textDecoration: 'underline', display: 'block', margin: '1rem auto', fontWeight: '500' }}
                >
                  Não verificado
                </Button>
              </div>
            ) : (
              <div>
                <h5 style={{ color: '#47018f', fontWeight: 'bold' }}>Checklist concluído!</h5>
                <Button variant="primary" type="submit" style={{ background: '#47018f', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', display: 'block', margin: '1rem auto' }}>
                  Finalizar
                </Button>
              </div>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      {/* Exibir Data e Hora com Transparência */}
      <footer style={{ position: 'absolute', bottom: '20px', right: '20px', color: '#47018f', fontSize: '1rem', opacity: 0.7 }}>
        {currentDateTime}
      </footer>
    </Container>
  );
};

export default FazerVistoria;
