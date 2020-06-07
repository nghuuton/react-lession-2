import React, { Component } from "react";
class ListGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      items,
      textProperty,
      valueProperty,
      onItemSelect,
      selectedItem,
    } = this.props;
    return (
      <div className="card" with={18}>
        <ul className="list-group list-group-flush">
          {items.map((i) => (
            <li
              key={i[valueProperty]}
              onClick={() => onItemSelect(i)}
              className={
                i === selectedItem
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {i[textProperty]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
