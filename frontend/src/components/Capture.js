import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Capture() {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const instructions = [
    "Tire a foto da frente do veículo",
    "Tire a foto da lateral direita do veículo",
    "Tire a foto da lateral esquerda do veículo",
    "Tire a foto da traseira do veículo",
    "Tire a foto do condutor e passageiro",
    "Tire a foto dos km do veículo"
  ];

  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: { exact: 'environment' } } // Preferir a câmera traseira
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setLoading(false);
      setError(null); // Limpa qualquer erro anterior
    } catch (err) {
      console.error('Erro ao acessar a câmera:', err);
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
      setLoading(false);
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const photoURL = canvasRef.current.toDataURL('image/jpeg');
    setPhoto(photoURL);
  };

  const savePhoto = () => {
    if (photo) {
      const updatedPhotos = [...photos, photo];
      setPhotos(updatedPhotos);
      setPhoto(null);
      if (step < instructions.length) {
        setStep(step + 1);
      } else {
        navigate('/review', { state: { photos: updatedPhotos } });
      }
    }
  };

  const startNewCapture = () => {
    setPhoto(null);
    startCamera();
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Passo {step}: {instructions[step - 1]}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="position-relative">
            <video
              ref={videoRef}
              className="w-100 h-auto border border-dark"
              autoPlay
              playsInline
            ></video>
          </div>
          <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
          {loading ? (
            <div className="text-center mt-3">
              <Spinner animation="border" />
              <p>Carregando câmera...</p>
            </div>
          ) : (
            <div className="mt-3 d-flex flex-column flex-md-row justify-content-between">
              <Button variant="secondary" onClick={startCamera} className="mb-2 mb-md-0" disabled={loading}>Iniciar Câmera</Button>
              <Button variant="primary" onClick={capturePhoto} disabled={loading}>Capturar Foto</Button>
            </div>
          )}
          {photo && (
            <div className="mt-3 text-center">
              <h3 className="text-lg font-semibold">Foto Capturada</h3>
              <img src={photo} alt="Captura" className="img-fluid border border-gray-300" />
              <div className="mt-2">
                <Button variant="success" onClick={savePhoto} className="mr-2">Confirmar Foto</Button>
                <Button variant="danger" onClick={startNewCapture}>Tirar Foto Novamente</Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Capture;
