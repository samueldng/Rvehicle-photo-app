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
  const [showTravelModal, setShowTravelModal] = useState(false);
  const [isFirstPhoto, setIsFirstPhoto] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const instructions = [
    "Passo 1: Tire a foto da frente do veículo",
    "Passo 1: Tire a foto da frente do veículo, mais próxima",
    "Passo 2: Tire a foto da lateral direita do veículo",
    "Passo 2: Tire a foto da lateral direita do veículo, mais próxima",
    "Passo 3: Tire a foto da lateral esquerda do veículo",
    "Passo 3: Tire a foto da lateral esquerda do veículo, mais próxima",
    "Passo 4: Tire a foto da traseira do veículo",
    "Passo 4: Tire a foto da traseira do veículo, mais próxima",
    "Passo 5: Tire a foto do condutor e passageiro",
    "Passo 5: Tire a foto do condutor e passageiro, mais próxima",
    "Passo 6: Tire a foto dos km do veículo",
    "Passo 6: Tire a foto dos km do veículo, mais próxima",
  ];

  const startCamera = async () => {
    try {
      const constraints = { video: { facingMode: { exact: 'environment' } } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setLoading(false);
          setError(null);
        }).catch(err => {
          setError('Não foi possível iniciar a câmera. Verifique as permissões.');
          setLoading(false);
        });
      }
    } catch (err) {
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

      if (isFirstPhoto) {
        setIsFirstPhoto(false);
      } else {
        if (step < instructions.length / 2) {
          setStep(step + 1);
          setIsFirstPhoto(true);
        } else {
          setShowTravelModal(true);
        }
      }
    }
  };

  const handleTravelConfirmation = (willTravel) => {
    setShowTravelModal(false);
    if (willTravel) {
      capturePhoto();
    } else {
      navigate('/review', { state: { photos } });
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
      const videoElement = videoRef.current;
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">{instructions[(step - 1) * 2 + (isFirstPhoto ? 0 : 1)]}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="position-relative">
            <video
              ref={videoRef}
              className="w-100 h-auto border rounded-3 shadow-lg"
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
                Recarregar Câmera
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
            style={{ maxHeight: '400px', objectFit: 'contain' }} 
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
            style={{ backgroundColor: '#69727d', borderColor: '#69727d' }}
            onClick={startNewCapture}
          >
            Tirar Foto Novamente
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar se o veículo irá viajar */}
      <Modal show={showTravelModal} onHide={() => setShowTravelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: 'center', width: '100%' }}>Informe:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>O veículo irá viajar?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleTravelConfirmation(false)}>
            Não
          </Button>
          <Button variant="primary" onClick={() => handleTravelConfirmation(true)}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Capture;
