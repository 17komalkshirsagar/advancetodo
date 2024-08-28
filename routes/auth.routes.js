const router = require("express").Router()

const authController = require("../controller/auth.controller")

router.post("/register-admin", authController.registerAdmin)
router.post("/login-admin", authController.loginAdmin)
router.post("/logout-admin", authController.logoutAdmin)
router.post("/login-user", authController.loginUser)
router.post("/logout-user", authController.logoutUser)


module.exports = router

