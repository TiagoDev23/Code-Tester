const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// Rota para listar todos os desafios
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar desafios' });
    }
});

// Rota para visualizar um desafio específico
router.get('/:id', async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Desafio não encontrado' });
        }
        res.status(200).json(challenge);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar o desafio' });
    }
});

// Rota para criar um novo desafio
router.post('/', async (req, res) => {
    try {
        const challenge = new Challenge(req.body);
        await challenge.save();
        res.status(201).json(challenge);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar desafio' });
    }
});

module.exports = router;
