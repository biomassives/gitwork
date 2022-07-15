import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import TopBar from "./components/TopBar";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import FilterWorkers from "./components/FilterWorkers";

export default function roster() {
  //console.log(StartDate)
  //console.log(EndDate)

  return (
    <>
      <TopBar />

      <Container maxWidth="md" sx={{ pt: 2, pr: 2, pl: 2 }}>
        <Paper variant="outlined" elevation={2}>
          <Typography component="h1" variant="h4" align="left" sx={{ m: 1.5 }}>
            Worker Table:
          </Typography>
          <Box
            sx={{
              bgcolor: "info.light",
              boxShadow: 2,
              borderRadius: 1,
              width: 3 / 4,
              color: "info.contrastText",
              ml: 15
            }}
          >
            <Typography
              component="h8"
              variant="subtitle2"
              display="block"
              align="center"
              sx={{ mt: 2, ml: 2 }}
            >
              To view the number of shifts worked by your workers between two
              dates, adjust the start and end dates accordingly and click on
              "Display Table".
            </Typography>
            <Typography
              component="h8"
              variant="subtitle2"
              display="block"
              align="center"
              sx={{ mb: 2, ml: 2 }}
            >
              To view the specific dates worked by individual workers, click on
              the '>' button in the table.
            </Typography>
          </Box>
          <Box sx={{ alignItems: "center", p: 3 }}>
            <FilterWorkers />
          </Box>
        </Paper>
      </Container>
    </>
  );
}
/*
  
  import StartDay from "./components/StartCal";
  import EndDay from "./components/EndCal";

  const [StartDate, setStartDate] = useState(new Date(2020,0,1,0,0,0,0)); 
  const [EndDate, setEndDate] = useState(new Date());
  
  let [StartDay, setStartDay] = useState(StartDate.getDate());
  let [StartMonth, setStartMonth] = useState(StartDate.getMonth()+1);
  let [StartYear, setStartYear] = useState(StartDate.getFullYear());
  
  
  let [EndDay, setEndDay] = useState(EndDate.getDate());
  let [EndMonth, setEndMonth] = useState(EndDate.getMonth()+1);
  let [EndYear, setEndYear] = useState(EndDate.getFullYear());

  console.log(StartDate)
  console.log(EndDate)

            <StartDay
              value = {StartDate}
              setValue = {setStartDate}
              setDaySelected = {setStartDay}
              setMonthSelected = {setStartMonth}
              setYearSelected = {setStartYear}
            />
            <EndDay
              value = {EndDate}
              setValue = {setEndDate}
              setDaySelected = {setEndDay}
              setMonthSelected = {setEndMonth}
              setYearSelected = {setEndYear}
            />
                        
*/
