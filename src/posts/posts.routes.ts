import { Router } from "express";
import PostsController from "./posts.controller.ts";
import { authenticate } from "../utils/auth.middleware.ts";

const router = Router();

router.get("/", PostsController.getAll);
router.get("/:id", PostsController.getById);
router.post("/", authenticate, PostsController.create);
router.delete("/:id", authenticate, PostsController.delete);

export default router;
