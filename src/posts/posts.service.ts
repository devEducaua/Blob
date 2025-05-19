import pool from "../models/db";
import { exists } from "../utils/exists";

interface postData {
    title: string,
    content: string,
    userId: string,
}

class PostServices {
    async getPosts() {
        const result = pool.query("SELECT * FROM posts");
        return result.rows;
    }

    async getById(id: string) {
        const postRows = exists("post", id);
        return postRows;
    }

    async createPost(data: postData) {
        const { title, content, userId } = data;

        if (title.length > 50) throw new Error("Title is too long");

        await exists("user", userId);

        await pool.query("INSERT INTO posts (title, user_id, content) VALUES ($1, $2, $3)", [title, userId, content]);
    }

    async updatePost()  {

    }

    async deletePost( postId: string ) {
        exists("post", postId);

        await pool.query("DELETE FROM posts WHERE id = $1", [postId]);
    }
}

export default new PostServices();
