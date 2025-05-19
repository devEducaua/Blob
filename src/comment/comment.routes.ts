import { Router } from "express";
import CommentController from "./comment.controller";
import { authenticate } from "../utils/auth.middleware";

const router = Router();

router.get("/", CommentController.getByPost);
router.get("/", CommentController.getByUser);
router.post("/", authenticate, CommentController.create);
router.delete("/:id", authenticate, CommentController.delete);

export default router;
