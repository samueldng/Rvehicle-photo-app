// backend/controllers/photoController.js
const Photo = require('../models/photoModel');
const path = require('path');
const fs = require('fs');

// Função para upload de fotos
exports.uploadPhoto = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Nenhuma foto enviada' });
        }

        const newPhoto = new Photo({
            photoUrl: file.path,
            type: req.body.photoType,
            createdAt: new Date()
        });

        await newPhoto.save();
        res.status(200).json({ message: 'Foto enviada com sucesso', photo: newPhoto });
    } catch (error) {
        console.error('Erro ao enviar a foto:', error);
        res.status(500).json({ message: 'Erro ao enviar a foto' });
    }
};

// Função para listar todas as fotos
exports.getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.status(200).json(photos);
    } catch (error) {
        console.error('Erro ao buscar fotos:', error);
        res.status(500).json({ message: 'Erro ao buscar fotos' });
    }
};
