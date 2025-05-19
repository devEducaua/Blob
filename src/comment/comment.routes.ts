import { Router } from "express";
import CommentController from "./comment.controller.ts";
import { authenticate } from "../utils/auth.middleware.ts";

const router = Router();

router.get('/', CommentController.getByPost);
router.post('/', authenticate, CommentController.create);
router.patch('/:commentId', authenticate, CommentController.update);
router.delete('/:commentId', authenticate, CommentController.delete);

export default router;
