import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) //for chaining purposes
    .slice(startIndex)
    .take(pageSize)
    .value(); //for converting it into a regular array
}
