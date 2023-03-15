const {response} = require("../helpers/response");
const { addStatus } = require("../middlewares/add-status");
const Activities = require("../models/activities");
const Users = require("../models/users");

const activitiesController = {
    getAllActivities: async (req, res) => {
        try {
            const {id} = req.params;
            if(!id) return response(res, 400, null, "id must be filled!", null)
            const result = await Activities.find({id_user: id}).lean();
            // Add status depends on the time_start and time_end
            addStatus(result);
            return response(res, 200, null, "Get data success!", result);
        } catch (error) {
            response(res, 500, null, null, error)
        }
    },
    insertActivity: async (req, res) => {
        try {
            const {id_user, activity, date, time_start, time_end} = req.body;
            if (!id_user || !activity || !date || !time_start || !time_end) {
                return response(res, 400, null, "All fields must be filled!", null);
            }
            const user = await Users.findOne({_id: id_user});
            if (!user) {
                return response(res, 404, null, "User not found! Check your id_user!", null);
            }
            const result = await Activities.create({
                id_user,
                activity,
                date,
                time_start,
                time_end
            });
            return response(res, 201, null, "Insert activity success!", result);
        } catch (error) {
            response(res, 500, null, null, error)
        }
    },
    updateActivity: async (req, res) => {
        try {
            const {id} = req.params;
            const {id_user, activity, date, time_start, time_end} = req.body;
            if (!id || !id_user || !activity || !date || !time_start || !time_end) {
                return response(res, 400, null, "All fields and id must be filled!", null);
            }
            const activityFound = await Activities.findOne({_id: id});
            if (!activityFound) {
                return response(res, 404, null, "Activity not found! Check your _id!", null);
            }
            const result = await Activities.findOneAndUpdate(
                {_id: id},
                {$set: {id_user, activity, date, time_start, time_end}}
            );
            return response(res, 200, null, "Update data success!", result);
        } catch (error) {
            response(res, 500, null, null, error)
        }
    },
    deleteActivity: async (req, res) => {
        try {
            const {id} = req.params;
            const activity = await Activities.findOne({_id: id});
            if (!activity) {
                return response(res, 404, null, "Activity not found", null);
            }
            await Activities.deleteOne({_id: id});
            return response(res, 200, null, "Delete activity success!", null)
        } catch (error) {
            response(res, 500, null, null, error);
        }
    }
}

module.exports = activitiesController;