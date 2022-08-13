import connection from "../db/db.js";

async function createPost(infoPost, linkMetadata, idUser) {
  return await connection.query(
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
}

async function showPosts() {
  return await connection.query(
    "SELECT posts.id, name, picture, description, link_title, link_description, link_image, link FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.created_at DESC LIMIT 20"
  );
}

async function getLastPostByUserId(userId) {
  return connection.query(
    `
        SELECT *
        FROM posts
        WHERE posts.user_id = $1
        ORDER BY posts.created_at DESC
        LIMIT 1
    `,
    [userId]
  );
}

const postRepository = {
  createPost,
  showPosts,
  getLastPostByUserId,
};

export default postRepository;
