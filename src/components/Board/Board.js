import React, {useCallback} from 'react';
import {observer} from "mobx-react-lite";
import {Box, Grid, Paper, Typography} from "@mui/material";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

import {useStore} from "../../hooks/useStore";

import BoardSection from "./BoardSection";

const getStyle = (isDraggingOver) => ({
  padding: 8,
  minHeight: 500,
  backgroundColor: isDraggingOver ? 'lightBlue' : 'lightGray',
});

const Board = () => {
  const {boards} = useStore();

  const onDragEnd = useCallback((event) => {
    const {source, destination, draggableId: id} = event;

    boards.active?.moveTask(source, destination, id);
  }, [boards]);

  return (
    <Box>
      <Grid container>
        <Typography padding={2}>
          Kanban Board: <strong>{boards.active?.name}</strong>
        </Typography>
      </Grid>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {boards.active?.sections?.map((section) => (
            <Grid item xs key={section.id}>
              <Paper variant="outlined">
                <Typography padding={2}>
                  {section.name}
                </Typography>
                <Droppable droppableId={section.id.toString()}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={getStyle(snapshot.isDraggingOver)}
                    >
                      <BoardSection section={section}/>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default observer(Board);
