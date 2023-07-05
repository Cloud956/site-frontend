import { Fragment, MouseEvent, useState } from "react";
interface ListGroupProps {
  items: string[];
  title: string;
  onSelectItem: (item: string) => void;
}
function ListGroup({ items, title, onSelectItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const itemlist = items.map((item, index) => (
    <li
      className={
        selectedIndex === index ? "list-group-item active" : "list-group-item"
      }
      key={item}
      onClick={() => {
        setSelectedIndex(index);
        onSelectItem(item);
      }}
    >
      {item}
    </li>
  ));

  return (
    <>
      <h1>{title}</h1>
      <ul className="list-group">{itemlist}</ul>
    </>
  );
}

export default ListGroup;
