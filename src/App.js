import logo from "./logo.svg";
import "./App.scss";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    headerContent: {},
  }));

  const getHour = (hour) => {
    return hour === 0 ? "12" : String(hour);
  };

  const getMinutes = (minutes) => {
    return minutes === 0 ? "00" : String(minutes);
  };

  const classes = useStyles();

  const [slots, setSlots] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [personName, setPersonName] = useState("");

  useEffect(() => {
    getSlots();
  }, []);

  const getSlots = () => {
    axios
      .get("https://prayfordawn.herokuapp.com/api/slots/")
      .then((res) => {
        setSlots(res.data.sort((a, b) => a.id - b.id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOpen = (id) => {
    setOpen(true);
    setClickedId(id);
    console.log(id);
  };

  const handleClose = () => {
    setOpen(false);
    setClickedId(null);
    setPersonName("");
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleSubmit = async () => {
    axios
      .put(`https://prayfordawn.herokuapp.com/api/slots/${clickedId}`, {
        person_name: personName,
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        getSlots();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <div className="headerContainer">
        <h2 className="headerTitle">Pray for Dawn</h2>
        <p className="headerContent">
          Please select a 15 minute timeslot below. The prayer chain for Dawn
          Whitehurst begins at Midnight on September 1. When you select a slot,
          please input your name and Save so that Wade can be encouraged by
          everyone praying for Dawn during these delicate 24 hours.
        </p>
        <p className="headerContent">
          (Please direct any technical issues to Bryan Szendel{" "}
          <a href="sms:19048878616">(904) 887-8616</a> and not Wade)
        </p>
      </div>
      <div className="classes.root">
        <Grid container spacing={1}>
          {slots.map((slot, index) => {
            return slot.person_name === null ? (
              <Grid item xs={3} spacing={1} key={slot.id}>
                <Button
                  id={slot.id}
                  onClick={() => handleOpen(slot.id)}
                  variant="contained"
                  className={classes.paperAvailable}
                >
                  {getHour(slot.hour) + ":" + getMinutes(slot.minutes)}
                </Button>
              </Grid>
            ) : (
              <Grid item xs={3} spacing={1} key={slot.id}>
                <Button
                  id={slot.id}
                  // onClick={() => handleOpen(slot.id)}
                  disabled
                  variant="contained"
                  className={classes.paperBooked}
                >
                  {slot.person_name}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Sign Up For This Time Slot
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name to sign up for this prayer time slot.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="personName"
            label="Person Name"
            type="text"
            value={personName}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
