const router = require("express").Router()

const adminController = require("../controller/admin.controller")

router
    .post("/register-team", adminController.createTeam)
    .get("/read-team", adminController.readTeam)
    .put("/update-team/:id", adminController.updateTeam)
    .delete("/delete-team/:id", adminController.deleteTeam)
    .put("/activate-team/:id", adminController.activateTeam)
    .put("/deactivate-team/:id", adminController.deactivateTeam)

    //employee


    .post("/register-employee", adminController.registerEmployee)
    .get("/get-AllEmployee", adminController.getAllEmployee)

    .put("/activate-employee/:id", adminController.activateEmployee)
    .put("/deactivate-employee/:id", adminController.deactivateEmployee)



    //Todo
    .post("/create-todo", adminController.createTodo)
    .get("/read-todo", adminController.readTodo)
    .put("/update-todo/:id", adminController.updateTodo)
    .delete("/delete-todo/:id", adminController.deleteTodo)




module.exports = router
