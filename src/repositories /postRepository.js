import db from "../db/db.js";

async function isPostExistent(id) {
  const { rows: post } = await db.query(
    `
    SELECT * FROM posts WHERE id = $1
  `,
    [id]
  );

    return post;
}

async function updatePost(text,id) {
    const { rows: post } = await db.query(
        `
      UPDATE posts 
      SET description = $1
      WHERE id = $2
    `,
        [text,id]
    );
  
    return post;
  }

  async function deletePosts_hastgs(postId,hastgId) {
    const { rows: posts_hastgs } = await db.query(
        `
        DELETE FROM posts_hastgs ph 
        WHERE ph."post_id" = $1 
        AND ph."hastag_id" = $2
    `,
     [postId, hastgId]
    );
  
    return posts_hastgs;
  }


  async function deletePost(postId, userId) {
    const { rows: deletePostByiD } = await db.query(
        `
        DELETE FROM posts p 
        WHERE p.id = $1 
        AND p.user_id = $2
    `,
     [postId, userId]
    );
  
    return deletePostByiD;
  }

  
export default {
    isPostExistent,
    updatePost,
    deletePost,
    deletePosts_hastgs
};