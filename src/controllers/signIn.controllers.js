import { v4 as uuidV4 } from "uuid";
import validateUser from "../repository/validate.signIn.repository.js";
import validatesSession from "../repository/validate.sessions.repository.js";

export default async function signIn(req, res) {
    const { email, password } = res.locals.user;

    const token = uuidV4();

    try {
        const userExists = await validateUser(email);

        await validatesSession(token, userExists);

        const user = userExists.rows[0];
        return res.status(200).send({
            token,
            username: user.username,
            picture_url: user.picture_url,
            user_id: user.id,
        });
    } catch (err) {
        console.log(err);
        return res.sendStatus(422);
    }
}
