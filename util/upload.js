const multer = require("multer")
const { v4: uuid } = require("uuid")
const path = require("path")
const fs = require("fs")

const profileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    },
    destination: (req, file, cb) => cb(null, "profile"),
})



const uploadProfile = multer({ storage: profileStorage }).single("avatar")

module.exports = { uploadProfile, }