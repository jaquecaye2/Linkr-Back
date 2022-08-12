
import userRepository from "../repositories/userRepository.js";
import httpStatus from "../utils/httpStatus.js";

async function getUsers(req, res) {
  const ZERO = 0;
  const { name = "" } = req.query;

  try {
    const users = await userRepository.getUsersWithName(name);

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
    const isUserExistent = await userRepository.verifyUserId(id)

    if (!isUserExistent[0]) {
      return res.sendStatus(httpStatus.NOT_FOUND)
    }
    const user = await userRepository.getUsersWithId(id)

    res.status(httpStatus.OK).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default {
  redirectToUser,
  getUsers
  
};
