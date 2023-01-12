import { connectionDB } from "../database/db.js";

export async function addFollow(req, res){
  const {user_id, follow_user_id} = req.body;
  console.log(req.body)
  const arr = [];
try{

const followExists = await connectionDB.query(`
SELECT * FROM follows WHERE user_id = $1 AND follow_user_id = $2
`, [user_id, follow_user_id]);


if(followExists.rows.length > 0){
  await connectionDB.query(`
DELETE FROM follows WHERE user_id = $1 AND follow_user_id = $2
`,[followExists.rows[0].user_id, followExists.rows[0].follow_user_id]);
return res.send({followExists:followExists.rows.length===0?false: true}).status(200);
}

  await connectionDB.query(`
  INSERT INTO follows (user_id, follow_user_id) VALUES ($1, $2)
  `, [user_id, follow_user_id]);


  return res.send({followExists:followExists.rows.length===0?false: true}).status(200);
} catch (error) {
  console.log(error)
 return res.sendStatus(500);
}
}

export async function getFollows (req,res){

  const {user_id, id} = req.params;
  try {
      const followExists = await connectionDB.query(`
  SELECT * FROM follows WHERE user_id = $1 AND follow_user_id = $2
  `, [user_id, id]);

  return res.send({followExists:followExists.rows.length===0?true: false}).status(200);
  } catch (error) {
    console.log(error)
    return res.sendStatus(500);
  }
}
