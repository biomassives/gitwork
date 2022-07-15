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
//added materialtable
import MaterialTable from "material-table";

const columns = [
  { title: "Worker Name", field: "id" },
  { title: "Select Potential Worker?", field: "selected" }
];

function MakeRosterTable(props) {
  let { WorkerRoster, daySelected, monthSelected, yearSelected } = props; // object destructuring
  return WorkerRoster.length === 0 ? (
    <>
      <div>
        <h1>No workers are working on this day </h1>
      </div>
    </>
  ) : (
    <MaterialTable
      title="List of workers not assigned to work"
      data={WorkerRoster}
      columns={columns}
      options={{
        filtering: true
      }}
    />
  );
}

function NewRosterTable(props) {
  const { daySelected, monthSelected, yearSelected } = props;

  const [workers, setWorkers] = useState([]); // initialised to empty array, will hold an array of objects later containing roster info
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
    setWorkers(dbworkers);
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

export default NewRosterTable;

/*

<TableContainer component={Paper} style={{ width: "80%" }}>
      <MuiTable size="small" options = {{filtering:true}}>
        <TableHead>
          <TableRow>
            <TableCell align="center"> Worker Name </TableCell>
            <TableCell align="center"> Delete? </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {WorkerRoster.map((WorkerRoster) => (
            <TableRow>
              <TableCell align="center"> {WorkerRoster.Worker_Name}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={async () => {
                    const { data, error } = await supabase
                      .from("RosterTable")
                      .delete()
                      .eq("Worker_Name", WorkerRoster.Worker_Name)
                      .eq("Manager_ID", supabase.auth.user().id)
                      .eq("day", daySelected)
                      .eq("month", monthSelected)
                      .eq("year", yearSelected);
                    //alert(`${WorkerRoster.Worker_Name} has been successfully deleted from roster on ${daySelected}/${monthSelected}/${yearSelected}!`); dont rly need anymore since table auto update
                  }}
                  variant="outlined"
                  color="error"
                  size="small"
                >
                  remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>

  */
