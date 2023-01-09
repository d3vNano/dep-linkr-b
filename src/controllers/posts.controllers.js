import postsRepositories from "../repository/posts.repository.js";
import urlMetadata from "url-metadata";
import { connectionDB } from "../database/db.js";


async function createPost(req, res) {
    const { link, description, user_id } = req.body;

    res.status(201).send("New post created!");
}

async function postList(req, res) {

        res.status(200).send((await listPosts).rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

const link = await connectionDB.query("Select link from posts");
const arr = [];
for(let i = 0; i< link.rows.length; i++){
    
    const metadata = await urlMetadata(`http://${link.rows[i].link}`, {descriptionLength: 110 });
    const { url, title, description, image } = metadata;
    arr.push({metaUrl:url, metaTitle:title, metaDescription:description, metaImage:image})
    
    
}
const response =[];
const listPosts = await postsRepositories.AllPosts();
for(let i = 0; i< listPosts.rows.length ; i++){
response.push({...listPosts.rows[i],...arr[i]});

}

console.log(response);


       return res.status(200).send(response)
    } catch (error) {
        console.log(error)
       return res.sendStatus(500);

    }
}

export { postList, createPost };
