import userRepositories from "../repository/validate.user.repository.js";

async function validateSearch (req,res,next){
    const { username, user_id} = req.params;

    
    if(username.length<=2 || username.length>=50){
        return res.status(400).send("O Username deve ter entre 3 a 50 caracteres")
    }

    if(!user_id) return res.status(422).send("user_id not exist!")

    try {
        const usernameExist = await userRepositories.validateUsername(username, user_id);

        console.log(usernameExist.rows)
        if(!usernameExist.rows[0]) return res.status(404).send("Username not exist!")

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};

async function validateUserId (req, res, next){
    const {user_id} = req.params;

    try {
        const idParseint = parseInt(user_id)
        
        if(idParseint.constructor !== Number) return res.status(404).send("User_id not valid!")

        const user_idExist = await userRepositories.validateUser_id(user_id);

        if(!user_idExist.rows[0]) return res.status(404).send("User_id not exist!")

        next()
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }

}

export {validateSearch, validateUserId}