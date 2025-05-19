import pool from "../models/db.ts";
import { exists } from "../utils/exists.ts";

class CommentService {
    async getByPost(postId: string) {
        const comments = await pool.query("SELECT * FROM comments WHERE post_id = $1", [postId]);
        
        await exists("post", postId);

        return comments.rows;
    }

    async getByUser(userId: string) {
        const comments = await pool.query("SELECT * FROM comments WHERE user_id = $1", userId);

        await exists("user", userId);

        return comments.rows;
    }

    async createComment(content: string, postId: string, userId: string) {
        await exists("user", userId);

        await exists("post", postId);   

        await pool.query("INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3", [content, postId, userId]);
    }

    async updateComment(id: string, newContent: string) {
        await exists("comment", id);

        await pool.query("UPDATE comments SET content = $1 WHERE id = $2", [newContent, id]);
    }

    async deleteComment(id: string) {
        await exists("comment", id);

        await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    }
}

export default new CommentService();
