import React from 'react';
import { Button, ListGroup, Alert } from 'react-bootstrap';

const ReviewPhoto = ({ photos, onConfirm }) => {
    if (!photos || photos.length === 0) {
        return (
            <div className="text-center">
                <Alert variant="danger">
                    Erro: Nenhuma foto para revisar.
                </Alert>
            </div>
        );
    }

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold">Revisão das Fotos</h2>
            <ListGroup className="mt-4">
                {photos.map((photo, index) => (
                    <ListGroup.Item key={index} className="border-0">
                        <img 
                            src={photo} 
                            alt={`Foto ${index + 1}`} 
                            className="w-full h-auto img-thumbnail"
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant="primary" onClick={onConfirm} className="mt-3">
                Confirmar Todas as Fotos
            </Button>
        </div>
    );
};

export default ReviewPhoto;
