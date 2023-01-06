import validateUsername from "../repository/validate.user.repository.js";

export async function validateSearch (req,res,next){
    const { username } = req.params;
    
    if(username.length<=2 || username.length>=50){
        return res.status(400).send("O Username deve ter entre 3 a 50 caracteres")
    }

    try {
        const usernameExist = await validateUsername(username);

        if(!usernameExist.rows[0]) return res.status(404).send("Username não existe!")

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};