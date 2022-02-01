import { flow, types } from "mobx-state-tree";

import api from "../api";

const BoardTask = types.model("BoardTask", {
  id: types.identifierNumber,
  tag: types.string,
  date: types.string,
  descriptions: types.string,
});

const BoardSection = types.model("BoardSection", {
  id: types.identifierNumber,
  name: types.string,
  tasks: types.array(types.maybe(BoardTask)),
});

const Board = types.model("Board", {
  id: types.identifierNumber,
  name: types.string,
  sections: types.array(BoardSection),
});

const BoardsStore = types
  .model("BoardsStore", {
    boards: types.maybe(types.array(Board)),
    active: types.safeReference(Board),
  })
  .actions((self) => ({
    load: flow(function* () {
      self.boards = yield api.get("boards");
      self.active = 0;
    }),
    afterCreate() {
      self.load();
    },
  }));

export default BoardsStore;
