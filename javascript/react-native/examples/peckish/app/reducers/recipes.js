import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

export const searchedRecipes = createReducer(
  {},
  {
    ["SET_SEARCHED_RECIPES"](state, action) {
      let newState = {};
      action.recipes.forEach(recipe => {
        let id = recipe.href;
        newState[id] = Object.assign({}, recipe, { id });
      });
      return newState;
    },
    ["PEDRO"](state, action) {
      const newState = {};

      return newState;
    }
  }
);
