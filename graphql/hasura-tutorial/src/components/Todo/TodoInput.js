import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { GET_MY_TODOS } from "./TodoPrivateList";

const ADD_TODO = gql`
  mutation($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
      }
    }
  }
`;

const TodoInput = ({ isPublic = false }) => {
  let input;
  const [todoInput, setTodoInput] = useState("");
  const resetInput = () => {
    setTodoInput("");
    input.focus();
  };
  const updateCache = (cache, { data }) => {
    if (isPublic) {
      return null;
    }

    const existingTodos = cache.readQuery({
      query: GET_MY_TODOS
    });

    const newTodo = data.insert_todos.returning[0];

    cache.writeQuery({
      query: GET_MY_TODOS,
      data: {
        todos: [newTodo, ...existingTodos.todos]
      }
    });
  };

  return (
    <Mutation mutation={ADD_TODO} update={updateCache} onCompleted={resetInput}>
      {(addTodo, { loading, data }) => (
        <form
          className="formInput"
          onSubmit={e => {
            e.preventDefault();
            addTodo({ variables: { todo: todoInput, isPublic } });
          }}
        >
          <input
            className="input"
            placeholder="What needs to be done?"
            value={todoInput}
            onChange={e => setTodoInput(e.target.value)}
            ref={n => (input = n)}
          />
          <i className="inputMarker fa fa-angle-right" />
        </form>
      )}
    </Mutation>
  );
};

export default TodoInput;
