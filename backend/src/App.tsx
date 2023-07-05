import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import bibi from "./images/bibi.jpg";
import { useState } from "react";
import TransformationsMenu from "./components/TransformationsMenu";
function App() {
  let items = ["TOo RGB", "TO BLACK", "EDGE ENCODING","Cartoonification"];
  const onMenuItemClick = (item: string) => console.log(item);
  return (
    <div>
      <TransformationsMenu menuItems={items} onItemClick={onMenuItemClick} />
      <img src={bibi} alt="BIIB" width="1080" height="720" />
    </div>
  );
}
export default App;
