const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../util/checkEmpty")
const Team = require("../modal/Team")
const Employee = require("../modal/Employee")
const Todo = require("../modal/Todo")
const cloudinary = require("../util/cloudinary.config")
const bcrypt = require("bcryptjs")

//team
exports.createTeam = asyncHandler(async (req, res) => {
    const { name } = req.body
    const { isError, error } = checkEmpty({ name })
    if (isError) {
        return res.status(400).json({ message: "Nmae is required", error })
    }
    await Team.create({ name })
    res.json({ message: "Team create Success" })

})
exports.readTeam = asyncHandler(async (req, res) => {
    const result = await Team.find()
    res.json({ message: "Team Fetch Success", result })
})
exports.updateTeam = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "Nmae is required", error })
    }
    await Team.findByIdAndUpdate(id, req.body)
    res.json({ message: "TEam update Success" })
})
exports.deleteTeam = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { isError, error } = checkEmpty({ id })
    if (isError) {
        return res.status(400).json({ message: "id is required", error })
    }
    await Team.findByIdAndDelete(id)
    res.json({ message: "TEam dekete Success" })
})
exports.activateTeam = asyncHandler(async (req, res) => {

    const { id } = req.params
    await Team.findByIdAndUpdate(id, { isActive: true })
    res.json({ message: "Team active Success" })
})
exports.deactivateTeam = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Team.findByIdAndUpdate(id, { isActive: false })
    res.json({ message: "Team De active Success" })
})


//employee

exports.registerEmployee = asyncHandler(async (req, res) => {
    upload(req, res, async err => {
        if (err) {
            console.log(err);

            return res.status(400).json({ messsage: "Multr Error" + err.message })

        }
        const { name, email, password, mobile, team } = req.body
        const { isError, error } = checkEmpty({ name, email, password, mobile, team })
        if (isError) {
            return res.status(400).json({ messsage: "All Feilds Required", error })
        }
        const result = await Employee.findOne({
            $or: [
                { email },
                { mobile }
            ]
        })
        if (result) {
            return res.status(400).json({ messsage: "Email all ready exits" })
        }
        const hash = await bcrypt.hash(password, 10)
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path)
            await Employee.create({ name, email, password: hash, mobile, team, avatar: secure_url })
            res.json({ messsage: "egister file Success" })
        } else {

            await Employee.create({ name, email, password: hash, mobile, team })
            res.json({ messsage: "egister Employee Success" })
        }


    })
})
exports.activateEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Employee.findByIdAndUpdate(id, { isActive: true })
    res.json({ message: "Employee active Success" })
})
exports.deactivateEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Employee.findByIdAndUpdate(id, { isActive: true })
    res.json({ message: "Employee De active Success" })
})

//Todo

exports.createTodo = asyncHandler(async (req, res) => {
    const { task, desc, dueDate, team, employee } = req.body
    const { isError, error } = checkEmpty({ task, desc, dueDate, team, })
    if (isError) {
        return res.status(400).json({ message: "Nmae is required", error })
    }
    const data = {}
    if (team) {
        data.team = team
    }
    if (employee) {
        data.employee = employee
    }
    await Todo.create({ task, desc, dueDate, ...data })
    res.json({ message: "Todo create Success" })
})
exports.readTodo = asyncHandler(async (req, res) => {
    const result = await Todo.find().populate("team").populate("employee").populate('completeBy').sort({ createdAt: -1 })
    res.json({ message: "Todo all featch succesfull", result })
})
exports.updateTodo = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Todo.findByIdAndUpdate(id, req.body, { isComplete: true })
    res.json({ message: "Update Todo Success" })
})
exports.deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Todo.findByIdAndDelete(id)
    res.json({ message: "delete Todos" })
})

