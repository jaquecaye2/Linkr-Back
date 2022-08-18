import db from "../db/db.js";

async function  isUser(idUser){

    try{
      
        return db.query(`
        SELECT * FROM users
        WHERE id = $1
        `,[idUser])
    }catch(error){
        console.log(error)
        return false
    }
}

async function isPost(idPost){
    try{
        return db.query(`
        SELECT * FROM posts
        WHERE id = $1
        `,[idPost])
    }catch{
        return false
    }
}

async function insertShared(iduser){
    try{
        const {rows: idShared} =  await db.query(`
        INSERT INTO shares (user_id) VALUES($1)
        RETURNING id
        `,[iduser])
        return idShared[0].id
    }catch(error){
        console.log(error)
        return false
    }
}

async function insertSharedsPosts(idShared, idPost){
    try{
        await db.query(`
        INSERT INTO shares_post (share_id, post_id) VALUES($1, $2)
        RETURNING id
        `,[idShared, idPost])
    }catch(error){
        console.log(error)
        return false
    }
}


async function numberShares(idPost){
    try{
console.log(idPost)
        const  {rowCount: numberShares} = await db.query(`
         SELECT * FROM shares_post 
        WHERE post_id = $1
        `,[idPost])

        return numberShares
    }catch(error){
        console.log(error)
        return false
    }
}



const sharedRepository={
    isUser,
    isPost,
    insertShared,
    insertSharedsPosts,
    numberShares
}
export default sharedRepository