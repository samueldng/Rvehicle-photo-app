// frontend/src/components/Capture.js
import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Capture() {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => console.error('Erro ao acessar a câmera:', err));
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const photoURL = canvasRef.current.toDataURL('image/jpeg');
    setPhoto(photoURL);
  };

  const savePhoto = () => {
    setPhotos([...photos, photo]);
    setPhoto(null);
    if (step < 5) {
      setStep(step + 1);
    } else {
      navigate('/review');
    }
  };

  const startNewCapture = () => {
    setPhoto(null);
    startCamera();
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h2>Passo {step}: Tire a foto</h2>
          <video ref={videoRef} width="640" height="480" style={{ border: '1px solid black' }}></video>
          <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
          <div className="mt-3">
            <Button variant="secondary" onClick={startCamera}>Iniciar Câmera</Button>
            <Button variant="primary" onClick={capturePhoto} className="ml-2">Capturar Foto</Button>
          </div>
          {photo && (
            <div className="mt-3">
              <h3>Foto Capturada</h3>
              <img src={photo} alt="Captura" style={{ width: '320px', height: '240px' }} />
              <div className="mt-2">
                <Button variant="success" onClick={savePhoto}>Confirmar Foto</Button>
                <Button variant="danger" onClick={startNewCapture} className="ml-2">Tirar Foto Novamente</Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Capture; // Corrigido para exportar o componente corretamente
