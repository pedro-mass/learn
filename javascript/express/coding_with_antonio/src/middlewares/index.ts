import { getUserBySessionToken } from "../db/users";
import express from "express";
import { get, merge } from "lodash";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["ANTONIO-AUTH"];

    if (!sessionToken) {
      return res.status(400).json({ msg: "missing session token" });
    }

    // check if user exists
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(400).json({ msg: "user not found" });
    }

    console.log({
      fn: "isAuthenticated",
      existingUser,
    });

    // add user to request
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log({
      fn: "isAuthenticated",
      error,
    });

    return res.sendStatus(400);
  }
};
