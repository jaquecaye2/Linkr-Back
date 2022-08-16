import userRepository from "../repositories/userRepository.js";
import httpStatus from "../utils/httpStatus.js";

async function getUsers(req, res) {
  const ZERO = 0;
  const { name = "" } = req.query;

  try {
    const users = await userRepository.getUsersWithName(name);

    console.log(users);

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
  const { id } = req.params;
  try {
    const isUserExistent = await userRepository.verifyUserId(id);

    if (!isUserExistent[0]) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    const user = await userRepository.getUsersWithId(id);

    res.status(httpStatus.OK).send(user);
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
};
