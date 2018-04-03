import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import { billAmountMsg, tipPercentMsg } from "./Update";

const { div, h1, pre, label, input, p } = hh(h);

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

function labelSet(labelText, value) {
  return div({ className: "flex justify-between" }, [
    p({ className: "ma1" }, labelText),
    p({ className: "ma1" }, R.pipe(addDecimalPlaces, convertToCurrency)(value))
  ]);
}

function addDecimalPlaces(number) {
  // pedro: implement this to change to 2 decimal places
  return number;
}

function convertToCurrency(number) {
  return `$${number}`;
}

function calculationView(model) {
  return div({ className: "mt3" }, [
    labelSet("Tip:", model.tip),
    labelSet("Total:", model.total)
  ]);
}

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Tip Calculator"),
    formView(dispatch, model),
    calculationView(model)
    // pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
