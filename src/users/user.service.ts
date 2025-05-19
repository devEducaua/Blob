import pool from "../models/db.ts";    
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validEmail } from "../utils/email.validate.ts";
import { exists } from "../utils/exists.ts";

interface userData {
    name: string,
    email: string,
    password: string
}

class UserService {
    async getUsers() {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    }

    async getUserById(id: string) {
        const userRows = await exists("user", id);
        return userRows;
    }

    async registerUser(data: userData) {
        const { name, email, password } = data;

        await validEmail(email);

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, hashedPassword]);
    }

    async loginUser(data: userData) {
        const { email, password } = data;

        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        const user = userResult.rows[0];
        console.log("user:", user);

        await exists("user", user.id);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error("Invalid Password");

        const token = jwt.sign({ id: user.id }, process.env.JWT ,{ expiresIn: "1h" })

        return token;
    }

    async deleteUser(data: { password: string }, id: string) {
        const { password } = data;

        const userRows = await exists("user", id);

        const user = userRows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error("Unathorized: Invalid Password");

        await pool.query("DELETE FROM users WHERE id = $1", [user.id]);
    }
}

export default new UserService();
