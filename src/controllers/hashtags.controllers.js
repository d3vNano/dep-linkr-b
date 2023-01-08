import { connectionDB } from "../database/db.js";

export async function getBestHashtags(req,res) {
  const {hashtag} =req.query;
  try{
  if(hashtag){
    const selectedHashtag = await connectionDB.query(`SELECT * , REGEXP_MATCHES(description,'#${hashtag}') FROM posts`);
    return res.send(selectedHashtag.rows)
  }
  const bestHashtags =  await connectionDB.query(`SELECT * FROM hashtags`);
  console.log(bestHashtags.rows);
  return res.send(bestHashtags.rows);
}catch (err) {
  return res.status(400).send(err);
}

}

export async function getPostsByHashtag(req,res) {
  try{
  }catch (err) {
    return res.status(400).send(err);
  }
  
}