import postsRepositories from "../repository/posts.repository.js";

async function createPost(req, res) {
    const { link, description, user_id } = req.body;

    res.status(201).send("New post created!");
}

async function postList(req, res) {
    try {
        const listPosts = postsRepositories.AllPosts();

        res.status(200).send((await listPosts).rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { postList, createPost };
