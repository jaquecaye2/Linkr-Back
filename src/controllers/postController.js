import urlMetadata from "url-metadata";
import postRepository from "../repositories/postRepository.js";
import hastagRepository from "../repositories/hastagRepository.js";
import userRepository from "../repositories/userRepository.js";
import httpStatus from "../utils/httpStatus.js";

function getPostHashtags(post) {
  const hashtagRegex = /#\w+/gm;

  const matches = post.match(hashtagRegex);

  if (!matches) {
    return null;
  }

  return matches.map((hashtag) => hashtag.replace("#", ""));
}

async function getHashtagsFromDatabase(hashtags) {
  const results = await Promise.all(
    hashtags.map((hashtag) => hastagRepository.findHastag(hashtag))
  );

  return results.map((result) => result.rows[0]);
}

async function createHashtagsIfNotExists(postHashtags) {
  const hashtags = await getHashtagsFromDatabase(postHashtags);

  const hashtagsNotFound = postHashtags.filter((_, index) => !hashtags[index]);

  if (hashtagsNotFound.length > 0) {
    await hastagRepository.insertManyHashtags(hashtagsNotFound);
  }
}

async function associateHashtagsToPost(userId, hashtags) {
  const {
    rows: [post],
  } = await postRepository.getLastPostByUserId(userId);

  const hashtagsIds = hashtags.map((hashtag) => hashtag.id);

  await hastagRepository.associateHashtagsPost(post.id, hashtagsIds);
}

export async function updatePost(request, response) {
  const { description } = request.body;
  const { id } = request.params; // id post
  const idUser = response.locals.idUser;

  try {
    const post = await postRepository.isPostExistent(id);
    if (!post[0]) {
      return response.sendStatus(404);
    }

    const postOwner = await postRepository.findPostOwner(idUser, id);

    if (postOwner.length === 0) {
      return response.sendStatus(401);
    }

    await postRepository.updatePost(description, id, idUser);

    response.status(200).send(post);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}

export async function deletePost(request, response) {
  const { id } = request.params; // id Post
  const idUser = response.locals.idUser;

  try {
    const post = await postRepository.isPostExistent(id);
    if (!post[0]) {
      return response.sendStatus(404);
    }

    const postOwner = await postRepository.findPostOwner(idUser, id);

    if (postOwner.length === 0) {
      return response.sendStatus(401);
    }
    await postRepository.deleteComments_post(id);

    await postRepository.deletePosts_hastgs(id);

    await postRepository.deletePostLikes(id);

    await postRepository.deletePosts_shared(id);

    await postRepository.deletePost(id, idUser);

    response.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(request, response) {
  try {
    const idUser = response.locals.idUser;

    let infoPost = request.body;

    if (infoPost.description === "" || infoPost.description === undefined) {
      infoPost.description = null;
    }

    let hashtags;

    if (infoPost.description) {
      const postHashtags = getPostHashtags(infoPost.description);

      if (postHashtags) {
        await createHashtagsIfNotExists(postHashtags);

        hashtags = await getHashtagsFromDatabase(postHashtags);
      }
    }

    let linkMetadata = {};

    await urlMetadata(`${infoPost.link}`).then(
      function (metadata) {
        linkMetadata = metadata;
      },
      function (error) {
        console.log(error);
        response.status(404).send("Erro ao cadastrar esse link");
        return;
      }
    );

    await postRepository.createPost(infoPost, linkMetadata, idUser);

    if (infoPost.description && hashtags) {
      await associateHashtagsToPost(idUser, hashtags);
    }

    response.status(201).send();
  } catch (error) {
    console.log(error);
    response.status(500).send();
  }
}

export async function showPosts(request, response) {
  try {
    const page = request.query.page;

    if (page && page < 1) {
      response.status(400).send("Informe uma p??gina v??lida!");
      return;
    }

    const { rows: posts } = await postRepository.showPosts();

    posts.sort(function (a, b) {
      if (a.created_at > b.created_at) {
        return -1;
      } else {
        return true;
      }
    });

    if (posts.length === 0) {
      response.status(204).send("There are no posts yet");
      return;
    }

    const limit = 10;
    const end = page * limit;

    if (posts.length <= 10) {
      response.status(201).send(posts);
      return;
    } else {
      response.status(201).send(posts.slice(0, end));
      return;
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}

export async function allPosts(request, response) {
  try {
    const { rows: posts } = await postRepository.showPosts();

    if (posts.length === 0) {
      response.status(204).send("There are no posts yet");
      return;
    }

    response.status(201).send(posts);
    return;
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}

export async function likePost(request, response) {
  try {
    const idUser = response.locals.idUser;

    const post = request.body;

    if (post.type === "like") {
      await postRepository.likePost(idUser, post);
    } else {
      await postRepository.deslikePost(idUser, post);
    }

    response.status(201).send();
  } catch (error) {
    response.status(500).send();
  }
}

export async function showMyLikes(request, response) {
  try {
    const idUser = response.locals.idUser;

    const { rows: likedPosts } = await postRepository.showMyLikes(idUser);

    response.status(201).send(likedPosts);
  } catch (error) {
    response
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}

export async function howManyLikes(request, response) {
  try {
    const post = request.body;

    const { rows: likedPosts } = await postRepository.howManyLikes(post);

    response.status(201).send(likedPosts);
  } catch (error) {
    response
      .status(500)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}

export async function getPosts(req, res) {
  const NO_RESULTS = 0;
  const DEFAULT_LIMIT = 10;

  const { idUser } = res.locals;
  const { page, limit } = req.query;

  try {
    const followedsIdsResult = await userRepository.getFollowedsIdsByUserId(
      idUser
    );

    const followedsIds = followedsIdsResult.map(({ followedId }) => followedId);

    const offset =
      page && parseInt(page) > 0
        ? (parseInt(page) - 1) * (limit || DEFAULT_LIMIT)
        : 0;

    const posts = await postRepository.getPostsByUsersIds(
      [...followedsIds, idUser],
      {
        offset,
        limit,
      }
    );

    if (
      posts.length === NO_RESULTS &&
      followedsIdsResult.length === NO_RESULTS
    ) {
      res
        .status(httpStatus.NOT_FOUND)
        .send("You don't follow anyone yet. Search for new friends!");
      return;
    } else if (posts.length === NO_RESULTS) {
      res.status(httpStatus.NOT_FOUND).send("No posts found from your friends");
      return;
    }

    res.send(posts);
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
  }
}
