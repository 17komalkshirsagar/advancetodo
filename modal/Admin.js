
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true

    },
    mobile: {
        type: String,
        require: true

    }

}, { timestamps: true })

module.exports = mongoose.models.admin || mongoose.model("admin", adminSchema)
