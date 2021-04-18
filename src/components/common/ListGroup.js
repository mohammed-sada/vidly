import React from "react";

const ListGroup = ({
  items,
  selectedItem,
  onItemChange,
  textProperty,
  valueProperty,
}) => {
  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            onClick={() => onItemChange(item)}
            key={item[valueProperty]}
            className={`list-group-item ${
              selectedItem.name === item.name && "active"
            }`}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
