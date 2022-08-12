import postRepository from "../repositories /postRepository.js";

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

export async function deletePost(request, response) {
  const { id } = request.params;
  try {
    const post = await postRepository.isPostExistent(id)
    if (!post[0]) {
      return response.sendStatus(404);
    }
    await postRepository.isPostExistent(id)

    response.sendStatus(204)
  } catch (error) {
    console.log(error)
    response
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}