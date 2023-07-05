import Alert from "./components/Alert";
import Button from "./components/Layout/LeftPanel/MyButton";
import bibi from "./images/bibi.jpg";
import { useState } from "react";
import MainPageBox from "./components/MainPageBox";
import MainPage from "./components/MainPage";
import ImageBox from "./components/ImageBox";
import "./App.css";
function App() {
  const mainPageBox = MainPageBox();

  return (
    <div className="full-page">
      <MainPage />
    </div>
  );
}
export default App;
