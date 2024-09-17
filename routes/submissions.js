const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const Challenge = require('../models/Challenge');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para submeter uma solução de desafio
router.post('/submit', authMiddleware, async (req, res) => {
    try {
        const { challengeId, submittedCode } = req.body;
        const userId = req.userId;

        console.log("Usuário submetendo solução:", userId);  // Log para identificar o usuário que está submetendo

        // Verificar se o usuário já resolveu o desafio
        const existingSubmission = await Submission.findOne({ userId, challengeId, isCorrect: true });
        if (existingSubmission) {
            console.log("Usuário já resolveu este desafio anteriormente.");  // Log para mostrar que o usuário já completou
            return res.status(400).json({ message: 'Você já resolveu esse desafio e não pode submeter novamente.' });
        }

        // Buscar o desafio
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            console.log("Desafio não encontrado:", challengeId);  // Log se o desafio não for encontrado
            return res.status(404).json({ message: 'Desafio não encontrado.' });
        }

        console.log("Desafio encontrado:", challenge.title);  // Log do desafio encontrado

        // Normalizar o código enviado e comparar com a solução correta
        const normalizedSubmittedCode = submittedCode.replace(/\r\n|\r|\n/g, "").replace(/\s+/g, " ").trim();
        const normalizedSolutionCode = challenge.solutionCode.replace(/\r\n|\r|\n/g, "").replace(/\s+/g, " ").trim();
        const isCorrect = normalizedSubmittedCode === normalizedSolutionCode;
        const pointsAwarded = isCorrect ? challenge.points : 0;

        // Criar a submissão
        const newSubmission = new Submission({
            userId,
            challengeId,
            submittedCode,
            isCorrect,
            pointsAwarded
        });

        await newSubmission.save();

        // Atualizar a pontuação do usuário se a solução estiver correta
        if (isCorrect) {
            const user = await User.findById(userId);
            user.points += pointsAwarded;
            await user.save();
            console.log(`Usuário ${userId} ganhou ${pointsAwarded} pontos.`);  // Log da pontuação atribuída ao usuário
        }

        res.status(200).json({
            message: isCorrect ? 'Solução correta!' : 'Solução incorreta.',
            pointsAwarded,
            userPoints: isCorrect ? user.points : null
        });
    } catch (error) {
        console.error('Erro ao processar a submissão:', error);  // Log do erro
        res.status(500).json({ message: 'Erro ao submeter a solução.' });
    }
});

// Função para obter todos os desafios que o usuário não resolveu ainda
router.get('/available', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;  // ID do usuário logado

        console.log("ID do Usuário:", userId);  // Log para ver o ID do usuário

        // Buscar submissões do usuário para identificar desafios já resolvidos
        const solvedChallenges = await Submission.find({ userId, isCorrect: true }).select('challengeId');

        if (!solvedChallenges) {
            console.log('Nenhuma submissão encontrada para o usuário.');  // Log no caso de o usuário não ter submissões
        }

        const solvedChallengeIds = solvedChallenges.map(submission => submission.challengeId);

        console.log("IDs dos Desafios resolvidos:", solvedChallengeIds);  // Log para listar IDs dos desafios resolvidos

        // Buscar desafios que o usuário ainda não resolveu
        const availableChallenges = await Challenge.find({
            _id: { $nin: solvedChallengeIds }  // Excluir desafios que o usuário já resolveu
        });

        if (availableChallenges.length === 0) {
            console.log("Nenhum desafio disponível para o usuário.");  // Log no caso de não haver desafios
            return res.status(200).json({
                availableChallenges: [],
                message: 'Você já resolveu todos os desafios disponíveis! Fique atento aos novos desafios.'
            });
        }

        console.log("Desafios disponíveis:", availableChallenges);  // Log para listar os desafios disponíveis
        res.status(200).json({ availableChallenges });
    } catch (error) {
        console.error('Erro ao buscar desafios disponíveis:', error);  // Log do erro
        res.status(500).json({ message: 'Erro ao buscar desafios disponíveis.' });
    }
});

module.exports = router;
