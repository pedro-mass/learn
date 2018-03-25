import uuid from "uuid";

import database from "./firebase.config";

export default database;

export const addTaskToFirebase = task => {
  const id = uuid();
  database.ref(`/${id}`).set({
    task,
    id
  });
};
export const removeTaskFromFirebase = id => {
  database.ref(`/${id}`).remove();
};
