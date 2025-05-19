import pool from "../models/db";
import { exists } from "../utils/exists";

class CommentService {
    async getByType(postId: string, type: string) {

        const comments = await pool.query(`SELECT * FROM comments WHERE ${type}_id = $1`, [postId]);
        return comments.rows;
    }

    async createComment(content: string, postId: string, userId: string) {
        exists("user", userId);

        exists("post", postId);   

        await pool.query("INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3", [content, postId, userId]);
    }

    async updateComment(id: string, newContent: string) {
        exists("comment", id);

        await pool.query("UPDATE comments SET content = $1 WHERE id = $2", [newContent, id]);
    }

    async deleteComment(id: string) {
        exists("comment", id);

        await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    }
}

export default new CommentService();
