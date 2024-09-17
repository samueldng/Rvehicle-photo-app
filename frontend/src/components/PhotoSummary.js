// src/components/PhotoSummary.js
import React from 'react';
import { Button, Alert } from 'react-bootstrap';

const PhotoSummary = ({ photos, onRestart }) => {
    return (
        <div className="text-center">
            <h2>Photo Summary</h2>
            {photos.length === 5 ? (
                <Alert variant="success">
                    All photos have been captured successfully!
                </Alert>
            ) : (
                <Alert variant="danger">
                    {`You need ${5 - photos.length} more photos to complete the process.`}
                </Alert>
            )}
            <div className="d-flex justify-content-center mt-3">
                {photos.map((photo, index) => (
                    <img key={index} src={photo} alt={`Photo ${index + 1}`} className="img-thumbnail mx-2" />
                ))}
            </div>
            <Button variant="primary" onClick={onRestart} className="mt-3">Start Over</Button>
        </div>
    );
};

export default PhotoSummary;
