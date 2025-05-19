import { exists } from '../utils/exists.ts';
import CommentService from './comment.service.ts'
import type { Request, Response } from 'express';

class CommentController {
    async getByPost(req: Request, res: Response) {
        try {
            const postId = req.params.postid;

            exists("post", postId);

            const comments = await CommentService.getByType( postId, "post");
            res.json(comments);

        }
        catch(err) {
            if (err.message.includes("404")) return res.status(404).json({ Err: "Post Not Found"});
            res.status(500).json({ Err: "Internal error on server" });
        }

    }

    async getByUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;

            exists("user", userId);

            const comments = await CommentService.getByType(userId, "user");
            res.json(comments);

        }
        catch(err) {
            if (err.message.includes("404")) return res.status(404).json({ Err: "User Not Found"});
            res.status(500).json({ Err: "Internal error on server" });
        }
    }

    create() {

    }

    delete() {

    }
}

export default new CommentController();
