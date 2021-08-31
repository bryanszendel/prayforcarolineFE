import logo from "./logo.svg";
import "./App.scss";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    paperBooked: {
      padding: 2,
      width: "80%",
      height: "100%",
      textAlign: "center",
      color: "#2b2b2b",
      fontSize: 12,
      backgroundColor: "lightgray",
    },
    paperAvailable: {
      padding: theme.spacing(2),
      width: "80%",
      textAlign: "center",
      color: "white",
      fontSize: 18,
      backgroundColor: "#AF7179",
      "&:hover": { backgroundColor: "#9c575b" },
    },
  }));

  function FormRow(props) {
    const { hour } = props;
    return (
      <React.Fragment>
        <Grid item xs={3} spacing={1}>
          <Button variant="contained" className={classes.paperAvailable}>
            {hour}:00
          </Button>
        </Grid>
        <Grid item xs={3} spacing={1}>
          <Button variant="contained" className={classes.paperAvailable}>
            {hour}:15
          </Button>
        </Grid>
        <Grid item xs={3} spacing={1}>
          <Button variant="contained" className={classes.paperBooked} disabled>
            Bryan and Leslie Szendel
          </Button>
        </Grid>
        <Grid item xs={3} spacing={1}>
          <Button variant="contained" className={classes.paperAvailable}>
            {hour}:45
          </Button>
        </Grid>
      </React.Fragment>
    );
  }

  const classes = useStyles();

  return (
    <div class="App">
      <h2 class="header">Pray for Dawn</h2>
      <div className="classes.root">
        <Grid container spacing={1}>
          <FormRow hour={12} />
          <FormRow hour={1} />
          <FormRow hour={2} />
          <FormRow hour={3} />
        </Grid>
      </div>
    </div>
  );
}

export default App;
