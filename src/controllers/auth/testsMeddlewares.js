export function tests(req, res) {
  const idUser = res.locals.idUser;

  return res.send("idUser");
}
