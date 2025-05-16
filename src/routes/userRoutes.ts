import { Router } from "express";
import userController from "../controllers/userController.ts";
import { authenticate } from "../utils/authMiddleware.ts";

const router = Router();

router.get("/", userController.getAll);
router.post("/register", userController.create);
router.post("/login", userController.login);
router.delete("/:id", authenticate, userController.delete);

export default router;
