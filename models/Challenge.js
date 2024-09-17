const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    brokenCode: { type: String, required: true },
    solutionCode: { type: String, required: true },
    points: { type: Number, required: true },  // Pontos baseados na dificuldade
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },  // Dificuldade deve corresponder aos valores
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    solvedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // Array para armazenar os usuários que resolveram
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
