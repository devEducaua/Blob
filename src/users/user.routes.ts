import { Router } from "express";
import UserController from "./user.controller.ts";
import { authenticate } from "../utils/auth.middleware.ts";
import CommentController from "../comment/comment.controller.ts";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.get("/:id/comments", CommentController.getByUser);
router.post("/register", UserController.create);
router.post("/login", UserController.login);
router.delete("/:id", authenticate, UserController.delete);

export default router;
