import db from "../db/db.js";


async function verifyUserId(userId) {
    try {
        return db.query(
            `
         SELECT FROM users WHERE id = $1;
          `,
            [userId]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}

async function insertComment(userId,text) {
    try {
        return db.query(
            `
          INSERT INTO comments (user_id,comment) VALUES ($1,$2);
          `,
            [userId,text]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}

async function insertRelationPost(commentId,postId) {
    try {
        return db.query(
            `
          INSERT INTO comments_post (comment_id,post_id) VALUES ($1,$2);
          `,
            [commentId,postId]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}


async function findCommentId(comment,userId) {
    try {
        return db.query(
            `
         SELECT * FROM comments c  
         WHERE c.comment = $1 
         AND c.user_id = $2
          `,
            [comment,userId]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}


async function getAllPost_comments(postId) {
    try {
        return db.query(
            `
         SELECT COUNT(comment_id) AS totalComments 
         FROM comments_post cp 
         WHERE cp.post_id = $1 
          `,
            [postId]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}

async function postAuthor(postId) {
    try {
        return db.query(
            `
        SELECT * FROM posts p
        JOIN comments_post cp ON cp.post_id = p.id
        JOIN users u ON u.id = p.user_id
        WHERE p.id = $1
          `,
            [postId]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}


async function userFollowers(user_id) {
    try {
        return db.query(
            `
       SELECT * FROM follows f
       JOIN users u ON u.id = f.followers_id
       WHERE  f.user_id =  $1
          `,
            [user_id]
        );
    } catch (error) {
        console.log(error)
        return false;
    }
}

const commentRepository = {
    insertComment,
    verifyUserId,
    insertRelationPost,
    findCommentId,
    getAllPost_comments,
    postAuthor,
    userFollowers
};


export default commentRepository;

