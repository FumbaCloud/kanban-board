import React from 'react';
import {Card} from "@mui/material";
import BoardTask from "./BoardTask";
import {observer} from "mobx-react-lite";
import {Draggable} from "react-beautiful-dnd";

const getStyles = (draggableStyle) => ({
  padding: 8,
  marginBottom: 8,
  ...draggableStyle,
});

const BoardSection = ({section}) => {
  return (
    <div>
      {section?.tasks?.map((task, index) => (
        <Draggable draggableId={task.id.toString()} key={task.id} index={index}>
          {(provided) => (
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getStyles(provided.draggableProps.style)}
            >
              <BoardTask task={task}/>
            </Card>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default observer(BoardSection);
