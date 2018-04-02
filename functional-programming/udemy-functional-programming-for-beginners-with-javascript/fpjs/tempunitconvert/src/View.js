import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

const { div, h1, pre, p, input, select, option } = hh(h);

const comparisonView = div(
  { className: "fl w-third pa0 center tc" },
  p({ className: "pa0" }, "=")
);

function unitSection(dispatch, className, thing) {
  const { value, unit } = thing;
  const unitOptions = ["Celsius", "Fahrenheit"];
  const options = unitOptions.map(unitOption =>
    option({ selected: unitOption === unit }, unitOption)
  );

  return div({ className }, [
    input({
      className: "pa2 input-reset ba w-100 mb2",
      type: "number",
      value
    }),
    select({ className: "w-100" }, [options])
  ]);
}

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Temperature Unit Converter"),
    unitSection(dispatch, "fl w-third", {
      value: model.leftValue,
      unit: model.leftUnit
    }),
    comparisonView,
    unitSection(dispatch, "fl w-third", {
      value: model.rightValue,
      unit: model.rightUnit
    }),
    pre({ className: "fl w-100" }, JSON.stringify(model, null, 2))
  ]);
}

export default view;
