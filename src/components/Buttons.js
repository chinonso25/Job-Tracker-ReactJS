import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    alignItems: "center",
    backgroundColor: '#aed581'
  },
  input: {
    display: "none"
  }
}));

export default function Buttons(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        type={props.type}
        className={classes.button}
        onClick={props.onClick}
      >
        {props.tag}
      </Button>
    </div>
  );
}