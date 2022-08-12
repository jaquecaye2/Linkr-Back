import connection from "../db/db.js";

async function createPost(infoPost, linkMetadata, idUser) {
  try {
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
  } catch (error) {
    return false;
  }
}

async function showPosts() {
  try {
    return await connection.query(
      "SELECT posts.id, name, picture, description, link_title, link_description, link_image, link FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.created_at DESC LIMIT 20"
    );
  } catch (error) {
    return false;
  }
}

async function likePost(idUser, post) {
  try {
    return await connection.query(
      "INSERT INTO likes_posts (post_id, user_id) VALUES ($1, $2)",
      [
        post.id,
        idUser,
      ]
    );
  } catch (error) {
    return false;
  }
}

async function deslikePost(idUser, post) {
  try {
    return await connection.query(
      "DELETE FROM likes_posts WHERE post_id = $1 AND user_id = $2;",
      [
        post.id,
        idUser,
      ]
    );
  } catch (error) {
    return false;
  }
}

async function showMyLikes(idUser) {
  try {
    return await connection.query(
      "SELECT * FROM likes_posts WHERE user_id = $1", [idUser]
    );
  } catch (error) {
    return false;
  }
}

async function howManyLikes(post) {
  try {
    return await connection.query(
      "SELECT likes_posts.id, likes_posts.post_id, users.name FROM likes_posts JOIN users ON users.id = likes_posts.user_id WHERE post_id = $1", [post.id]
    );
  } catch (error) {
    return false;
  }
}

const postRepository = {
  createPost,
  showPosts,
  likePost,
  deslikePost,
  showMyLikes,
  howManyLikes
};

export default postRepository;
