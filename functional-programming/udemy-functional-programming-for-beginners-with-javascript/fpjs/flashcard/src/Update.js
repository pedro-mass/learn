import * as R from "ramda";

const MSGS = {
  SHOW_ANSWER: "SHOW_ANSWER",
  RANK_CARD: "RANK_CARD",
  SHOW_EDIT: "SHOW_EDIT",
  CANCEL_EDIT: "CANCEL_EDIT",
  SAVE_EDIT: "SAVE_EDIT",
  UPDATE_EDIT: "UPDATE_EDIT",
};

const createActionOnCard = R.curry((type, card) => ({
  type,
  card,
}));

export const showAnswer = createActionOnCard(MSGS.SHOW_ANSWER);
export const showEdit = createActionOnCard(MSGS.SHOW_EDIT);
export const cancelEdit = createActionOnCard(MSGS.CANCEL_EDIT);
export const saveEdit = createActionOnCard(MSGS.SAVE_EDIT);
export const updateEdit = createActionOnCard(MSGS.UPDATE_EDIT);

export const rankCard = R.curry((card, rank) => {
  return {
    type: MSGS.RANK_CARD,
    card,
    rank,
  };
});

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_ANSWER:
      return {
        ...model,
        cards: updateCards(model.cards, msg.card, card => ({
          ...card,
          showAnswer: true,
        })),
      };
    case MSGS.RANK_CARD:
      return {
        ...model,
        cards: updateCards(model.cards, msg.card, card => {
          const newRank =
            msg.rank === "Bad"
              ? 0
              : msg.rank === "Good"
                ? card.rank + 1
                : card.rank + 2;

          return {
            ...card,
            showAnswer: false,
            rank: newRank,
          };
        }),
      };
    case MSGS.SHOW_EDIT:
      return {
        ...model,
        cards: updateCards(model.cards, msg.card, card => {
          return {
            ...card,
            edit: { ...card },
            showEdit: true,
          };
        }),
      };
    case MSGS.CANCEL_EDIT:
      return {
        ...model,
        cards: updateCards(model.cards, msg.card, card => {
          return {
            ...card,
            edit: {},
            showEdit: false,
          };
        }),
      };
    case MSGS.SAVE_EDIT:
      return {
        ...model,
        cards: updateCards(model.cards, msg.card, card => {
          return {
            ...msg.card.edit,
            edit: {},
            showEdit: false,
          };
        }),
      };
    case MSGS.UPDATE_EDIT:
      return {
        ...model,
        cards: updateCards(model.cards, msg.card, () => {
          return {
            ...msg.card,
          };
        }),
      };
    default:
      return model;
  }
}

function updateCards(cards, cardToFind, updateCardFn) {
  return cards.map(card => {
    if (card.id !== cardToFind.id) return card;

    return updateCardFn(card);
  });
}

export default update;
