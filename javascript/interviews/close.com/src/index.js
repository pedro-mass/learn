import React, { Fragment, useState, memo } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Implement a feature to allow item selection with the following requirements:
// [x] Clicking an item selects/unselects it.
// [x] Multiple items can be selected at a time.
// [ ] Make sure to AVOID UNNECESSARY RE-RENDERS (performance).
// [?] Currently selected items should be visually highlighted.
// [x] Currently selected items' names should be shown at the top of the page.

const SelectedItems = memo(({ names = [], onClick }) => {
  const getSeparator = index => (index > 0 ? ", " : "");

  return (
    <Fragment>
      <h1>Selected:</h1>
      <div>
        {names.map((name, i) => (
          <span key={name} className="clickable" onClick={onClick(name)}>
            {getSeparator(i) + name}
          </span>
        ))}
      </div>
    </Fragment>
  );
});

const Items = memo(({ items, isSelected, onClick }) => {
  return (
    <ul className="List">
      {items.map(({ name, color }) => (
        <li
          key={name}
          className={`List__item List__item--${color} ${
            isSelected(name) ? "highlight" : ""
          }`}
          onClick={onClick(name)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
});

const List = ({ items }) => {
  const [selectedNames, setSelectedNames] = useState([]);

  const isSelected = itemName => selectedNames.includes(itemName);
  const addItem = itemName =>
    !isSelected(itemName) &&
    setSelectedNames(prevSelected => prevSelected.concat([itemName]));
  const removeItem = itemName =>
    setSelectedNames(prevSelected => {
      const sliceIndex = prevSelected.indexOf(itemName);
      return prevSelected
        .slice(0, sliceIndex)
        .concat(prevSelected.slice(sliceIndex + 1));
    });

  const handleClick = itemName => () =>
    isSelected(itemName) ? removeItem(itemName) : addItem(itemName);
  const removeItemOnClick = itemName => () => removeItem(itemName);

  return (
    <Fragment>
      <SelectedItems names={selectedNames} onClick={removeItemOnClick} />
      <Items items={items} onClick={handleClick} isSelected={isSelected} />
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
