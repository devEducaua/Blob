import { Router } from "express";
import PostsController from "./posts.controller";
import { authenticate } from "../utils/auth.middleware";

const router = Router();

router.get("/", PostsController.getAll);
router.get("/:id", PostsController.getById);
router.post("/", authenticate, PostsController.create);
router.delete("/:id", authenticate, PostsController.delete);

export default router;
