import React from "react";

class App extends React.Component {
  render() {
    const daiButton = <dai-button-wrapper widgetId="dai-button" />;
    return <div>{daiButton}</div>;
  }

  componentDidMount() {
    document.getElementById("dai-button")?.addEventListener("click", () => {
      alert("test");
    });
  }
}

export default App;
