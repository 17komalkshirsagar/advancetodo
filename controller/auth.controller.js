const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const Admin = require("../modal/Admin")
const { checkEmpty } = require("../util/checkEmpty")
const Employee = require("../modal/Employee")


exports.registerAdmin = asyncHandler(async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    await Admin.create({ ...req.body, password: hash })
    res.json({ message: "register success" })
})
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const { isError, error } = checkEmpty({ userName, password })
    if (isError) {
        return res.status(400).json({ message: "All fileds required", error })
    }
    const result = await Admin.findOne({
        $or: [
            { email: userName },
            { mobile: userName }
        ]
    })
    if (!result) {
        return res.status(400).json({
            messsage: " Email Or Mobile is not Found",
            error: " Email Or Mobile is not Found"
        })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "password Do not Match" })
    }
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "7d" })
    res.cookie("admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })
    res.json({
        message: "Login Success", result: {
            _id: result._id,
            email: result.email,
            name: result.name,
            mobile: result.mobile,

        }
    })
})


exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")

    res.json({ message: "Admin Logout Success" })
})
exports.loginUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const { isError, error } = checkEmpty({ name, email, password })
    if (isError) {
        return res.status(400).json({ message: "All fileds required", error })
    }
    const result = await Employee.findOne({
        $or: [
            { email: name },
            { mobile: name }
        ]
    })
    if (!result) {
        return res.status(400).json({
            messsage: " Email Or Mobile is not Found",
            error: " Email Or Mobile is not Found"
        })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "password Do not Match" })
    }
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "7d" })
    res.cookie("employee", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })
    res.json({
        message: "Login Success", result: {
            _id: result._id,
            email: result.email,
            name: result.name,
            mobile: result.mobile,

        }
    })
})
exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("employee")

    res.json({ message: "Employee Logout Success" })
})
