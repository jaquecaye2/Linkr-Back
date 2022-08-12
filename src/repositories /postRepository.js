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

  async function deletePost(id) {
    const { rows: deletePostByiD } = await db.query(
        `
        DELETE FROM posts p
        WHERE p.id = $1
    `,
        [id]
    );
  
    return post;
  }

  
export default {
    isPostExistent,
    updatePost,
    deletePost
};