import db from "../db/db.js";

async function createPost(infoPost, linkMetadata, idUser) {
  try {
    return await db.query(
      "INSERT INTO posts (link, description, link_title, link_description, link_image, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        infoPost.link,
        infoPost.description,
        linkMetadata.title,
        linkMetadata.description,
        linkMetadata.image,
        idUser,
      ]
    );
  } catch (error) {
    return false;
  }
}

async function showPosts() {
  try {
    return await db.query(
      "SELECT posts.id, name, picture, description, link_title, link_description, link_image, link FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.created_at DESC LIMIT 20"
    );
  } catch (error) {
    return false;
  }
}


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


const postRepository = {
  createPost,
  showPosts,
  updatePost,
  deletePost,
  deletePosts_hastgs,
  isPostExistent
};

export default postRepository;
