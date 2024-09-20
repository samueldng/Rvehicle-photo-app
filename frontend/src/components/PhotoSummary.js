import React from 'react';
import { Button, Alert } from 'react-bootstrap';

const PhotoSummary = ({ photos, onRestart }) => {
    const totalPhotosRequired = 13; // Atualizado para 13 fotos no total

    return (
        <div className="text-center">
            <h2>Resumo das Fotos</h2>
            {photos.length === totalPhotosRequired ? (
                <Alert variant="success">
                    Todas as fotos foram capturadas com sucesso! Obrigado!
                </Alert>
            ) : (
                <Alert variant="danger">
                    {`Você precisa de mais ${totalPhotosRequired - photos.length} fotos para completar o processo.`}
                </Alert>
            )}
            <div className="d-flex justify-content-center flex-wrap mt-3">
                {photos.map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`Foto ${index + 1}`}
                        className="img-thumbnail mx-2"
                        style={{ maxWidth: '150px', maxHeight: '150px' }} // Define um tamanho máximo
                    />
                ))}
            </div>
            <Button variant="primary" onClick={onRestart} className="mt-3">
                Começar Novamente
            </Button>
        </div>
    );
};

export default PhotoSummary;
