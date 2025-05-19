import pool from "./models/db";

export function validEmailFormat(email: string): boolean {
    const re = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if (re.test(email)) {
        return true;
    }
    return false;
}

export async function validEmail(email: string) {
    const exists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (exists.rows.length > 0) {
        throw new Error("Already had a User with this email");
    }

    if (!validEmailFormat(email)) {
        throw new Error("Invalid Email");
    }
}
