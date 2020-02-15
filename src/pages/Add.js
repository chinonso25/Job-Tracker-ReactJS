import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import firebaseConfig from "../index";
import * as firebase from "firebase";
import "firebase/firestore";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
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

export default function AddJob() {
  const classes = useStyles();
  const [user, setUser] = React.useState("");
  const [stage, setStage] = React.useState("");
  const [role, setRole] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [salary, setSalary] = React.useState("");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    firebase.database();
    setUser(firebaseConfig.auth().currentUser.uid);
  }, []);

  const roleChange = event => {
    setRole(event.target.value);
  };
  const companyChange = event => {
    setCompany(event.target.value);
  };
  const locationChange = event => {
    setLocation(event.target.value);
  };
  const salaryChange = event => {
    setSalary(event.target.value);
  };

  const stageChange = event => {
    setStage(event.target.value);
  };

  const submit = ({ history }) => {
    firebase
      .firestore()
      .collection("Users")
      .doc(user)
      .collection("Jobs")
      .add({
        Role: role,
        Company: company,
        Location: location,
        Salary: salary,
        Stage: stage,
        Active: true
      });
  };

  return (
    <>
      <div className={classes.root}>
        <Box textAlign="center" m={1}>
          Add a Job
        </Box>
        <div className={classes.form}>
          <TextField
            id="outlined-basic"
            label="Job Role"
            value={role}
            onChange={roleChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Company"
            value={company}
            onChange={companyChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Salary"
            value={salary}
            onChange={salaryChange}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Location"
            value={location}
            onChange={locationChange}
            variant="outlined"
          />

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
              <em>...</em>
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
            <MenuItem value={"Offer Given"}>Offer Given</MenuItem>
          </Select>
          <Button
            variant="contained"
            style={{ backgroundColor: "#aed581", color:'#ffffff' }}
            onClick={submit}
          >
            Add Job
          </Button>
        </div>
      </div>
    </>
  );
}
