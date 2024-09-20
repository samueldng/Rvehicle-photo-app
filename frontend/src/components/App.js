import React, { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import PhotoSummary from './components/PhotoSummary';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [step, setStep] = useState(0);
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate(); // Hook para navegação

    const handleCapture = (photo) => {
        setPhotos((prevPhotos) => [...prevPhotos, photo]);

        // Verifica se o número de fotos atingiu o limite de 13
        if (photos.length + 1 >= 13) {
            setStep(2); // Mover para a tela de resumo
        } else {
            setStep(1); // Continuar tirando fotos
        }
    };

    const handleRestart = () => {
        setPhotos([]);
        setStep(0); // Voltar ao início
    };

    return (
        <Container className="mt-5">
            {step === 0 && (
                <div className="text-center">
                    <h1>Captura de Fotos do Veículo</h1>
                    <Button onClick={() => setStep(1)} className="btn btn-primary">
                        Iniciar Captura
                    </Button>
                    <Button
                        onClick={() => navigate('/cadastrar-veiculo')} // Navegar para o componente de cadastro
                        className="btn btn-secondary mt-3"
                    >
                        Cadastrar Veículo
                    </Button>
                </div>
            )}
            {step === 1 && (
                <CameraCapture onCapture={handleCapture} onCancel={handleRestart} />
            )}
            {step === 2 && (
                <PhotoSummary photos={photos} onRestart={handleRestart} />
            )}
        </Container>
    );
};

export default App;
