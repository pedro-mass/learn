import * as R from "ramda";

const MSGS = {
  LEFT_VALUE_INPUT: "LEFT_VALUE_INPUT",
  RIGHT_VALUE_INPUT: "RIGHT_VALUE_INPUT",
  LEFT_UNIT_CHANGED: "LEFT_UNIT_SELECT",
  RIGHT_UNIT_CHANGED: "RIGHT_UNIT_SELECT"
};

export function leftValueInputMsg(leftValue) {
  return {
    type: MSGS.LEFT_VALUE_INPUT,
    leftValue
  };
}

export function rightValueInputMsg(rightValue) {
  return {
    type: MSGS.RIGHT_VALUE_INPUT,
    rightValue
  };
}

export function leftUnitChangedMsg(leftUnit) {
  return {
    type: MSGS.LEFT_UNIT_CHANGED,
    leftUnit
  };
}

export function rightUnitChangedMsg(rightUnit) {
  return {
    type: MSGS.RIGHT_UNIT_CHANGED,
    rightUnit
  };
}

const toInt = R.pipe(parseInt, R.defaultTo(0));

function update(msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_VALUE_INPUT:
      if (msg.leftValue === "")
        return { ...model, sourceLeft: true, leftValue: "", rightValue: "" };
      const leftValue = toInt(msg.leftValue);
      return { ...model, sourceLeft: true, leftValue };
    case MSGS.RIGHT_VALUE_INPUT:
      if (msg.rightValue === "")
        return { ...model, sourceLeft: true, leftValue: "", rightValue: "" };
      const rightValue = toInt(msg.rightValue);
      return { ...model, sourceLeft: false, rightValue };
    case MSGS.LEFT_UNIT_CHANGED:
      const { leftUnit } = msg;
      return { ...model, leftUnit, sourceLeft: true };
    case MSGS.RIGHT_UNIT_CHANGED:
      const { rightUnit } = msg;
      return { ...model, rightUnit, sourceLeft: false };
  }
  return model;
}

export default update;
