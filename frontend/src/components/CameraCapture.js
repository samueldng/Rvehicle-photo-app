// src/components/CameraCapture.js
import React, { useRef, useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const CameraCapture = ({ onCapture, onCancel }) => {
    const videoRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        startCamera();

        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    };

    const uploadPhoto = async (photoData) => {
        const blob = await fetch(photoData).then(res => res.blob());
        const formData = new FormData();
        formData.append('vehiclePhoto', blob, 'photo.jpg'); // Nome do arquivo

        try {
            await axios.post('/api/photos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Aqui você pode dar feedback de sucesso ao usuário
        } catch (error) {
            console.error('Erro ao fazer upload da foto:', error);
            // Aqui você pode dar feedback de erro ao usuário
        }
    };

    const capturePhoto = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL('image/jpeg');
        setPhoto(photo);
        stopCamera(); // Para a câmera após capturar a foto
        await uploadPhoto(photo); // Envia a foto para o backend
        onCapture(photo); // Chama a função para passar a foto para o App
    };

    return (
        <div className="text-center">
            <video ref={videoRef} className="border border-black" autoPlay playsInline></video>
            <div className="mt-3">
                <Button variant="primary" onClick={capturePhoto}>Capturar Foto</Button>
                <Button variant="danger" onClick={onCancel}>Cancelar</Button>
            </div>
            {/* Exibir a foto capturada em um modal se necessário */}
            {photo && (
                <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Foto Capturada</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={photo} alt="Captura" className="w-100" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsModalVisible(false)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CameraCapture;
