import { connectionDB } from "../database/db.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const checkToken = await connectionDB.query(
        "SELECT * from sessions WHERE token = $1 ",
        [token]
    );

    if (!token || checkToken.rows.length === 0) {
        return res.sendStatus(401);
    }
    res.locals.token = token;

    next();
}
