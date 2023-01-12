import { connectionDB } from "../database/db.js";

export async function addLike(req, res){
  const {user_id, post_id} = req.body;
try{

const likeExists = await connectionDB.query(`
SELECT * FROM likes_info WHERE user_id = $1 AND post_id = $2
`, [user_id, post_id]);


if(likeExists.rows.length > 0){
  await connectionDB.query(`
DELETE FROM likes_info WHERE user_id = $1 AND post_id = $2
`,[likeExists.rows[0].user_id, likeExists.rows[0].post_id]);
return res.sendStatus(200);
}

  await connectionDB.query(`
  INSERT INTO likes_info (user_id, post_id) VALUES ($1, $2)
  `, [user_id, post_id]);

  return res.sendStatus(200);
} catch (error) {
  console.log(error)
 return res.sendStatus(500);
}
}

