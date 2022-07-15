import { supabase } from "../../supabaseClient";
import React, { useState, useEffect } from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import { Link, Navigate } from "react-router-dom";

function MakeNotYetWorkingTable(props) {
  const { notWorkingWorkers, selectedWorkers, setSelectedWorkers } = props;

  function handleCheckbox(currWorker) {
    console.log(currWorker);
    console.log("hi");
    console.log(notWorkingWorkers);

    let isFound = false;
    for (let i = 0; i < selectedWorkers.length; i++) {
      if (selectedWorkers[i] === currWorker) {
        console.log("abcd");
        isFound = true;
        selectedWorkers.splice(i, 1); // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
        break;
      }
    }
    if (!isFound) {
      selectedWorkers.push(currWorker);
    }
  }
  return notWorkingWorkers.length === 0 ? (
    <>
      <Typography component="h7" variant="h6" align="left" sx={{ m: 1.5 }}>
        You do not have any unassigned workers!
      </Typography>
    </>
  ) : (
    <TableContainer component={Paper} style={{ width: "80%" }} sx={{ mt: 1.5 }}>
      <MuiTable size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center"> Worker Name </TableCell>
            <TableCell align="center"> Select potential worker?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notWorkingWorkers.map((
            notWorkingWorker // notWorkingWorker(no s), for the current worker
          ) => (
            <TableRow>
              <TableCell align="center"> {notWorkingWorker}</TableCell>
              <TableCell align="center">
                {" "}
                <Checkbox
                  onChange={() => {
                    handleCheckbox(notWorkingWorker); // the worker(no s) object whose checkbox is being changed
                    console.log(selectedWorkers);
                  }}
                ></Checkbox>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}

function NotYetWorkingTable(props) {
  const {
    daySelected,
    monthSelected,
    yearSelected,
    selectedWorkers,
    setSelectedWorkers
  } = props; // object destructuring

  const [workingWorkers, setWorkingWorkers] = useState([]); // initialised to empty array, will hold an array of workernames who are already working on that day
  const [workers, setWorkers] = useState([]); // initialised to empty array, will hold an array of all workernames present in the database
  const [notWorkingWorkers, setNotWorkingWorkers] = useState([]); // initialised to empty array, will hold an array of all workernames not yet working

  async function handleDatabase(event) {
    // console.log("handling database");
    // select all worksnames in database under the user who is working on specified date
    let { data: dbWorkingWorkers, WWerror } = await supabase
      .from("RosterTable")
      .select("Worker_Name")
      .eq("Manager_ID", supabase.auth.user().id)
      .eq("day", daySelected)
      .eq("month", monthSelected)
      .eq("year", yearSelected);
    //console.log(dbWorkingWorkers); // dbWorkingWorkers will be an array of workernames(which happen to be objects with only 1 attribute) and we will make a table out of it
    let temp = [];
    for (let i = 0; i < dbWorkingWorkers.length; i++) {
      temp.push(dbWorkingWorkers[i].Worker_Name);
    }
    // temp is now a proper array of worker names

    setWorkingWorkers(temp);

    let { data: dbWorkers, Werror } = await supabase
      .from("ManagerWorkerTable")
      .select("Worker_Name")
      .eq("Manager_ID", supabase.auth.user().id);
    //console.log(dbWorkers); // dbWorkers will be an array of workernames objects. need use temp again to make it into a proper array of strings
    temp = [];
    for (let i = 0; i != null && i < dbWorkers.length; i++) {
      temp.push(dbWorkers[i].Worker_Name);
    }
    // temp is now a proper array of worker names
    setWorkers(temp);

    // here onwards not rly dealing with database but we populate the notWorkingWorkers array
    const unsorted = workers.filter((x) => !workingWorkers.includes(x));
    setNotWorkingWorkers(unsorted.sort()); // https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
    // notWorkingWorkers now is a proper string array of worker names who are not yet working
  }

  useEffect(() => {
    // this will load the database/table upon entering this page and if the dependancies change
    handleDatabase();
    // console.log(notWorkingWorkers);
  }, [daySelected, monthSelected, yearSelected, notWorkingWorkers]); // dependancies // might need to add notWorkingWorkers to dependancy later, but now will cause console to spam

  return (
    <div>
      <br></br>
      <Typography
        component="h7"
        variant="h6"
        align="left"
        sx={{ textDecoration: "underline" }}
      >
        Workers not yet assigned work on {daySelected}/{monthSelected}/
        {yearSelected}{" "}
      </Typography>
      <br></br>

      <MakeNotYetWorkingTable
        notWorkingWorkers={notWorkingWorkers}
        selectedWorkers={selectedWorkers}
        setSelectedWorkers={setSelectedWorkers}
      />
    </div>
  );
}

export default NotYetWorkingTable;
