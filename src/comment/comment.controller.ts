import { exists } from '../utils/exists.ts';
import CommentService from './comment.service.ts'
import type { Request, Response } from 'express';

class CommentController {
    async getByPost(req: Request, res: Response) {
        try {
            const id = req.params.id;

            exists("post", id);

            const comments = await CommentService.getByType( id, "post");
            res.json(comments);

        }
        catch(err) {
            if (err.message.includes("404")) return res.status(404).json({ Err: "Post Not Found"});
            res.status(500).json({ Err: "Internal error on server" });
        }

    }

    async getByUser(req: Request, res: Response) {
        try {
            const id = req.params.id;

            exists("user", id);

            const comments = await CommentService.getByType(id, "user");
            res.json(comments);

        }
        catch(err) {
            if (err.message.includes("404")) return res.status(404).json({ Err: "User Not Found"});
            res.status(500).json({ Err: "Internal error on server" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { content, userId } = req.body;
            const postId = req.params.id;

            await CommentService.createComment(content, postId, userId);

            res.status(201).json({ message: "Comment Created" })

        }
        catch(err) {
            if (err.message.includes("404")) return res.status(404).json({ Err: "User Not Found"});
            res.status(500).json({ Err: "Internal error on server" });
        }
    }

    async update(req: Request, res: Response) {
        const { content } = req.body;
        const id = req.params.commentId;

        await CommentService.updateComment(content, id);

        res.json({ message: "Comment Updated" })
    }

    async delete(req: Request, res: Response) {
        const id = req.params.commentId;

        await CommentService.deleteComment(id)

        res.json({ message: "Comment Deleted" })

    }
}

export default new CommentController();
