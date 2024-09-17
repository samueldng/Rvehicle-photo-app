// src/components/CameraCapture.js
import React, { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const CameraCapture = ({ onCapture, onCancel }) => {
    // ... código existente

    // Função para enviar a foto para o backend
    const uploadPhoto = async (photoData) => {
        const formData = new FormData();
        formData.append('vehiclePhoto', photoData);
        formData.append('photoType', 'front'); // ou outro tipo baseado no ângulo

        try {
            await axios.post('/api/photos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    // Modifique a função capturePhoto para chamar uploadPhoto
    const capturePhoto = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL('image/jpeg');
        setPhoto(photo);
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        await uploadPhoto(photo); // Envia a foto para o backend
    };

    // ... código existente
};

export default CameraCapture;
