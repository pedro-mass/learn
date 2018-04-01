import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import {
  showFormMsg,
  caloriesInputMessage,
  mealInputMessage,
  saveMealMsg
} from "./Update";

const {
  pre,
  div,
  h1,
  button,
  form,
  label,
  input,
  table,
  thead,
  tr,
  th,
  tbody,
  td
} = hh(h);

function fieldSet(labelText, inputValue, oninput) {
  return div([
    label({ className: "db mb1" }, labelText),
    input({
      className: "pa2 input-reset ba w-100 mb2",
      type: "text",
      value: inputValue,
      oninput
    })
  ]);
}

function buttonSet(dispatch) {
  return div([
    button(
      {
        className: "f3 pv2 ph3 bg-blue white bn mr2 dim",
        type: "submit"
      },
      "Save"
    ),
    button(
      {
        className: "f3 pv2 ph3 bg-light-gray bn dim",
        type: "button",
        onclick: () => dispatch(showFormMsg(false))
      },
      "Cancel"
    )
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if (showForm) {
    return form(
      {
        className: "w-100 mv2",
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveMealMsg);
        }
      },
      [
        fieldSet("Meal", description, e =>
          dispatch(mealInputMessage(e.target.value))
        ),
        fieldSet("Calories", calories || "", e =>
          dispatch(caloriesInputMessage(e.target.value))
        ),
        buttonSet(dispatch)
      ]
    );
  }

  return button(
    {
      className: "f3 pv2 ph3 bg-blue white bn",
      onclick: () => dispatch(showFormMsg(true))
    },
    "Add Meal"
  );
}

function tableView(dispatch, model) {
  return table([tableHeader(), mealsBody(dispatch, model)]);
}

function tableHeader() {
  return thead(tr([th("Meal"), th("Calories")]));
}

function mealsBody(dispatch, model) {
  const rows = model.meals.map(meal => mealRow(dispatch, meal));
  return tbody([...rows, totalRow(dispatch, model)]);
}

function mealRow(dispatch, meal) {
  return tr([cell(meal.description), cell(meal.calories)]);
}

function cell(value) {
  return td([value]);
}

function totalRow(dispatch, model) {
  const total = model.meals.reduce((acc, meal) => acc + meal.calories || 0, 0);
  return tr([cell("total"), cell(total)]);
}

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Calorie Counter"),
    formView(dispatch, model),
    tableView(dispatch, model),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
