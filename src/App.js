import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Game from "./components/Game";
import "./styles.css";

const App = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

export default App;
