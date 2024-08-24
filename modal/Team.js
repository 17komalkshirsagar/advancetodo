
const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

module.exports = mongoose.models.team || mongoose.model("team", teamSchema)

