const usersController = require("../controllers/users");

const router = require("express").Router();

router
    .get("/", usersController.getAllUsers)
    .post("/register", usersController.register)
    .post("/login", usersController.login)
    .delete("/logout", usersController.logout)

module.exports = router
