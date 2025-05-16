import type { Request, Response } from "express";
import userService from "../services/userService.ts";

class userController {
    async getAll(req: Request, res: Response) {
        try {
            const users = await userService.getUsers();

            res.json(users);
        }
        catch {
            res.status(500).json({ Err: "Internal error"})
        }
        
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;

            await userService.registerUser(data);
            
            res.status(201).json({ message: "User Created"})
        }

        catch {
            res.status(500).json({ Err: "Internal error"})
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = req.body;

            const token = await userService.loginUser(data);

            res.json({ message: "Login successful", token })
        }
        catch {
            res.status(500).json({ Err: "Internal error"})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const data = req.body;
            const id = req.params.id

            await userService.deleteUser(data, id);

            res.json({ message: " User Deleted" })
        }
        catch (err) {
            if (err.message.includes("Unathorized")) return res.status(401).json({ User: "Unathorized"});

            res.status(500).json({ Err: "Internal error"})
        }
    }
}

export default new userController();
