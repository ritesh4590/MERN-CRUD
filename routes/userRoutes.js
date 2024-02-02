import express from "express";
const routes = express.Router();
import {
  getUser,
  getUserById,
  registerUser,
  updatUserById,
  deleteUser,
} from "../controller/userController.js";

routes.route("/register").post(registerUser);
routes.route("/").get(getUser);
routes.route("/user/:id").get(getUserById);
routes.route("/update-user/:id").patch(updatUserById);
routes.route("/delete-user/:id").delete(deleteUser);

export default routes;
