import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CardList from "../components/CardList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CardList />
    </>
  );
}

export default App;
