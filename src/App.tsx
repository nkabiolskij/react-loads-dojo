import React from "react";
import { ReactDojoAnker } from "./ReactDojoAnker";

const App: React.FunctionComponent = () => {
  return (
    <ReactDojoAnker
      onClick={() => {
        alert("call back from React");
      }}
    ></ReactDojoAnker>
  );
};

export default App;
