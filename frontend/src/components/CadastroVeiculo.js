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
    // Aqui você pode adicionar a lógica para salvar os dados do veículo, por exemplo, enviar para uma API

    // Redirecionar após o cadastro
    navigate('/'); // Redireciona para a página inicial após o cadastro
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Cadastrar Veículo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMarca">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a marca do veículo"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formModelo">
          <Form.Label>Modelo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o modelo do veículo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPlaca">
          <Form.Label>Placa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite a placa do veículo"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formKm">
          <Form.Label>Kilômetros Rodados</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite os km rodados"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUltimaRevisao">
          <Form.Label>Última Revisão (Data)</Form.Label>
          <Form.Control
            type="date"
            value={ultimaRevisao}
            onChange={(e) => setUltimaRevisao(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3 w-100">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};

export default CadastrarVeiculo;
