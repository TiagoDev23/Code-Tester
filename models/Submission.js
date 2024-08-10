const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    testCases: [{
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true }
    }],
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
