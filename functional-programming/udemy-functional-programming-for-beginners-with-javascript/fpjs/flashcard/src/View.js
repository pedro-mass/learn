import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import * as UpdateService from "./Update";

const { div, h1, pre, p, button, i, textarea } = hh(h);

function renderEditText(label, value, oninput) {
  return div({ className: "" }, [
    p({ className: "b f6 mv1" }, label),
    textarea({
      className: "w-100 pa1 bg-washed-yellow outline-0",
      value,
      oninput: e => oninput(e.target.value),
    }),
  ]);
}

function renderEditCard(dispatch, card) {
  return div({ className: "" }, [
    renderEditText("Question", card.edit.question, question =>
      dispatch(
        UpdateService.updateEdit({ ...card, edit: { ...card.edit, question } })
      )
    ),
    renderEditText("Answer", card.edit.answer, answer =>
      dispatch(
        UpdateService.updateEdit({ ...card, edit: { ...card.edit, answer } })
      )
    ),
    button(
      {
        className: "f4 ph3 pv2 br1 bg-blue bn white mv2 mr2",
        onclick: () => dispatch(UpdateService.saveEdit(card)),
      },
      "Save"
    ),
    button(
      {
        className: "f4 ph3 pv2 br1 bg-red bn white mv2",
        onclick: () => dispatch(UpdateService.cancelEdit(card)),
      },
      "Cancel"
    ),
  ]);
}

function renderViewCard(dispatch, card) {
  return div([
    renderEditableText("Question", card.question, dispatch, card),
    renderHiddenElement(card.showAnswer, renderShowAnswerLink(dispatch, card), [
      renderEditableText("Answer", card.answer, dispatch, card),
      renderRatings(dispatch, card),
    ]),
  ]);
}

function renderRatings(dispatch, card) {
  const onclick = R.compose(dispatch, UpdateService.rankCard(card));

  return div({ className: "mv2 flex justify-between" }, [
    button(
      {
        className: "f4 ph3 pv2 bg-red bn white br1",
        onclick: () => onclick("Bad"),
      },
      "Bad"
    ),
    button(
      {
        className: "f4 ph3 pv2 bg-blue bn white br1",
        onclick: () => onclick("Good"),
      },
      "Good"
    ),
    button(
      {
        className: "f4 ph3 pv2 bg-dark-green bn white br1",
        onclick: () => onclick("Great"),
      },
      "Great"
    ),
  ]);
}

function renderShowAnswerLink(dispatch, card) {
  return p(
    {
      className: "mv1 f6 underline link pointer pb5",
      onclick: () => dispatch(UpdateService.showAnswer(card)),
    },
    "Show Answer"
  );
}

function renderHiddenElement(showHidden, visible, hidden) {
  return showHidden ? hidden : visible;
}

function renderEditableText(label, value, dispatch, card) {
  return div({ className: "" }, [
    p({ className: "b f6 mv1 underline ma0" }, label),
    p(
      {
        className: "pointer ma0 bg-animate hover-bg-moon-gray",
        onclick: () => dispatch(UpdateService.showEdit(card)),
      },
      value
    ),
  ]);
}

function renderCard(dispatch, card) {
  const cardContent = card.showEdit
    ? renderEditCard(dispatch, card)
    : renderViewCard(dispatch, card);

  return div(
    { className: "w-third pa2" },
    div({ className: "w-100 pa2 bg-light-yellow shadow-1 mv2 relative" }, [
      cardContent,
      i({
        className: "absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer",
      }),
    ])
  );
}

function renderCardList(dispatch, cards) {
  return div(
    { className: "flex flex-wrap nl2 nr2" },
    cards.map(card => renderCard(dispatch, card))
  );
}

function renderAddCardButton(dispatch) {
  return button({ className: "pa2 br1 mv2 bg-green bn white" }, [
    i({ className: "fa fa-plus ph1" }),
    "Add Flashcard",
  ]);
}

function view(dispatch, model) {
  const cards = R.sortBy(R.prop("rank"), model.cards);

  return div({ className: "mw8 center" }, [
    h1({ className: "f2 pv2 bb" }, "Flashcard Study"),
    renderAddCardButton(dispatch),
    renderCardList(dispatch, cards),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
