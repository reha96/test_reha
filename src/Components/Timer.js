import React from "react";
import { useState, useEffect } from "react";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const Timer = (props) => {
  localStorage.setItem("visible", "isVisible");
  const {
    initialMinute = 0,
    initialSeconds = 0,
    initialLabor = 0,
    initialLeisure = 0,
    initialLaborNot = 0,
    initialLeisureNot = 0,
  } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [open, setOpen] = React.useState(false);

  const [laborcount, setLaborcount] = useState(initialLabor);
  const [leisurecount, setLeisurecount] = useState(initialLeisure);
  const [inactivelabor, setInactivelabor] = useState(initialLaborNot);
  const [inactiveleisure, setInactiveleisure] = useState(initialLeisureNot);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("clickedOKtoswitch2", "intermediate");
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
        if (minutes === 10) {
          setOpen(true);
        }
      }
      document.addEventListener("visibilitychange", (event) => {
        if (document.visibilityState !== "visible") {
          localStorage.setItem("visible", "notVisible");
          // console.log(localStorage.getItem("visible"))
        }
        if (document.visibilityState === "visible") {
          localStorage.setItem("visible", "isVisible");
        }
      });
      // need to add counter with IF tab active and IF user is lookign THEN start counting FOR each tab
      if (document.visibilityState === "visible") {
        if (localStorage.getItem("activeTab") === "Labor") {
          setLaborcount(parseInt(laborcount) + 1);
        }
        if (localStorage.getItem("activeTab") === "Leisure") {
          setLeisurecount(parseInt(leisurecount) + 1);
        }
      } 
      if(localStorage.getItem("visible") === "notVisible") {
        if (localStorage.getItem("activeTab") === "Labor") {
          setInactivelabor(parseInt(inactivelabor) + 1);
        }
        if (localStorage.getItem("activeTab") === "Leisure") {
          setInactiveleisure(parseInt(inactiveleisure) + 1);
        }
      }
    }, 1000);
    return () => {
      localStorage.setItem("laborTime", laborcount);
      localStorage.setItem("leisureTime", leisurecount);
      localStorage.setItem("inactiveLabor", inactivelabor);
      localStorage.setItem("inactiveLeisure", inactiveleisure);
      // console.log("laborcount ", laborcount);
      // console.log(leisurecount);
      // console.log("Inactive Labor ", inactivelabor);
      // console.log(inactiveleisure);
      // added stuff

      window.localStorage.setItem("lastmin", minutes);
      window.localStorage.setItem("lastsec", seconds);
      window.localStorage.setItem(
        "progress",
        100 -
          Math.round(
            (parseInt(window.localStorage.getItem("lastmin") * 60) +
              parseInt(window.localStorage.getItem("lastsec"))) /
              7.2
          )
      );

      clearInterval(myInterval);
    };
  });
  return (
    <div className="timer">
      <LinearProgress
        variant="determinate"
        value={parseInt(window.localStorage.getItem("progress"))}
      />
      {minutes <= 0 && seconds <= 0 ? (
        window.location.replace("end")
      ) : (
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QueryBuilderRoundedIcon /> {minutes}:
          {seconds < 10 ? `0${seconds}` : seconds} &nbsp;
        </Typography>
      )}
      <Dialog
        open={open}
        onClose={null}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Now you can switch freely between tasks.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Timer;
