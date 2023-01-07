import userRepositories from "../repository/validate.user.repository.js";

async function takeUserWithUsername(req, res){
    const { username } = req.params;
    try {
        const usernameList = await userRepositories.validateUsername(username);

        res.status(200).send(usernameList.rows)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function takeInfoWithUserId(req,res){
    const {user_id} = req.params;
    try {
        const userInfo = await userRepositories.postsUser_id(user_id);

        const info = userInfo.rows[0]
        //lembrar de melhorar essa função
        const userMock ={
            id:info.id,
            username: info.username,
            picture_url: info.picture_url,
            posts:[
                {
                    id: 3,
                    link:"www.google.com",
                    description:"Melhor site de busca",
                    likes:0
                },
                {
                    id: 4,
                    link:"www.driven.com",
                    description:"O cursinho que to fazendo",
                    likes:0
                }
            ]
        }
        res.status(200).send(userMock)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
export { takeUserWithUsername, takeInfoWithUserId };