import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
import CssBaseline from "@material-ui/core/CssBaseline";
import "firebase/firestore";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function AddJob(props) {
  const classes = useStyles();
  const [job, setJob] = useState([]);
  const [stage, setStage] = useState("");

  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = useState(0);
  const { jobId } = props;

  const stageChange = event => {
    setStage(event.target.value);
  };

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    let user = localStorage.getItem("user");

    if (user) {
      firebase
        .firestore()
        .collection("Users")
        .doc(user)
        .collection("Jobs")
        .doc(jobId)
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            const data = doc.data();
            data["id"] = doc.id;
            console.log(data);
            setJob(data);
            setStage(data.Stage);
            return data;
          }
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  }, [jobId]);

  const submit = ({ history }) => {
    let user = localStorage.getItem("user");

    if (stage === "Unsuccessful") {
      firebase
        .firestore()
        .collection("Users")
        .doc(user)
        .collection("Jobs")
        .doc(jobId)
        .update({
          Stage: stage,
          Active: false
        });
    } else {
      firebase
        .firestore()
        .collection("Users")
        .doc(user)
        .collection("Jobs")
        .doc(jobId)
        .update({
          Stage: stage,
          Active: true
        });
    }
    props.history.push("/");
  };

  const goBack = () => {
    props.history.push("/");
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Box textAlign="center" m={1}>
          <Typography variant="h4">Edit Job Status</Typography>
        </Box>
        <div className={classes.form}>
          <Typography variant="h5">Job Role :</Typography>
          <Typography variant="h6">{job.Role}</Typography>
          <Typography variant="h5">Company :</Typography>
          <Typography variant="h6">{job.Company}</Typography>
          <Typography variant="h5">Salary :</Typography>
          <Typography variant="h6">{job.Salary}</Typography>
          <Typography variant="h5">Location :</Typography>
          <Typography variant="h6">{job.Location}</Typography>

          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Application Stage
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={stage}
            onChange={stageChange}
            labelWidth={labelWidth}
          >
            <MenuItem value="">
              <em>{job.Stage}</em>
            </MenuItem>
            <MenuItem value={"Application Sent"}>Application Sent</MenuItem>
            <MenuItem value={"Telephone Interview"}>
              Telephone Interview
            </MenuItem>
            <MenuItem value={"Video Interview"}>Video Interview</MenuItem>
            <MenuItem value={"Technical Test"}>Technical Test</MenuItem>
            <MenuItem value={"Face-To-Face Interview"}>
              Face-To-Face Interview
            </MenuItem>
            <MenuItem value={"Assessment Centre"}>Assessment Centre</MenuItem>
            <MenuItem value={"Unsuccessful"}>Unsuccessful</MenuItem>
            <MenuItem value={"Offer Given"}>Offer Given</MenuItem>
          </Select>

          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#aed581" }}
            onClick={submit}
          >
            Update Job
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#aed581" }}
            onClick={goBack}
          >
            Back
          </Button>
        </div>
      </div>
    </>
  );
}
