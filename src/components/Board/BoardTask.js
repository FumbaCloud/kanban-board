import React from 'react';
import {CardContent, Typography} from "@mui/material";

const BoardTask = ({task}) => {
  return (
    <CardContent>
      <Typography color="textPrimary" gutterBottom>{task.title}</Typography>
      <Typography color="textSecondary" gutterBottom>{task?.description}</Typography>
    </CardContent>
  );
};

export default BoardTask;
