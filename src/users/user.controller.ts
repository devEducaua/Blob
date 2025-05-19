import type { Request, Response } from "express";
import UserService from "./user.service.ts";

class UserController {
    async getAll(req: Request, res: Response) {
        try {
            const users = await UserService.getUsers();

            res.json(users);
        }
        catch {
            res.status(500).json({ Err: "Internal error"})
        }
        
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            const user = await UserService.getUserById(id);

            res.json(user);
        }
        catch(err) {
            if (err.message.includes("404")) return res.status(404).json({ Err: "User Not Found"});
            res.status(500).json({ Err: "Internal error"})
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;

            await UserService.registerUser(data);
            
            res.status(201).json({ message: "User Created"})
        }

        catch {
            res.status(500).json({ Err: "Internal error"})
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = req.body;

            const token = await UserService.loginUser(data);

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

            await UserService.deleteUser(data, id);

            res.json({ message: " User Deleted" })
        }
        catch (err) {
            if (err.message.includes("Unathorized")) return res.status(401).json({ User: "Unathorized"});

            res.status(500).json({ Err: "Internal error"})
        }
    }
}

export default new UserController();
