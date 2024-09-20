import React, { useState, useRef, useEffect } from 'react'; 
import { Button, Container, Row, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Capture() {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
        video: { facingMode: { exact: 'environment' } }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }

      videoRef.current.srcObject = stream;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setLoading(false);
          setError(null);
        }).catch(err => {
          console.error('Erro ao iniciar a reprodução do vídeo:', err);
          setError('Não foi possível iniciar a câmera. Verifique as permissões.');
          setLoading(false);
        });
      }
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
    setShowModal(true);
  };

  const savePhoto = () => {
    if (photo) {
      const updatedPhotos = [...photos, photo];
      setPhotos(updatedPhotos);
      setPhoto(null);
      setShowModal(false);
      if (step < instructions.length) {
        setStep(step + 1);
      } else {
        navigate('/review', { state: { photos: updatedPhotos } });
      }
    }
  };

  const startNewCapture = () => {
    setPhoto(null);
    setShowModal(false);
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
              className="w-100 h-auto border rounded-3 shadow-lg"
              style={{ 
                border: '4px solid transparent', 
                borderRadius: '0.5rem', 
                background: 'linear-gradient(135deg, #47018f, #ff5404)', 
                padding: '2px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
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
              <Button
                style={{ backgroundColor: '#69727d', borderColor: '#69727d' }}
                onClick={startCamera}
                className="mb-2 mb-md-0"
                disabled={loading}
              >
                Iniciar Câmera
              </Button>
              <Button
                style={{ backgroundColor: '#ff5404', borderColor: '#ff5404' }}
                onClick={capturePhoto}
                disabled={loading}
              >
                Capturar Foto
              </Button>
            </div>
          )}
        </Col>
      </Row>

      {/* Modal para visualizar a foto capturada */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#47018f', color: '#fff' }}>
          <Modal.Title className="w-100 text-center">Foto Capturada</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img 
            src={photo} 
            alt="Captura" 
            className="img-fluid border border-gray-300 rounded mx-auto d-block" 
            style={{ maxHeight: '400px', objectFit: 'contain' }} // Ajustes para dimensão
          />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            style={{ backgroundColor: '#ff5404', borderColor: '#ff5404' }}
            onClick={savePhoto}
          >
            Confirmar Foto
          </Button>
          <Button
            style={{ backgroundColor: '#69727d', borderColor: '#69727d' }} // Cor cinza
            onClick={startNewCapture}
          >
            Tirar Foto Novamente
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Capture;
