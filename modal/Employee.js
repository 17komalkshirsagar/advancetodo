
const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
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

    },
    isActive: {
        type: Boolean,
        default: true

    },
    avatar: {
        type: Boolean,
        default: ""

    },

    team: [{
        type: mongoose.Types.ObjectId,
        ref: "team"
    }]
}, { timestamps: true })

module.exports = mongoose.models.employee || mongoose.model("employee", employeeSchema)

