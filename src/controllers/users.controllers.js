import validateUsername from "../repository/validate.user.repository.js";

async function takeUserWithUsername(req, res){
    const { username } = req.params;
    try {
        const usernameList = await validateUsername(username);

        res.status(200).send(usernameList.rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { takeUserWithUsername };