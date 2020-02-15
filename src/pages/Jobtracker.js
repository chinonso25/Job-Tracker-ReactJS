import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebaseConfig from "../index.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Lists from "../components/Lists";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: "#aed581"
  }
}));

export default function Jobtracker() {
  const classes = useStyles();
  const [actJobs, setactJobs] = useState([]);
  const [inactJobs, setinactJobs] = useState([]);
  const [users, setUser] = useState();

  useEffect(() => {
    let user = firebaseConfig.auth().currentUser.uid;
    localStorage.setItem("user", user);

    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .collection("Jobs")
      .where("Active", "==", true)
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setactJobs(notes.reverse());
        setUser(user);
      });

    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .collection("Jobs")
      .where("Active", "==", false)
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setinactJobs(notes.reverse());
      });
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Box textAlign="center" m={1}>
          Active Jobs
        </Box>
        <Lists jobs={actJobs} user={users} />
        <Box textAlign="center" m={1}>
          Inactive Jobs
        </Box>
        <Lists jobs={inactJobs} />
        <Link to="/add">
          <Fab color="primary" className={classes.fab} aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </>
  );
}
