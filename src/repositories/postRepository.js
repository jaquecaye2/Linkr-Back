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

async function getLastPostByUserId(userId) {
  return db.query(
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

async function showPosts() {
  try {
    return await db.query(`
    SELECT posts.id, users.name, users.picture, description, link_title, link_description, link_image, 
	  link, posts.user_id, COUNT(shares_post.post_id)  OVER (PARTITION BY shares_post.post_id) AS countShared,
	  us.name as nameShared, posts.created_at
	  FROM  posts 
	  JOIN users ON users.id = posts.user_id 
	   JOIN shares_post ON shares_post.post_id = posts.id
	  JOIN shares ON shares_post.share_id = shares.id
	  FULL OUTER JOIN users us ON us.id = shares.user_id
	  
	  union all
	  
    SELECT posts.id, users.name, users.picture, description, link_title, link_description, link_image, 
	  link, posts.user_id, COUNT(shares_post.post_id)  AS countShared,
	 null as nameShared, posts.created_at
	  FROM  posts 
	  JOIN users ON users.id = posts.user_id 
	  LEFT JOIN shares_post ON shares_post.post_id = posts.id
	  LEFT JOIN shares ON shares_post.share_id = shares.id
	  GROUP BY posts.id, users.id, users.name,shares_post.post_id
    `);
  } catch (error) {
    return false;
  }
}

async function isPostExistent(id) {
  try {
    const { rows: post } = await db.query(
      `
        SELECT * FROM posts WHERE id = $1
      `,
      [id]
    );

    return post;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function updatePost(text, id, userId) {
  try {
    const { rows: post } = await db.query(
      `
        UPDATE posts 
        SET description = $1
        WHERE id = $2 AND user_id = $3
      `,
      [text, id, userId]
    );
    return post;
  } catch (e) {
    console.log(e);
    return false;
  }
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

async function deletePostLikes(postId) {
  const { rows: postLikes } = await db.query(
    `
    DELETE FROM likes_posts pl
    WHERE pl."post_id" = $1
    `,
    [postId]
  );

  return postLikes;
}

async function deletePosts_shared(postId) {
  return await db.query(
    `
    DELETE FROM shares_post
    WHERE "post_id" = $1
    
    `,
    [postId]
  );
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

async function findPostOwner(userId, postId) {
  const { rows: postOwner } = await db.query(
    `
    SELECT FROM posts p 
    WHERE p.id = $1 
    AND p.user_id = $2
    `,
    [postId, userId]
  );

  return postOwner;
}

async function likePost(idUser, post) {
  try {
    return await db.query(
      "INSERT INTO likes_posts (post_id, user_id) VALUES ($1, $2)",
      [post.id, idUser]
    );
  } catch (error) {
    console.log(error);
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
    return await db.query("SELECT * FROM likes_posts WHERE user_id = $1", [
      idUser,
    ]);
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

async function deleteComments_post(postId) {
  try {
    return await db.query("DELETE FROM comments_post WHERE post_id = $1", [
      postId,
    ]);
  } catch (error) {
    return false;
  }
}

async function getPostsByUsersIds(usersIds, { limit = null, offset = 0 }) {
  const { rows: posts } = await db.query(
    `
    SELECT * FROM (SELECT posts.id, users.name, users.picture, description, link_title, link_description, link_image, 
	  link, posts.user_id, COUNT(shares_post.post_id)  OVER (PARTITION BY shares_post.post_id) AS countShared,
	  us.name as nameShared, shares.created_at
	  FROM  posts 
	  JOIN users ON users.id = posts.user_id 
	   JOIN shares_post ON shares_post.post_id = posts.id
	  JOIN shares ON shares_post.share_id = shares.id
	  FULL OUTER JOIN users us ON us.id = shares.user_id
    WHERE shares.user_id IN (${usersIds.join(", ")})
	  
	  union all
	  
    SELECT posts.id, users.name, users.picture, description, link_title, link_description, link_image, 
	  link, posts.user_id, COUNT(shares_post.post_id)  AS countShared,
	 null as nameShared, posts.created_at
	  FROM  posts 
	  JOIN users ON users.id = posts.user_id 
	  LEFT JOIN shares_post ON shares_post.post_id = posts.id
	  LEFT JOIN shares ON shares_post.share_id = shares.id
    WHERE posts.user_id IN (${usersIds.join(", ")})
	  GROUP BY posts.id, users.id, users.name,shares_post.post_id) allposts

    ORDER BY allposts.created_at DESC
    ${limit ? `LIMIT ${limit}` : ""}
    OFFSET $1
    `,
    [offset]
  );

  return posts;
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
  deletePostLikes,
  getLastPostByUserId,
  deletePosts_shared,
  deleteComments_post,
  getPostsByUsersIds,
};

export default postRepository;
