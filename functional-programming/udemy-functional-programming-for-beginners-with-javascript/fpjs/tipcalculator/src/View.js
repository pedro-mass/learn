import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import { billAmountMsg, tipPercentMsg } from "./Update";

const { div, h1, pre, label, input, p } = hh(h);

const round = places =>
  R.pipe(
    num => num * Math.pow(10, places),
    Math.round,
    num => num * Math.pow(10, -1 * places)
  );

const formatMoney = R.curry((symbol, places, number) =>
  R.pipe(
    R.defaultTo(0),
    round(places),
    num => num.toFixed(places),
    R.concat(symbol)
  )(number)
);

function fieldSet(labelText, inputValue, oninput) {
  return div([
    label({ className: "db mb1" }, labelText),
    input({
      className: "pa2 input-reset ba w-100 mb2 tr",
      type: "text",
      value: inputValue,
      oninput
    })
  ]);
}

function formView(dispatch, model) {
  return div([
    fieldSet("Bill Amount", model.billAmount, e =>
      dispatch(billAmountMsg(e.target.value))
    ),
    fieldSet("Tip %", model.tipPercent, e =>
      dispatch(tipPercentMsg(e.target.value))
    )
  ]);
}

function calcTipAndTotal(billAmount, tipPercent) {
  const bill = parseFloat(billAmount);
  const tip = bill * parseFloat(tipPercent) / 100 || 0;
  return [tip, bill + tip];
}

function calculatedAmounts(tip, total) {
  return div({ className: "w-40 b bt mt2 pt2" }, [
    calculatedAmount("Tip:", tip),
    calculatedAmount("Total:", total)
  ]);
}

function calculatedAmount(description, amount) {
  return div({ className: "flex w-100" }, [
    div({ className: "w-50 pv1 pr2" }, description),
    div({ className: "w-50 tr pv1 pr2" }, amount)
  ]);
}

function view(dispatch, model) {
  const { billAmount, tipPercent } = model;

  const [tip, total] = calcTipAndTotal(billAmount, tipPercent);

  const toMoney = formatMoney("$", 2);

  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Tip Calculator"),
    formView(dispatch, model),
    calculatedAmounts(toMoney(tip), toMoney(total))
  ]);
}

export default view;
