const express = require("express");
const router = express.Router();
const activitiesRouter = require("./activities");
const usersRouter = require("./users");

router
    .use("/activities", activitiesRouter)
    .use("/users", usersRouter)

module.exports = router