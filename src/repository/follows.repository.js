import { connectionDB } from "../database/db.js";

async function getFollow(user_id, id) {
    return connectionDB.query(
        `
    SELECT * FROM follows WHERE user_id = $1 AND follow_user_id = $2
    `,
        [user_id, id]
    );
}

const followsRepository = {
    getFollow,
};

export default followsRepository;
