import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    // check fields
    if (!email || !password) {
      return res
        .json({
          error: "Missing fields",
          fields: {
            email: !email,
            password: !password,
          },
        })
        .status(400);
    }

    // check if user exists
    const user = await getUserByEmail(email)
      // gives us the salt and password
      .select("+authentication.salt +authentication.password");
    if (!user) {
      return res.sendStatus(404);
    }

    // check password
    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(401);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("ANTONIO-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log({
      fn: "login",
      error,
    });

    res.json({ error }).status(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, userName } = req.body;

    // check if missing fields
    if (!email || !password || !userName) {
      return res
        .json({
          error: "Missing fields",
          fields: {
            email: !email,
            password: !password,
            userName: !userName,
          },
        })
        .status(400);
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
