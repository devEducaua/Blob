import pool from "../models/db.ts";

export async function exists(type: string, id: string) {
    if (type == "user" || type == "post" || type == "comment") {
        const result = await pool.query(`SELECT * FROM ${type}s WHERE id = $1`, [id]);

        if (result.rows.length == 0) throw new Error(`404: ${type} not found`);

        return result;
    }
}
