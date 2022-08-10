import connection from "../db/db.js";
import urlMetadata from "url-metadata";

export async function createPost(request, response) {
  try {
    //const idUser = response.locals.idUser;

    const idUser = 1;

    let infoPost = request.body;

    if (infoPost.description === "" || infoPost.description === undefined) {
      infoPost.description = null;
    }

    let linkMetadata = {}

    await urlMetadata(`${infoPost.link}`).then(
      function (metadata) {
        linkMetadata = metadata
      },
      function (error) {
        console.log(error);
      }
    );

    // inserir isto em um repository
    await connection.query(
      "INSERT INTO posts (link, description, link_title, link_description, link_image, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [infoPost.link, infoPost.description, linkMetadata.title, linkMetadata.description, linkMetadata.image, idUser]
    );

    response.status(201).send();
  } catch (error) {
    response.status(500).send();
  }
}

export async function showPosts(request, response) {
  try {
    // inserir isto e um repository
    const { rows: posts } = await connection.query(
      "SELECT posts.id, name, picture, description, link_title, link_description, link_image, link FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.created_at DESC LIMIT 20"
    );

    if (posts.length === 0) {
      response.status(204).send("There are no posts yet");
    }

    response.status(201).send(posts);
  } catch (error) {
    response
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}
