const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    technologies: {
        type: [String],
        required: true
    },

    githubUrl: {
        type: String
    },

    liveUrl: {
        type: String
    }
});

module.exports = mongoose.model("Project", projectSchema);