import { types } from "mobx-state-tree";
import BoardsStore from "./boards";

export const RootStore = types.model("RootStore", {
  boards: types.optional(BoardsStore, {}),
});

export default RootStore;
