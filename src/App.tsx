import React from "react";

class App extends React.Component {
  render() {
    return (
      <demo-wrapper id="demo-button"></demo-wrapper>
    );
  }

  componentDidMount() {
    document.getElementById("demo-button")?.addEventListener("click", () => {
      console.log('here');
    });
  }
}

export default App;
