const asyncHandler = require("express-async-handler")
const Todo = require("../modal/Todo")


exports.getEmployeePersonalIdTodo = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Todo.find({ employee: id }).populate("employee")
    return res.json({ messsage: "employee Todo Success", result })

})