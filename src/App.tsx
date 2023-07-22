import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const test = () => {
    setCount(count + 1);
  };
  return (
    <>
      <button onClick={test}>count {count} </button>
    </>
  );
}

export default App;
