import React, { useState } from 'react'; 
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CadastrarVeiculo = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');
  const [ultimaRevisao, setUltimaRevisao] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const veiculo = {
      marca,
      modelo,
      placa,
      km,
      ultimaRevisao,
    };

    console.log('Veículo cadastrado:', veiculo);
    navigate('/'); // Redireciona para a página inicial após o cadastro
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4" style={{ color: '#ff5404', textShadow: '1px 1px 2px #000' }}>
        Cadastro de Veículo
      </h2>
      <Form onSubmit={handleSubmit} className="bg-gradient p-4 rounded-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #47018f, #ff5404)' }}>
        <Form.Group controlId="formMarca">
          <Form.Label style={{ color: '#fff' }}>Marca</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a marca do veículo"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formModelo">
          <Form.Label style={{ color: '#fff' }}>Modelo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o modelo do veículo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPlaca">
          <Form.Label style={{ color: '#fff' }}>Placa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a placa do veículo"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formKm">
          <Form.Label style={{ color: '#fff' }}>Kilômetros Rodados</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite os km rodados"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUltimaRevisao">
          <Form.Label style={{ color: '#fff' }}>Última Revisão (Data)</Form.Label>
          <Form.Control
            type="date"
            value={ultimaRevisao}
            onChange={(e) => setUltimaRevisao(e.target.value)}
            required
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="mt-3 w-100"
          style={{ backgroundColor: '#47018f', borderColor: '#47018f', transition: '0.3s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', fontSize: '1.2rem' }}
        >
          Cadastrar Veículo
        </Button>
      </Form>
    </Container>
  );
};

export default CadastrarVeiculo;
