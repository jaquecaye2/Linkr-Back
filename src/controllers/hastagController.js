import hastagRepository from "../repositories/hastagRepository.js";

export async function hastag(req, res) {
  const { hastag } = req.params;
  const newHastag = hastag?.replace("#", "").trim();

  const page = req.query.page;
  try {
    if (page && page < 1) {
      res.status(400).send("Informe uma página válida!");
      return;
    }

    const findHastag = await hastagRepository.findHastag(newHastag);
    if (findHastag.length == 0) {
      return res.status(404).send("hastag Not Found");
    }

    const { rows: postHastag } = await hastagRepository.redirectHastag(
      newHastag
    );

    const limit = 10;
    const end = page * limit;

    if (postHastag.length <= 10) {
      res.status(200).send(postHastag);
      return;
    } else {
      res.status(200).send(postHastag.slice(0, end));
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("erro na hastag");
  }
}

export async function updateHastagView(req, res) {
  const { hastag } = req.params;
  try {
    const findHastag = await hastagRepository.findHastag(hastag);
    if (findHastag.rowCount == 0) {
      return res.status(404).send("hastag Not Found");
    }
    const sum = findHastag.rows[0].views + 1;
    await hastagRepository.updateView(sum, hastag);
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send("erro na hastag");
  }
}

export async function rankingHastags(req, res) {
  try {
    const { rows: rankig } = await hastagRepository.rankingHastags();

    if (rankig.length === 0) {
      return res.sendStatus(204);
    }
    res.status(200).send(rankig);
  } catch (e) {
    console.log(e);
    res.status(500).send("erro na hastag");
  }
}

export async function allHashtags(req, res) {
  const { hastag } = req.params;
  const newHastag = hastag?.replace("#", "").trim();

  try {
    const findHastag = await hastagRepository.findHastag(newHastag);
    if (findHastag.length == 0) {
      return res.status(404).send("hastag Not Found");
    }

    const { rows: postHastag } = await hastagRepository.redirectHastag(
      newHastag
    );

    res.status(200).send(postHastag);
    return;
  } catch (e) {
    console.log(e);
    res.status(500).send("erro na hastag");
  }
}
