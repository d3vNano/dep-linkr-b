import userRepositories from "../repository/validate.user.repository.js";
import postsRepositories from "../repository/posts.repository.js"

async function takeUserWithUsername(req, res){
    const { username, user_id } = req.params;
    try {
        const usernameList = await userRepositories.validateUsername(username, user_id);

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

        const info = userInfo.rows[0];
        //lembrar de melhorar essa função
        const listOfUserPosts = await postsRepositories.listOfUserPosts(user_id);
        const userMock ={
            id:info.id,
            username: info.username,
            picture_url: info.picture_url,
            posts: listOfUserPosts.rows
        }
        res.status(200).send(userMock)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
export { takeUserWithUsername, takeInfoWithUserId };