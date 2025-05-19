import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

interface jwtPayload {
    id: number,
    name: string,
    email: string
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header) return res.status(401).json({ Error: "Unauthorized, Token Not Provide"})

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT) as jwtPayload;

        (req as Request & { user: jwtPayload}).user = decoded;

        next();
    }
    catch {
        res.status(401).json({ Error: "Unauthorized, Invalid Token" })
    }

}
