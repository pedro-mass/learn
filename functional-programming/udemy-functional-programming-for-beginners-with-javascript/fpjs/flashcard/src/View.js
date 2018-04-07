import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

const { div, h1, pre, p, button, i, textarea } = hh(h);

function renderEditText(label, value) {
  return div({ className: "" }, [
    p({ className: "b f6 mv1" }, label),
    textarea({ className: "w-100 pa1 bg-washed-yellow outline-0", value })
  ]);
}

function renderEditCard(dispatch, card) {
  return div({ className: "" }, [
    renderEditText("Question", card.question),
    renderEditText("Answer", card.answer),
    button({ className: "f4 ph3 pv2 br1 bg-gray bn white mv2" }, "Save")
  ]);
}

function renderViewCard(dispatch, card) {
  return div([
    renderEditableText("Question", card.question),
    renderHiddenElement(card.showAnswer, renderShowAnswerLink(), [
      renderEditableText("Answer", card.answer),
      renderRatings()
    ])
  ]);
}

function renderRatings() {
  return div({ className: "mv2 flex justify-between" }, [
    button({ className: "f4 ph3 pv2 bg-red bn white br1" }, "Bad"),
    button({ className: "f4 ph3 pv2 bg-blue bn white br1" }, "Good"),
    button({ className: "f4 ph3 pv2 bg-dark-green bn white br1" }, "Great")
  ]);
}

function renderShowAnswerLink() {
  return p({ className: "mv1 f6 underline link pointer pb5" }, "Show Answer");
}

function renderHiddenElement(showHidden, visible, hidden) {
  return showHidden ? hidden : visible;
}

function renderEditableText(label, value) {
  return div({ className: "" }, [
    p({ className: "b f6 mv1 underline ma0" }, label),
    p({ className: "pointer ma0" }, value)
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
        className: "absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer"
      })
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
    "Add Flashcard"
  ]);
}

function view(dispatch, model) {
  return div({ className: "mw8 center" }, [
    h1({ className: "f2 pv2 bb" }, "Flashcard Study"),
    renderAddCardButton(dispatch),
    renderCardList(dispatch, model.cards),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
