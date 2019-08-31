import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Implement a feature to allow item selection with the following requirements:
// [x] Clicking an item selects/unselects it.
// [x] Multiple items can be selected at a time.
// [ ] Make sure to AVOID UNNECESSARY RE-RENDERS (performance).
// [?] Currently selected items should be visually highlighted.
// [x] Currently selected items' names should be shown at the top of the page.

const getSeparator = index => (index > 0 ? ", " : "");
const SelectedItems = ({ names = [], onClick = name => () => name }) => (
  <Fragment>
    <h1>Selected:</h1>
    {/* pedro: switch to ul/li since that's semantically the correct way. Would I still be able to get CSV value? */}
    <div>
      {names.map((name, i) => (
        <span key={name} className="clickable" onClick={onClick(name)}>
          {getSeparator(i) + name}
        </span>
      ))}
    </div>
  </Fragment>
);

const ItemList = ({
  items = [],
  isSelected = () => false,
  onClick = name => () => name
}) => (
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

const removeFromArray = (array = [], value) => {
  const sliceIndex = array.indexOf(value);
  if (sliceIndex < 0) return array;
  return array.slice(0, sliceIndex).concat(array.slice(sliceIndex + 1));
};

const List = ({ items }) => {
  const [selectedNames, setSelectedNames] = useState([]);

  const isSelected = itemName => selectedNames.includes(itemName);
  const addItem = itemName =>
    !isSelected(itemName) &&
    setSelectedNames(prevSelected => prevSelected.concat([itemName]));
  const removeItem = itemName =>
    setSelectedNames(prevSelected => removeFromArray(prevSelected, itemName));

  const handleClick = itemName => () =>
    isSelected(itemName) ? removeItem(itemName) : addItem(itemName);
  const removeItemOnClick = itemName => () => removeItem(itemName);

  return (
    <Fragment>
      {selectedNames.length > 0 && (
        <SelectedItems names={selectedNames} onClick={removeItemOnClick} />
      )}
      <ItemList items={items} onClick={handleClick} isSelected={isSelected} />
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
