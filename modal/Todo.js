
const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({

    task: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true

    },
    dueDate: {
        type: Date,
        require: true

    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: "team"
    },
    employee: {
        type: mongoose.Types.ObjectId,
        ref: "employee"
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    completeOn: {
        type: Date
    },
    completeBy: {
        type: mongoose.Types.ObjectId,
        ref: "employee"
    }

}, { timestamps: true })

module.exports = mongoose.models.todo || mongoose.model("todo", todoSchema)