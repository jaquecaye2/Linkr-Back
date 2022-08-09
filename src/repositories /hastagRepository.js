import db from "../db/db.js";

async function findHastag(hastag) {
  return db.query(`SELECT * FROM hastags WHERE "name" = $1`, [hastag]);
}


const hastagRepository = {
    findHastag,

}

export default hastagRepository;