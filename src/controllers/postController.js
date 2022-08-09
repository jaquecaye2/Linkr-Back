import connection from "../db/db.js";

export async function createPost(request, response) {
  try {
    //const idUser = response.locals.idUser;

    const idUser = 2;

    let infoPost = request.body;

    if (infoPost.description === "" || infoPost.description === undefined) {
      infoPost.description = null;
    }

    await connection.query(
      "INSERT INTO posts (link, description, user_id) VALUES ($1, $2, $3)",
      [infoPost.link, infoPost.description, idUser]
    );

    response.status(201).send();
  } catch (error) {
    response.status(500).send();
  }
}

export async function showPosts(request, response) {
  try {
    const { rows: posts } = await connection.query(
      "SELECT posts.id, name, picture, link, description FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.created_at DESC LIMIT 20"
    );

    if (posts.length === 0){
      response.status(204).send("There are no posts yet")
    }

    response.status(201).send(posts);
  } catch (error) {
    response.status(500).send("An error occured while trying to fetch the posts, please refresh the page");
  }
}
