// src/App.js
import React, { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import ReviewPhoto from './components/ReviewPhoto';
import PhotoSummary from './components/PhotoSummary';
import { Container } from 'react-bootstrap';

const App = () => {
    const [step, setStep] = useState(0);
    const [photos, setPhotos] = useState([]);

    const handleCapture = (photo) => {
        setPhotos([...photos, photo]);
        if (photos.length + 1 >= 5) {
            setStep(2); // Move para a tela de resumo se 5 fotos forem tiradas
        } else {
            setStep(1); // Continuar tirando fotos
        }
    };

    const handleConfirm = () => {
        setStep(2); // Mostrar resumo
    };

    const handleRestart = () => {
        setPhotos([]);
        setStep(0); // Voltar ao início
    };

    return (
        <Container className="mt-5">
            {step === 0 && (
                <div className="text-center">
                    <h1>Vehicle Photo Capture</h1>
                    <button onClick={() => setStep(1)} className="btn btn-primary">Start</button>
                </div>
            )}
            {step === 1 && <CameraCapture onCapture={handleCapture} onCancel={handleRestart} />}
            {step === 2 && <PhotoSummary photos={photos} onRestart={handleRestart} />}
        </Container>
    );
};

export default App;
