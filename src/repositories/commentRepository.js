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

async function isPostExistent(id) {
  try {
   return db.query(
      `
        SELECT * FROM posts WHERE id = $1
      `,
      [id]
    );
  } catch (e) {
    console.log(e);
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
       SELECT followers_id AS followerId FROM follows f
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

async function getUsersCommentsInfo(postId) {
    try {
        return db.query(
            `
            SELECT u.name, u.picture,c.comment,c.user_id,p.id AS post_id, p.user_id AS ownerPost 
            FROM comments_post cp
            JOIN comments c ON c.id = cp.comment_Id
            JOIN posts p ON p.id = cp.post_id
            JOIN users u ON u.id = c.user_id
            WHERE cp.post_id = $1
          `,
            [postId]
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
    userFollowers,
    isPostExistent,
    getUsersCommentsInfo
};


export default commentRepository;

