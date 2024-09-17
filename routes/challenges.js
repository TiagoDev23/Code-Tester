// routes/challenges.js
const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const Submission = require('../models/Submission');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Função para normalizar o código
const normalizeCode = (code) => {
    return code
        .replace(/\r\n|\r|\n/g, "")  // Remove quebras de linha
        .replace(/\s+/g, " ")        // Remove múltiplos espaços
        .trim();                     // Remove espaços em branco no início e no fim
};

// Rota para criar um desafio
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { title, description, brokenCode, solutionCode, points, difficulty } = req.body;

        if (!title || !description || !brokenCode || !solutionCode || !points || !difficulty) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const newChallenge = new Challenge({
            title,
            description,
            brokenCode,
            solutionCode,
            points,
            difficulty,
            createdBy: req.userId
        });

        await newChallenge.save();
        res.status(201).json({ message: 'Desafio criado com sucesso!', challenge: newChallenge });
    } catch (error) {
        console.error('Erro ao criar desafio:', error);
        res.status(500).json({ message: 'Erro ao criar desafio.' });
    }
});

// Rota para listar todos os desafios
router.get('/', async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.status(200).json(challenges);
    } catch (error) {
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
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o desafio' });
    }
});

// Rota para submeter uma solução de desafio
router.post('/submit', authMiddleware, async (req, res) => {
    try {
        const { challengeId, submittedCode } = req.body;
        const userId = req.userId; 

        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ message: 'Desafio não encontrado' });
        }

        const normalizedSubmittedCode = normalizeCode(submittedCode);
        const normalizedSolutionCode = normalizeCode(challenge.solutionCode);
        const isCorrect = normalizedSubmittedCode === normalizedSolutionCode;
        const pointsAwarded = isCorrect ? challenge.points : 0;

        const newSubmission = new Submission({
            userId,
            challengeId,
            submittedCode,
            isCorrect,
            pointsAwarded
        });

        await newSubmission.save();

        if (isCorrect) {
            const user = await User.findById(userId);
            user.points += pointsAwarded;
            await user.save();
        }

        res.status(200).json({
            message: isCorrect ? 'Solução correta!' : 'Solução incorreta',
            pointsAwarded
        });
    } catch (error) {
        console.error('Erro ao submeter solução:', error);
        res.status(500).json({ message: 'Erro ao submeter solução' });
    }
});

// Rota para excluir um desafio por ID
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const challengeId = req.params.id;

        if (!challengeId) {
            return res.status(400).json({ message: 'ID do desafio não fornecido' });
        }

        const deletedChallenge = await Challenge.findByIdAndDelete(challengeId);

        if (!deletedChallenge) {
            return res.status(404).json({ message: 'Desafio não encontrado' });
        }

        res.status(200).json({ message: 'Desafio excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir desafio:', error);
        res.status(500).json({ message: 'Erro interno ao excluir o desafio' });
    }
});

module.exports = router;
