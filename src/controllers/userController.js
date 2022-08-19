import userRepository from "../repositories/userRepository.js";
import httpStatus from "../utils/httpStatus.js";

async function getUsers(req, res) {
  const ZERO = 0;
  const { name = "" } = req.query;
  const { idUser } = res.locals;

  try {
    const users = await userRepository.getUsersWithName(idUser, name);

    if (users.length === ZERO) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function redirectToUser(req, res) {
  const { idUser: idLoggedUser } = res.locals;
  const { id } = req.params;

  const page = req.query.page;

  try {
    if (page && page < 1) {
      res.status(400).send("Informe uma página válida!");
      return;
    }

    const isUserExistent = await userRepository.verifyUserId(id);

    if (!isUserExistent[0]) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    const user = await userRepository.getUsersWithId(idLoggedUser, id);

    const limit = 10;
    const end = page * limit;

    if (user.posts.length <= 10) {
      res.status(httpStatus.OK).send(user);
      return;
    } else {
      user.posts = user.posts.slice(0, end);

      res.status(httpStatus.OK).send(user);
      return;
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function allPosts(req, res) {
  const { idUser: idLoggedUser } = res.locals;
  const { id } = req.params;

  try {
    const isUserExistent = await userRepository.verifyUserId(id);

    if (!isUserExistent[0]) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    const user = await userRepository.getUsersWithId(idLoggedUser, id);

    res.status(httpStatus.OK).send(user);
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function follow(req, res) {
  const { idUser: idLoggedUser } = res.locals;
  const id = parseInt(req.params.id);

  if (idLoggedUser === id) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send("It's not possible to follow yourself");

    return;
  }

  try {
    const [userExists] = await userRepository.verifyUserId(id);

    if (!userExists) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    const alreadyFollow = await userRepository.checkFollow(idLoggedUser, id);

    if (alreadyFollow) {
      res.status(httpStatus.BAD_REQUEST).send("You already follow this user");
      return;
    }

    await userRepository.follow(idLoggedUser, id);

    res.sendStatus(httpStatus.OK);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function unfollow(req, res) {
  const { idUser: idLoggedUser } = res.locals;
  const id = parseInt(req.params.id);

  if (idLoggedUser === id) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send("It's not possible to unfollow yourself");

    return;
  }

  try {
    const [userExists] = await userRepository.verifyUserId(id);

    if (!userExists) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    const alreadyFollow = await userRepository.checkFollow(idLoggedUser, id);

    if (!alreadyFollow) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send("You still don't follow this user");
      return;
    }

    await userRepository.unfollow(idLoggedUser, id);

    res.sendStatus(httpStatus.OK);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default {
  redirectToUser,
  getUsers,
  follow,
  unfollow,
  allPosts,
};
