const router = require("express").Router()

const employyeeController = require("../controller/employee.controller")

router
    .get("/fetch-employeePersonalId-details/:id", employyeeController.getEmployeePersonalIdTodo)
module.exports = router