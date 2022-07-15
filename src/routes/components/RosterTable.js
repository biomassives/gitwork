import { supabase } from "../../supabaseClient";
import React, { useState, useEffect } from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

function MakeRosterTable(props) {
  let { WorkerRoster, daySelected, monthSelected, yearSelected } = props; // object destructuring

  return WorkerRoster.length === 0 ? (
    <Typography component="h3" variant="h5" align="left" sx={{ m: 0.5 }}>
      There are no workers assigned on {daySelected}/{monthSelected}/
      {yearSelected}
    </Typography>
  ) : (
    <TableContainer component={Paper} style={{ width: "80%" }}>
      <MuiTable size="small" options={{ filtering: true }}>
        <TableHead>
          <TableRow>
            <TableCell align="center"> Worker Name </TableCell>
            <TableCell align="center"> Delete? </TableCell>
            <TableCell align="center">Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {WorkerRoster.map((WorkerInfo) => (
            <TableRow>
              <TableCell align="center"> {WorkerInfo.Worker_Name}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={async () => {
                    const { data, error } = await supabase
                      .from("RosterTable")
                      .delete()
                      .eq("Worker_Name", WorkerInfo.Worker_Name)
                      .eq("Manager_ID", supabase.auth.user().id)
                      .eq("day", daySelected)
                      .eq("month", monthSelected)
                      .eq("year", yearSelected);
                    //alert(`${WorkerInfo.Worker_Name} has been successfully deleted from roster on ${daySelected}/${monthSelected}/${yearSelected}!`); dont rly need anymore since table auto update
                  }}
                  variant="outlined"
                  color="error"
                  size="small"
                >
                  remove
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "50px",
                    minWidth: "100px",
                    minHeight: "30px"
                  }}
                  color={WorkerInfo.Attendance ? "success" : "error"}
                  onClick={async () => {
                    if (WorkerInfo.Attendance === true) {
                      // if true then make false after click
                      const { data, error } = await supabase
                        .from("RosterTable")
                        .update({ Attendance: false })
                        .eq("Worker_Name", WorkerInfo.Worker_Name)
                        .eq("Manager_ID", supabase.auth.user().id)
                        .eq("day", daySelected)
                        .eq("month", monthSelected)
                        .eq("year", yearSelected);
                    } else {
                      // if false then make true after click
                      const { data, error } = await supabase
                        .from("RosterTable")
                        .update({ Attendance: true })
                        .eq("Worker_Name", WorkerInfo.Worker_Name)
                        .eq("Manager_ID", supabase.auth.user().id)
                        .eq("day", daySelected)
                        .eq("month", monthSelected)
                        .eq("year", yearSelected);
                    }
                  }}
                >
                  {WorkerInfo.Attendance ? "Present" : "Absent"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

function RosterTable(props) {
  const { daySelected, monthSelected, yearSelected } = props;

  const [workers, setWorkers] = useState([]); // initialised to empty array, will hold an array of objects later containing roster info

  function sortFunction(a, b) {
    if (a.Worker_Name.toUpperCase() < b.Worker_Name.toUpperCase()) {
      return -1;
    } else if (a.Worker_Name.toUpperCase() > b.Worker_Name.toUpperCase()) {
      return 1;
    }
    return 0;
  }
  async function handleDatabase(event) {
    //console.log(`HHERE dayselected is ${daySelected}`);
    //console.log(`HHERE monthselected is ${monthSelected}`);
    //console.log(`HHERE yearselected is ${yearSelected}`);

    // select all works in database under the user who is working on specified date
    let { data: dbworkers, error } = await supabase
      .from("RosterTable")
      .select("*")
      .eq("Manager_ID", supabase.auth.user().id)
      .eq("day", daySelected)
      .eq("month", monthSelected)
      .eq("year", yearSelected);
    //console.log(dbworkers); // dbworkers will be an array of objects and we will make a table out of it
    dbworkers.sort(sortFunction);
    setWorkers(dbworkers); // workers now will be set to be the entire table essentially, contains attendance info etc.
  }
  useEffect(() => {
    // this will load the database/table upon entering this page and if the dependancies change
    handleDatabase();
  }, [daySelected, monthSelected, yearSelected, workers]); // dependancies

  return (
    <MakeRosterTable
      WorkerRoster={workers}
      daySelected={daySelected}
      monthSelected={monthSelected}
      yearSelected={yearSelected}
    />
  );
}

export default RosterTable;
