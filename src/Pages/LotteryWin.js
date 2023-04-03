import * as React from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import ButtonM from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const LotteryWin = () => {
  var input = [];
  localStorage.setItem("laborTime", 0);
  localStorage.setItem("leisureTime", 0);
  localStorage.setItem("inactiveLabor", 0);
  localStorage.setItem("inactiveLeisure", 0);
  localStorage.setItem("watchedVideo", 0);
  localStorage.setItem("activeTab", "Labor");
  localStorage.setItem("clickedOKtoswitch2", "no");
  localStorage.setItem("timesUp", "");
  localStorage.setItem("activePage", 1);
  localStorage.setItem("videoPaused", "yes");
  localStorage.setItem("videoPausedFor", 0);
  localStorage.setItem("localcount", 0);
  localStorage.setItem("lastmin", 9); //  testtt timer
  localStorage.setItem("lastsec", 59); // testt timer
  localStorage.setItem("transc", JSON.stringify(input));
  window.localStorage.setItem("progress", 0);
  const [counter, setCounter] = useState(
    parseInt(window.localStorage.getItem("attentionFail2"))
  );

  var Fail = 0;

  useEffect(() => {
    let passvalue = {
      timeChoice: localStorage.getItem("time_choice"),
      "clikcedOkToSwitch.secondPopUp":
        localStorage.getItem("clickedOKtoswitch2"),
    };
    const link = "/api/" + localStorage.getItem("ID");
    axios
      .patch(link, passvalue)
      .then(() => {
        console.log("Succesfully recorded time_choice (Typing Task)");
      })
      .catch((e) => {
        console.log("Unable to record time_choice (Typing Task): ", e);
      });
  }, []);

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState(
    "You have 2 opportunities to get this question right."
  );

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    // console.log(event.target.value);

    if (event.target.value === "true") {
      setHelperText("You got it!");
      setError(false);
      localStorage.setItem("stop2", "true");
      // console.log(localStorage.getItem("stop2"));
    } else if (event.target.value === "1" || event.target.value === "fast") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
      // Fail = parseInt(counter) + 1;
      // setCounter(Fail);
      // localStorage.setItem('attentionFail2', Fail);
      localStorage.setItem("stop2", "false");
    } else {
      setHelperText("Please select an option.");
      setError(true);
      localStorage.setItem("stop2", "false");
    }
    setHelperText(" ");
    setError(false);
  };

  const nextPage = (event) => {
    window.location.replace("tasks");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "true") {
      setHelperText("You got it!");
    } else if (value === "1" || value === "0") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
      Fail = parseInt(counter) + 1;
      setCounter(Fail);
      localStorage.setItem("attentionFail2", Fail);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }

    let passvalue = {
      attention2: localStorage.getItem("attentionFail2"),
    };

    const link = "/api/" + localStorage.getItem("ID");

    axios
      .patch(link, passvalue)
      .then(() => {
        console.log("Update AttentionFail2");
      })
      .catch((e) => {
        console.log("Unable to update AttentionFail2: ", e);
      });
  };
  return (
    <div className="Page2">
      <style type="text/css">
        {`
        .container-sm{
            background-color: white ;
            padding-bottom:5vh!important;
            padding-top:2vh!important;
            max-width: 720px;
            height:auto;
          }
          .button {
            background-color: purple;
          }
  
          .btn-primary {
            --bs-btn-color: #fff;
            --bs-btn-bg: purple;
            --bs-btn-border-color: purple;
            --bs-btn-hover-color: #fff;
            --bs-btn-hover-bg: #660066;
            --bs-btn-hover-border-color: #660066;
            --bs-btn-focus-shadow-rgb: 128, 0,128;
            --bs-btn-active-color: #660066;
            --bs-btn-active-bg: #660066;
            --bs-btn-active-border-color: #800080cf;
            --bs-btn-active-shadow: inset 0 3px 5pxrgba(0, 0, 0, 0.125);
            --bs-btn-disabled-color: #fff;
            --bs-btn-disabled-bg: #800080cf;
            --bs-btn-disabled-border-color: #800080cf;
            margin-bottom: auto;
          }
          `}
      </style>
      <Container className="p-1" fluid="sm">
        {/* <Typography variant="h6" className="center">
          Time Choice
        </Typography> */}
        <p className="HomePage_p">
          <Alert sx={{ mb: 2 }} severity="info">
            <strong>Your Time Choice is binding.</strong> You have to{" "}
            <strong>Type</strong> for your chosen duration.
          </Alert>
        </p>

        <Typography variant="h5" sx={{ my: 2.5 }} className="center">
          Recap
        </Typography>
        <p className="HomePage_p">
          On the next page you will spend 10 minutes. You can switch between
          tasks as you please but cannot spend more than the total duration
          indicated in your <strong>Time Choice</strong> for each task. Your
          bonus payment is equal to your <strong>Time Choice</strong> if your
          <strong> Typing</strong> meets the quality criteria.
          {/* <hr></hr> */}
        </p>

        <Box className="center" sx={{ display: "flex" }}>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3 }} error={error} variant="standard">
              <FormLabel id="demo-error-radios">
                My bonus payment is ...
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-error-radios"
                name="quiz2"
                value={value}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="equal to my Time Choice in the past page."
                />
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="depends on the time I spend on each task."
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="does not depend on how much time I spend on each task."
                />
              </RadioGroup>
              <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
          </form>

          {/* <ButtonM sx={{ mb: 1.5}} type="submit" variant="outlined" onClick={handleSubmit} >
                        Check Answer
                    </ButtonM> */}
        </Box>

        <div className="center">
          {!(localStorage.getItem("stop2") === "true") ? (
            <ButtonM
              variant="contained"
              color="secondary"
              type="button"
              onClick={handleSubmit}
            >
              <strong>begin</strong>
            </ButtonM>
          ) : (
            // <Link underline="none" href={"tasks"}>
            <ButtonM
              variant="contained"
              color="secondary"
              type="button"
              onClick={nextPage}
            >
              <strong>begin</strong>
            </ButtonM>
            // </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LotteryWin;
