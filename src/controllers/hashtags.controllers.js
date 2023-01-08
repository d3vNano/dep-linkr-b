import { connectionDB } from "../database/db.js";

export async function getBestHashtags(req,res) {
  const {hashtag} =req.query;
  try{
  if(hashtag){
    const selectedHashtag = await connectionDB.query(`SELECT users.username, users.picture_url, posts.* , REGEXP_MATCHES(description,'#${hashtag}') FROM posts
    INNER JOIN users
    ON users.id= posts.user_id;`);
    return res.send(selectedHashtag.rows)
  }
  const bestHashtags =  await connectionDB.query(`SELECT * FROM hashtags`);
  console.log(bestHashtags.rows);
  return res.send(bestHashtags.rows);
}catch (err) {
  return res.status(400).send(err);
}

}

