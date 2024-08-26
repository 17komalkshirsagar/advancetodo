// const multer = require("multer")
// const { v4: uuid } = require("uuid")
// const path = require("path")
// const fs = require("fs")

// const profileStorage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, uuid() + path.extname(file.originalname))
//     },
//     // destination: (req, file, cb) => cb(null, "profile"), important 
// })



// const uploadProfile = multer({ storage: profileStorage }).single("hero")

// module.exports = { uploadProfile, }


const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    },
})

const upload = multer({ storage }).single("hero")

module.exports = upload