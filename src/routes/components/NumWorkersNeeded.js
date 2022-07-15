import NumberInput from "material-ui-number-input"; //https://nohomey.github.io/material-ui-number-input/
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function NumWorkersNeeded(props) {
  let { workersNeeded, setWorkersNeeded } = props; // object destructuring

  return (
    <>
      <br></br>
      Enter number of workers still needed: &nbsp;&nbsp;
      <MuiThemeProvider>
        <NumberInput
          hintText={"Enter a number between 1 and 100"}
          id="outlined-required"
          defaultValue={1}
          min={1}
          max={100}
          strategy="ignore"
          onChange={(event) =>
            /*
            bug if user types 0
            event.target.value > 100
              ? setWorkersNeeded(100)
              : setWorkersNeeded(event.target.value)
              */

            event.target.value <= 100 && event.target.value >= 1
              ? setWorkersNeeded(event.target.value)
              : event.target.value > 100
              ? setWorkersNeeded(100)
              : event.target.value <= 0
              ? setWorkersNeeded(1)
              : !Number(event.target.value)
              ? setWorkersNeeded(workersNeeded)
              : setWorkersNeeded(0)
          }
        />
      </MuiThemeProvider>
    </>

    /*
    <Box
      component="span"
      sx={{
        m: 1.5
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        Enter number of workers still needed: &nbsp;&nbsp;
        <TextField
          size="small"
          id="outlined-required"
          type="number"
          label="Enter number between 1 and 100"
          value={workersNeeded}
          onChange={(event) => setWorkersNeeded(event.target.value)}
          sx={{ pr: 1.5 }}
        />
      </div>
    </Box>
    /*
  
*/
    /*
    <TextField
      required
      id="required"
      label="Required"
      defaultValue="1"
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      onInput={(e) => {
        e.target.value = Math.max(1, parseInt(e.target.value))
          .toString()
          .slice(0, 12);
      }}
      onChange={(event) => setWorkersNeeded(event.target.value)}
    />
    */

    /* 
    bug with e and --
    <TextField
      type={"number"}
      value={workersNeeded}
      onChange={(event) =>
        event.target.value < 0 && !isNaN(event.target.value)
          ? setWorkersNeeded(0)
          : setWorkersNeeded(event.target.value)
      }
    />
    */

    //bug with e and --
    /*
    <TextField
      type="number"
      inputProps={{ min }}
      value={workersNeeded}
      onChange={(e) => {
        if (e.target.value === "") {
          setWorkersNeeded(e.target.value);
          return;
        }
        const value = +e.target.value;
        if (value < min) {
          setWorkersNeeded(min);
        } else {
          setWorkersNeeded(value);
        }
      }}
    />
  */

    /*
    <TextField
      type="number"
      InputProps={{
        inputProps: {
          max: 100,
          min: 10
        }
      }}
    />
    */
  );
}
export default NumWorkersNeeded;
