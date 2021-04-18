import React from "react";

const TableHeader = ({ sortColumn, onSort, columns }) => {
  const onRaise = (path) => {
    const newSortColumn = { ...sortColumn };
    if (path === newSortColumn.path)
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    onSort(newSortColumn);
  };

  const renderSortIcon = (column) => {
    //there is a diffrence between sortColumn and the column
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th
              onClick={() => onRaise(column.path)}
              key={column.path || column.key}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
