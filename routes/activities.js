const router = require("express").Router();
const activitiesController = require("../controllers/activities");

router
    .get("/:id", activitiesController.getAllActivities)
    .post("/", activitiesController.insertActivity)
    .put("/:_id", activitiesController.updateActivity)
    .delete("/:id", activitiesController.deleteActivity)

module.exports = router
