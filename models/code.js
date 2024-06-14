const mongoose = require('mongoose');

const codeSubmissionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    preferredLanguage: {
        type: String,
        enum: ['C++', 'Java', 'JavaScript', 'Python'],
        required: true
    },
    stdin: {
        type: String,
        default: ""
    },
    sourceCode: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const CodeSubmission = mongoose.model('CodeSubmission', codeSubmissionSchema);

module.exports = CodeSubmission;
