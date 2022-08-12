
import urlMetadata from "url-metadata"
import postRepository from "../repositories/postRepository.js"

export async function updatePost(request, response) {
  const { description } = request.body;
  const { id } = request.params;
  try {
    const post = await postRepository.isPostExistent(id)
    if (!post[0]) {
      return response.sendStatus(404);
    }
    await postRepository.updatePost(description, id)

    response.status(200).send(post);
  } catch (error) {
    console.log(error)
    response
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}



export async function createPost(request, response) {
  try {
    const idUser = response.locals.idUser;

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

    await postRepository.createPost(infoPost, linkMetadata, idUser)

    response.status(201).send();
  } catch (error) {
    response.status(500).send();
  }
}

export async function showPosts(request, response) {
  try {
    const { rows: posts } = await postRepository.showPosts()

    if (posts.length === 0) {
      response.status(204).send("There are no posts yet");
      return
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
  
