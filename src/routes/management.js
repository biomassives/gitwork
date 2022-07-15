import ResponsiveDatePickers from "./components/Calendar";
import React, { useState, useEffect } from "react";
// import InsertWorkerRoster from "./components/InsertWorkerRoster"; currently unused
import RosterTable from "./components/RosterTable";
import { Link } from "react-router-dom";
import TopBar from "./components/TopBar";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

// import DeleteWorkerRoster from "./components/DeleteWorkerRoster";

export default function management() {
  const [value, setValue] = useState(new Date());
  let [daySelected, setDaySelected] = useState(value.getDate());
  let [monthSelected, setMonthSelected] = useState(value.getMonth() + 1); // month is 0-index so must +1
  let [yearSelected, setYearSelected] = useState(value.getFullYear());

  useEffect(() => {
    // for debugging
    console.log(value); // everytime we change date console log it
    //setDaySelected(.getDate());
    console.log(daySelected);
    console.log(monthSelected);
    console.log(yearSelected);
  }, [value]);

  return (
    <>
      <TopBar />
      <Container maxWidth="md" sx={{ pt: 2, pr: 2, pl: 2 }}>
        <Paper variant="outlined" elevation={2}>
          <Box sx={{}}>
            <Typography
              component="h1"
              variant="h4"
              align="left"
              sx={{ m: 1.5 }}
            >
              Roster Management
            </Typography>

            <Typography
              component="h6"
              variant="h6"
              align="left"
              sx={{ mt: 1, ml: 1.5 }}
            >
              Pick the date you would like to manage{" "}
            </Typography>
            <Box sx={{ alignItems: "center", p: 3 }}>
              <ResponsiveDatePickers
                value={value}
                setValue={setValue}
                setDaySelected={setDaySelected}
                setMonthSelected={setMonthSelected}
                setYearSelected={setYearSelected}
              />
            </Box>
          </Box>
          <Typography
            component="h6"
            variant="h6"
            align="left"
            sx={{ m: 2, textDecoration: "underline" }}
          >
            Roster Table for {daySelected}/{monthSelected}/{yearSelected}
          </Typography>
          <Typography component="h6" variant="h6" align="left" sx={{ m: 2 }}>
            <RosterTable
              daySelected={daySelected}
              monthSelected={monthSelected}
              yearSelected={yearSelected}
            />
          </Typography>

          <p></p>
          <Link
            to="/management/addworkers"
            state={[daySelected, monthSelected, yearSelected]}
          >
            <Button
              variant="outlined"
              sx={{
                ml: 2.5,
                mb: 2
              }}
            >
              Click to add workers!
            </Button>
          </Link>
        </Paper>
      </Container>
    </>
  );
}
/*
old version, currently unused
<h3>
          {" "}
          Enter name of worker to insert to roster on {daySelected}/
          {monthSelected}/{yearSelected}
</h3>
        <InsertWorkerRoster
          daySelected={daySelected}
          monthSelected={monthSelected}
          yearSelected={yearSelected}
        />
*/
