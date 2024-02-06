import express from "express";

import { getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log({ fn: "getAllUsers", error });
    res.status(400).json({ error });
  }
};
