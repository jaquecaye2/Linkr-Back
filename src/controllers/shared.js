import sharedRepository from "../repositories/sharedRepository.js";

export async function shared(req, res) {
  const idUser = res.locals.idUser;
  const { idPost } = req.body;

  const { rowCount: isUser } = await sharedRepository.isUser(idUser);
  const { rowCount: isPost } = await sharedRepository.isPost(idPost);

  if (isUser === 0 || isPost === 0) {
    return res.sendStatus(404);
  }

  const idShared = await sharedRepository.insertShared(idUser);

  await sharedRepository.insertSharedsPosts(idShared, idPost);

  return res.sendStatus(200);
}

export async function countShared(req, res) {
  const { idPost } = req.body;

  const numberShares = await sharedRepository.numberShares(idPost);

  if (!numberShares) {
    return res.sendStatus(200);
  }

  return res.status(200).send({ numberShares });
}
