import { createUser, getUserByEmail } from "db/users";
import express from "express";
import { authentication, random } from "helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, userName } = req.body;

    // check if missing fields
    if (!email || !password || !userName) {
      return res.sendStatus(400);
    }

    // check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(409);
    }

    // create user
    const salt = random();
    const user = await createUser({
      email,
      userName,
      authentication: { salt, password: authentication(salt, password) },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log({
      fn: "register",
      error,
    });

    return res.sendStatus(400);
  }
};
