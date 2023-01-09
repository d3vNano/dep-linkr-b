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

  //const hashtags = await connectionDB.query(`SELECT REGEXP_MATCHES(description,'#'), count(*) FROM posts group by regexp_matches;`)
  const hashtags = await connectionDB.query(`SELECT description, REGEXP_MATCHES(description,'#') FROM posts`)
 



  const teste = await connectionDB.query("select * from hashtags");
  console.log(teste.rows, "teste.rows");

const t = teste.rows.map((hashtag)=>{
  const query = connectionDB.query(`SELECT description, REGEXP_MATCHES(description,'#${hashtag.name}') FROM posts`)
  return res.send({...hashtag, quantity: query.rows.length})
})



   
  const bestHashtags =  await connectionDB.query(`SELECT * FROM hashtags`);
  return res.send(bestHashtags.rows);
}catch (err) {
  return res.status(400).send(err);
}

}

