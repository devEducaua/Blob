import { Router } from "express";
import UserController from "./user.controller.ts";
import { authenticate } from "../utils/authMiddleware.ts";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.delete("/:id", authenticate, UserController.delete);

export default router;
