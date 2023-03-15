const { response } = require("../helpers/response");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await Users.find();
      return response(res, 200, null, "Get data success!", result);
    } catch (error) {
      response(res, 500, null, null, error);
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password, passwordConfirmation } = req.body;
      // Check if all fields are filled
      if (!name || !email || !password || !passwordConfirmation) {
        return response(res, 400, null, "All fields must be filled!");
      }
      // Check password and password confirmation
      if (password !== passwordConfirmation)
        return response(
          res,
          400,
          null,
          "Password must be the same as passwordConfirmation!"
        );

      const userEmail = await Users.findOne({ email });
      if (userEmail) {
        return response(res, 409, null, "Email is already registered!");
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      let result = await Users.create({
        name,
        email,
        password: hashPassword,
      });
      result = result.toObject();
      delete result.password;
      return response(res, 201, null, "Create user success!", result);
    } catch (error) {
      return response(res, 500, null, null, error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return response(res, 400, null, "All fields must be filled!");
      }
      const user = await Users.findOne({ email });
      if (!user) {
        return response(res, 400, null, "Email is not registered yet!");
      }
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return response(res, 401, "unauthorized", "Wrong password!");
      }
      // res.cookie("id", user._id, {
      //   httpOnly: true,
      //   maxAge: 24 * 60 * 60 * 1000
      // });
      return response(res, 200, null, "Login success!", {id: user._id});
    } catch (error) {
      return response(res, 500, null, null, error);
    }
  },
  logout: async (req, res) => {
    try {
        res.clearCookie("id");
        return response(res, 200, null, "Logout success!", null);
    } catch (error) {
        return response(res, 500, null, null, error);
    }
  }
};

module.exports = usersController;
