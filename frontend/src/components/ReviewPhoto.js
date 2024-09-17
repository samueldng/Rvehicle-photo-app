// src/components/ReviewPhoto.js
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const ReviewPhoto = ({ photos, onConfirm }) => {
    return (
        <div className="text-center">
            <h2>Review Photos</h2>
            <ListGroup>
                {photos.map((photo, index) => (
                    <ListGroup.Item key={index}>
                        <img src={photo} alt={`Photo ${index + 1}`} className="img-thumbnail" />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant="primary" onClick={onConfirm} className="mt-3">Confirm All Photos</Button>
        </div>
    );
};

export default ReviewPhoto;
