const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// Rota para criar uma nova submissão
router.post('/', async (req, res) => {
    try {
        const { userId, challengeId, code, language, testCases } = req.body;

        // Cria uma nova submissão
        const newSubmission = new Submission({
            userId,
            challengeId,
            code,
            language,
            testCases,
        });

        await newSubmission.save();
        res.status(201).json(newSubmission);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar submissão' });
    }
});

// Rota para listar todas as submissões
router.get('/', async (req, res) => {
    try {
        const submissions = await Submission.find();
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar submissões' });
    }
});

module.exports = router;
