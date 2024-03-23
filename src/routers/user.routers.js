import { Router } from "express";
import {
  GetProfile,
  Login,
  Logout,
  Register,
} from "../controllers/user.controller.js";
import Auth from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/profile").get(Auth, GetProfile);
router.route("/logout").get(Auth, Logout);

export default router;
