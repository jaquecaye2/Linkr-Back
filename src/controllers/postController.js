import connection from "../db/db.js";

export async function cratePost(request, response) {
  try {
    response.status(201).send();
  } catch (error) {
    response.status(500).send();
  }
}

export async function showPosts(request, response) {
  try {
    response.status(201).send();
  } catch (error) {
    response.status(500).send();
  }
}
