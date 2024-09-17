const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    challengeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    submittedCode: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    pointsAwarded: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
