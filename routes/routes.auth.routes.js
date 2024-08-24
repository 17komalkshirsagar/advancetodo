const router = require("express").Router()

const authController = require("../controller/auth.controller")

router.post("/registerAdmin", authController.registerAdmin)
router.post("/loginAdmin", authController.loginAdmin)
router.post("/logoutAdmin", authController.logoutAdmin)
router.post("/loginUser", authController.loginUser)
router.post("/logoutUser", authController.logoutUser)


module.exports = router