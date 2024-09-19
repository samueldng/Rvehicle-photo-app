// src/components/ReviewPhoto.js
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const ReviewPhoto = ({ photos, onConfirm }) => {
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
