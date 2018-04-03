import * as R from "ramda";

const MSGS = {
  BILL_AMOUNT: "BILL_AMOUNT",
  TIP_PERCENT: "TIP_PERCENT"
};

export function billAmountMsg(billAmount) {
  return {
    type: MSGS.BILL_AMOUNT,
    billAmount
  };
}

export function tipPercentMsg(tipPercent) {
  return {
    type: MSGS.TIP_PERCENT,
    tipPercent
  };
}

export default function update(msg, model) {
  switch (msg.type) {
    case MSGS.BILL_AMOUNT:
      const { billAmount } = msg;
      return { ...model, billAmount };
    case MSGS.TIP_PERCENT:
      const { tipPercent } = msg;
      return { ...model, tipPercent };
    default:
      return model;
  }
}
