import { Navigate, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import NumWorkersNeeded from "./components/NumWorkersNeeded";
import NotYetWorkingTable from "./components/NotYetWorkingTable";
import RosterSubmit from "./components/RosterSubmit";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";

export default function AddWorkers() {
  let [workersNeeded, setWorkersNeeded] = useState(1); // user input for number of workers needed
  const [selectedWorkers, setSelectedWorkers] = useState([]); // initialised to empty. contains the workers not yet working who are selected by the user by ticking checkbox.
  const location = useLocation(); // https://ui.dev/react-router-pass-props-to-link
  console.log(location.state);

  if (location.state === null) {
    // redirect back to managment page if user refreshes or brute force link
    // if user performs any of ^, it will lead to location.state being NULL, since the date is meant to be passed on from the management page.
    //https://www.youtube.com/watch?v=YYDpGYOjfqM
    return <Navigate to="/management" />;
  }

  const [daySelected, monthSelected, yearSelected] = location.state;
  console.log(daySelected);
  console.log(monthSelected);
  console.log(yearSelected);

  useEffect(() => {
    // for debugging
    console.log(workersNeeded); // every time we change workersNeeded console log it
  }, [workersNeeded]);

  return (
    <>
      <TopBar />

      <Link to="/management">
        <Button>Return to roster management page</Button>
      </Link>
      <br></br>
      <Container maxWidth="md" sx={{ pt: 2, pr: 2, pl: 2 }}>
        <Paper variant="outlined" elevation={2}>
          <Box
            sx={{
              bgcolor: "info.light",
              boxShadow: 2,
              borderRadius: 7,
              width: 3 / 4,
              color: "info.contrastText",
              ml: 13
            }}
          >
            <Typography
              component="h8"
              variant="subtitle2"
              display="block"
              align="center"
              sx={{ mt: 2, ml: 2 }}
            >
              Instructions:
              <br></br>
              Step 1: Check the boxes of the workers who would like to work on{" "}
              {daySelected}/{monthSelected}/{yearSelected}.<br></br>
              Step 2: Enter the number of workers needed for work on{" "}
              {daySelected}/{monthSelected}/{yearSelected}.<br></br>
              Step 3: Click the submit button.
            </Typography>
          </Box>
          <Typography variant="body1" align="left" sx={{ m: 2 }}>
            {" "}
            <NotYetWorkingTable
              daySelected={daySelected}
              monthSelected={monthSelected}
              yearSelected={yearSelected}
              selectedWorkers={selectedWorkers}
              setSelectedWorkers={setSelectedWorkers}
            />
            <NumWorkersNeeded
              workersNeeded={workersNeeded}
              setWorkersNeeded={setWorkersNeeded}
            />
            <RosterSubmit
              daySelected={daySelected}
              monthSelected={monthSelected}
              yearSelected={yearSelected}
              selectedWorkers={selectedWorkers}
              setSelectedWorkers={setSelectedWorkers}
              workersNeeded={workersNeeded}
            />
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
