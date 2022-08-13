import urlMetadata from "url-metadata";

import postRepository from "../repositories/postRepository.js";
import hastagRepository from "../repositories/hastagRepository.js";

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

export async function createPost(request, response) {
  try {
    const idUser = response.locals.idUser;

    let infoPost = request.body;

    if (infoPost.description === "" || infoPost.description === undefined) {
      infoPost.description = null;
    }

    const postHashtags = getPostHashtags(infoPost.description);

    let hashtags;

    if (postHashtags) {
      await createHashtagsIfNotExists(postHashtags);

      hashtags = await getHashtagsFromDatabase(postHashtags);
    }

    let linkMetadata = {};

    await urlMetadata(`${infoPost.link}`).then(
      function (metadata) {
        linkMetadata = metadata;
      },
      function (error) {
        console.log(error);
      }
    );

    await postRepository.createPost(infoPost, linkMetadata, idUser);

    if (hashtags) {
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
    const { rows: posts } = await postRepository.showPosts();

    if (posts.length === 0) {
      response.status(204).send("There are no posts yet");
      return;
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
