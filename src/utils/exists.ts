import pool from "../models/db";

export async function exists(type: string, id: string) {
    if (type == "user" || type == "post") {
        const result = await pool.query(`SELECT * FROM ${type}s id = $1`, [id]);

        if (result.rows.length == 0) throw new Error(`404: ${type} not found`);

        return result;
    }
}
