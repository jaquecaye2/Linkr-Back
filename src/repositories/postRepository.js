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

async function updatePost(text, id) {
  const { rows: post } = await db.query(
    `
      UPDATE posts 
      SET description = $1
      WHERE id = $2
    `,
    [text, id]
  );

  return post;
}

async function deletePosts_hastgs(postId) {
  const { rows: posts_hastgs } = await db.query(
    `
        DELETE FROM posts_hastgs ph 
        WHERE ph."post_id" = $1 
    `,
    [postId]
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


async function findPostOwner(postId,userId) {
  const { rows: postOwner } = await db.query(
    `
    DELETE FROM posts p 
    WHERE p.id = $1 
    AND p.user_id = $2
    `,
    [postId,userId]
  );

  return postOwner;
}


async function deletePostLikes(postId) {
  const { rows: postLikes } = await db.query(
    `
    SELECT * FROM likes_posts pl
    WHERE pl."post_id" = $2
    `,
    [postId]
  );

  return postLikes;
}


async function likePost(idUser, post) {
  console.log(idUser)
  console.log(post)

  try {
    return await db.query(
      "INSERT INTO likes_posts (post_id, user_id) VALUES ($1, $2)",
      [post.id, idUser]
    );
  } catch (error) {
    console.log(error)
    return false;
  }
}

async function deslikePost(idUser, post) {
  try {
    return await db.query(
      "DELETE FROM likes_posts WHERE post_id = $1 AND user_id = $2;",
      [post.id, idUser]
    );
  } catch (error) {
    return false;
  }
}

async function showMyLikes(idUser) {
  try {
    return await db.query(
      "SELECT * FROM likes_posts WHERE user_id = $1",
      [idUser]
    );
  } catch (error) {
    return false;
  }
}

async function howManyLikes(post) {
  try {
    return await db.query(
      "SELECT likes_posts.id, likes_posts.post_id, users.name FROM likes_posts JOIN users ON users.id = likes_posts.user_id WHERE post_id = $1",
      [post.id]
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
  howManyLikes,
  isPostExistent,
  deletePost,
  deletePosts_hastgs,
  updatePost,
  findPostOwner,
  deletePostLikes
};

export default postRepository;
