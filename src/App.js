import "./App.scss";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

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
      width: "90%",
      height: 70,
      textAlign: "center",
      color: "#2b2b2b",
      fontSize: 12,
      backgroundColor: "lightgray",
    },
    paperAvailable: {
      padding: theme.spacing(2),
      width: "90%",
      height: 70,
      textAlign: "center",
      color: "white",
      fontSize: 18,
      backgroundColor: "#b58db8",
      "&:hover": { backgroundColor: "#CA9DCD" },
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

  const [slots1, setSlots1] = useState([]);
  const [slots2, setSlots2] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [personName, setPersonName] = useState("");

  useEffect(() => {
    getSlots1();
    getSlots2();
  }, []);

  const getSlots1 = () => {
    axios
      .get(`https://prayforcaroline.herokuapp.com/api/slots/day/1`)
      .then((res) => {
        setSlots1(res.data.sort((a, b) => a.id - b.id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getSlots2 = () => {
    axios
      .get(`https://prayforcaroline.herokuapp.com/api/slots/day/2`)
      .then((res) => {
        setSlots2(res.data.sort((a, b) => a.id - b.id));
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
      .put(`https://prayforcaroline.herokuapp.com/api/slots/${clickedId}`, {
        person_name: personName,
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        getSlots1();
        getSlots2();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <div className="headerContainer">
        <h2 className="headerTitle">Pray for sweet Caroline</h2>
        <p className="headerContent">Friends and Family.</p>

        <p>
          Thank you for finding your way to this page to come together and
          boldly proclaim healing and full restoration for sweet Caroline in
          Jesus name! Please select a 15 minute prayer time slot below by
          inputting your name, and at MIDNIGHT on March 8, a 48 hour period of
          prayer, fasting and lifting sweet Caroline up to the Lord will begin.
        </p>

        <p className="verse">
          “For the weapons of our warfare are not carnal <br />
          but mighty in God for pulling down strongholds,”
          <br />
          <span class="reference">- 2 Corinthians 10:4 NKJV</span>
        </p>

        <p className="verse">
          “O God, You are my God; <br />
          Early will I seek You;
          <br /> My soul thirsts for You;
          <br /> My flesh longs for You
          <br /> In a dry and thirsty land <br />
          Where there is no water.”
          <br />
          <span class="reference">- Psalms 63:1 NKJV</span>
        </p>
      </div>
      <div className="classes.root">
        <div class="day-header">Beginning Midnight March 8</div>
        <Grid container spacing={1}>
          {slots1.map((slot, index) => {
            return slot.person_name === null ? (
              <Grid item xs={6} sm={3} key={slot.id}>
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
              <Grid item xs={6} sm={3} spacing={1} key={slot.id}>
                <Button
                  id={slot.id}
                  disabled
                  variant="contained"
                  className={classes.paperBooked}
                >
                  {slot.person_name +
                    " (" +
                    getHour(slot.hour) +
                    ":" +
                    getMinutes(slot.minutes) +
                    ")"}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="classes.root">
        <div class="day-header">Beginning Midnight March 9</div>
        <Grid container spacing={1}>
          {slots2.map((slot, index) => {
            return slot.person_name === null ? (
              <Grid item xs={6} sm={3} key={slot.id}>
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
              <Grid item xs={6} sm={3} spacing={1} key={slot.id}>
                <Button
                  id={slot.id}
                  disabled
                  variant="contained"
                  className={classes.paperBooked}
                >
                  {slot.person_name +
                    " (" +
                    getHour(slot.hour) +
                    ":" +
                    getMinutes(slot.minutes) +
                    ")"}
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
