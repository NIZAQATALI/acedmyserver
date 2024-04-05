const userController = require("../Controllers/userController");



const express = require("express");
 const router = express.Router();
 const auth = require("../MiddleWares/auth");
 router.post("/create", userController.register);
 router.post("/checkMail", userController.checkEmail);
 router.get("/getuser",auth.verifyToken, userController.getUser);
 router.post("/login", userController.login);
module.exports = router;









