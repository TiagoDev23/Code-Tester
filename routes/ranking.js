const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para obter o ranking dos usuários
router.get('/ranking', async (req, res) => {
    try {
        // Buscar os 10 usuários com mais pontos, ordenados do maior para o menor
        const topUsers = await User.find().sort({ points: -1 }).limit(10).select('name points');
        res.status(200).json(topUsers); // Retorna o nome e os pontos dos usuários
    } catch (error) {
        console.error('Erro ao buscar o ranking:', error);
        res.status(500).json({ message: 'Erro ao buscar o ranking.' });
    }
});

module.exports = router;
