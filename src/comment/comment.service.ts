import pool from "../models/db";

class CommentService {
    async getByType(postId: string, type: string) {

        const comments = await pool.query(`SELECT * FROM comments WHERE ${type}_id = $1`, [postId]);
        return comments.rows;
    }

    createComment() {

    }

    deleteComment() {

    }
}

export default new CommentService();
