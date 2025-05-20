import type { Request, Response } from "express";
import PostsService from "./posts.service.ts";

class PostController  {
    async getAll(req: Request, res: Response) {
        try {
            const users = await PostsService.getPosts();
            res.json(users);
        }
        catch {
            res.status(500).json({ Error: "Internal error on server"});
        }

    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const post = PostsService.getById(id);
            res.json(post)
        }
        catch {
            res.status(500).json({ Error: "Internal error on server"});
        }
    }

    async create(req: Request, res: Response) {
        try {
            const user = (req as Request & { user: { id: string, name: string, email: string}}).user;

            const { title, content } = req.body;
            const userId = user.id;

            const data = { title, content, userId };

            await PostsService.createPost(data);
            
            res.status(201).json({ message: "Post Created" })
        }
        catch {
            res.status(500).json({ Error: "Internal error on server"});
        }
    }

    async update() {

    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await PostsService.deletePost(id);

            res.json({ message: "Post Deleted"})

        }
        catch(err) {
            if (err.message.includes("404")) return res.status(404).json({ Err: "Post Not Found"})
            res.status(500).json({ Error: "Internal error on server"});
        }
    }
}


export default new PostController();
