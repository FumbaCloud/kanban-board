import React from "react";
import { useStore } from "./hooks/useStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const { boards } = useStore();

  return (
    <div>
      Kanban Board
      {boards.active?.sections?.map((section) => (
        <div key={section.id}>{section.name}</div>
      ))}
    </div>
  );
};

export default observer(App);
