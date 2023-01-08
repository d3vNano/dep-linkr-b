import postsRepositories from "../repository/posts.repository.js";

async function postList(req,res){
    try {
        const listPosts = postsRepositories.AllPosts();

        res.status(200).send((await listPosts).rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
};

export {postList};