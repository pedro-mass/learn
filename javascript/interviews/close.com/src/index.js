import React, { Fragment, useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Implement a feature to allow item selection with the following requirements:
// [x] Clicking an item selects/unselects it.
// [x] Multiple items can be selected at a time.
// [?] Make sure to AVOID UNNECESSARY RE-RENDERS (performance).
// [?] Currently selected items should be visually highlighted.
// [x] Currently selected items' names should be shown at the top of the page.

const getSeparator = index => (index > 0 ? ", " : "");
const SelectedItems = ({ names = [], onClick = name => name }) => {
  const handleClick = name => () => onClick(name);
  return (
    <Fragment>
      <h1>Selected:</h1>
      {/* pedro: switch to ul/li since that's semantically the correct way. Would I still be able to get CSV value? */}
      <p>
        {names.map((name, i) => (
          <span key={name} className="clickable" onClick={handleClick(name)}>
            {getSeparator(i) + name}
          </span>
        ))}
      </p>
    </Fragment>
  );
};

const ItemList = ({
  items = [],
  isSelected = () => false,
  onClick = name => name
}) => {
  const handleClick = name => () => onClick(name);
  return (
    <ul className="List">
      {items.map(({ name, color }) => (
        <li
          key={name}
          className={`List__item List__item--${color} ${
            isSelected(name) ? "highlight" : ""
          }`}
          onClick={handleClick(name)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

const removeFromArray = (array = [], value) => {
  const sliceIndex = array.indexOf(value);
  if (sliceIndex < 0) return array;
  return array.slice(0, sliceIndex).concat(array.slice(sliceIndex + 1));
};

const types = {
  add: "add",
  remove: "remove",
  process: "process"
};
const selectedReducer = (state = [], action = {}) => {
  const isIncluded = () => state.includes(action.payload);
  const add = () => {
    if (isIncluded()) return state;
    return [...state, action.payload];
  };
  const remove = () => removeFromArray(state, action.payload);

  switch (action.type) {
    case types.add:
      return add();
    case types.remove:
      return remove();
    case types.process:
      return isIncluded() ? remove() : add();
    default:
      return state;
  }
};

const List = ({ items }) => {
  const [selectedNames, dispatch] = useReducer(selectedReducer, []);

  const removeItem = name =>
    dispatch({
      type: types.remove,
      payload: name
    });
  const addOrRemoveItem = name =>
    dispatch({
      type: types.process,
      payload: name
    });
  const isSelected = itemName => selectedNames.includes(itemName);

  return (
    <Fragment>
      {selectedNames.length > 0 && (
        <SelectedItems names={selectedNames} onClick={removeItem} />
      )}
      <ItemList
        items={items}
        onClick={addOrRemoveItem}
        isSelected={isSelected}
      />
    </Fragment>
  );
};

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ["tiny", "small", "medium", "large", "huge"];
const colors = [
  "navy",
  "blue",
  "aqua",
  "teal",
  "olive",
  "green",
  "lime",
  "yellow",
  "orange",
  "red",
  "maroon",
  "fuchsia",
  "purple",
  "silver",
  "gray",
  "black"
];
const fruits = [
  "apple",
  "banana",
  "watermelon",
  "orange",
  "peach",
  "tangerine",
  "pear",
  "kiwi",
  "mango",
  "pineapple"
];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color
            }
          ],
          []
        )
      ],
      []
    )
  ],
  []
);

ReactDOM.render(<List items={items} />, document.getElementById("root"));
