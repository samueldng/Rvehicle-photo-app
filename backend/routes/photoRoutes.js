// backend/routes/photoRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const photoController = require('../controllers/photoController');

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Rotas
router.post('/upload', upload.single('vehiclePhoto'), photoController.uploadPhoto);
router.get('/', photoController.getPhotos);

module.exports = router;
