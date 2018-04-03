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

function update(msg, model) {
  switch (msg.type) {
    case MSGS.BILL_AMOUNT:
      const billAmount = convertToNumber(msg.billAmount);
      return updateCalculations({ ...model, billAmount });
    case MSGS.TIP_PERCENT:
      const tipPercent = convertToNumber(msg.tipPercent);
      return updateCalculations({ ...model, tipPercent });
  }

  return model;
}

function convertToNumber(value) {
  return R.pipe(parseInt, R.defaultTo(0))(value);
}

function updateCalculations(model) {
  return R.pipe(calculateTip, calculateTotal)(model);
}

function calculateTip(model) {
  const { billAmount, tipPercent } = model;
  const tip = billAmount * tipPercent / 100;
  return { ...model, tip };
}

function calculateTotal(model) {
  const { billAmount, tip } = model;
  const total = billAmount + tip;
  return { ...model, total };
}

export default update;
