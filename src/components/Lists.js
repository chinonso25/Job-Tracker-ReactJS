import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function Lists(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <Divider component="li" />
      {props.jobs.map(item => (
        <>
          <Link to={`/jobs/${item.id}`} style={{ textDecoration: "none" }}>
            <ListItem alignItems="flex-start" key={item.id}>
              <ListItemText
                primary={item.Role}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {item.Company}
                    </Typography>
                    
                    - £ {item.Salary}
                  </>
                }
              />
            </ListItem>
          </Link>

          <Divider component="li" />
        </>
      ))}
    </List>
  );
}
