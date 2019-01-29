import React from "react";
import useResources from "./useResources";

const UserList = () => {
  const users = useResources("users");

  return (
    <ul>
      {users.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

export default UserList;
