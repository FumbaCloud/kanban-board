import React from "react";
import {observer} from "mobx-react-lite";

import Board from "./components/Board/Board";

const App = () => (
  <Board/>
);

export default observer(App);
