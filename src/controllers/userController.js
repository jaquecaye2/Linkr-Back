
import userRepository from "../repositories/userRepository.js";
import httpStatus from "../utils/httpStatus.js";

async function getUsers(req, res) {
  const ZERO = 0;
  const { name = "" } = req.query;

  try {
    const users = await userRepository.getUsersWithName(name);

    console.log(users)

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

  const page  = req.query.page

  try {
    if (page && page < 1){
      res.status(400).send("Informe uma página válida!")
      return
    }

    const isUserExistent = await userRepository.verifyUserId(id)

    if (!isUserExistent[0]) {
      return res.sendStatus(httpStatus.NOT_FOUND)
    }
    
    const user = await userRepository.getUsersWithId(id)

    const limit = 10
    const end = page * limit

    if (user.length <= 10){
      res.status(httpStatus.OK).send(user);
      return
    } else {
      res.status(httpStatus.OK).send(user.slice(0, end))
      return
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default {
  redirectToUser,
  getUsers
};
