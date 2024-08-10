const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inputDescription: {
        type: String,
        required: true
    },
    outputDescription: {
        type: String,
        required: true
    },
    testCases: [
        {
            input: String,
            expectedOutput: String
        }
    ]
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
