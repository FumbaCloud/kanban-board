import {types, flow, onSnapshot, cast, getParent} from "mobx-state-tree";

import api from "../api";

const BoardTask = types.model("BoardTask", {
  id: types.identifier,
  title: types.string,
  date: types.string,
  description: types.string,
  tags: types.array(types.string),
});

const BoardSection = types.model("BoardSection", {
  id: types.identifier,
  name: types.string,
  tasks: types.array(types.maybe(BoardTask)),
}).actions(self => ({
  load: flow(function* () {
    const {id: boardId} = getParent(self, 2);
    const {id: statusId} = self;

    const {tasks} = yield api.get(`boards/${boardId}/tasks/${statusId}`);

    self.tasks = cast(tasks);

    onSnapshot(self, self.update);
  }),
  update: flow(function* ({tasks}) {
    const {id: boardId} = getParent(self, 2);
    const {id: statusId} = self;

    yield api.put(`boards/${boardId}/tasks/${statusId}`, {tasks})
  }),
  afterCreate() {
    self.load();
  }
}))

const Board = types.model("Board", {
  id: types.identifier,
  name: types.string,
  sections: types.array(BoardSection),
}).actions(self => ({
  moveTask(source, destination, id) {
    const sectionFrom = self.sections.find(section => section.id === source.droppableId);
    const sectionTo = self.sections.find(section => section.id === destination.droppableId);

    const taskToMoveIndex = sectionFrom.tasks.findIndex(task => task.id === id);
    const [taskToMove] = sectionFrom.tasks.splice(taskToMoveIndex, 1);

    sectionTo.tasks.splice(destination.index, 0, taskToMove.toJSON());
  }
}));

const BoardsStore = types.model("BoardsStore", {
  boards: types.maybe(types.array(Board)),
  active: types.safeReference(Board),
}).actions((self) => ({
  load: flow(function* () {
    self.boards = yield api.get("boards");
    self.active = 1;
  }),
  afterCreate() {
    self.load();
  },
}));

export default BoardsStore;
