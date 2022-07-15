import { supabase } from "../../supabaseClient";

import Button from "@mui/material/Button";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// this componenet handles the box you click to add worker

function InsertWorkerRoster(props) {
  const { daySelected, monthSelected, yearSelected } = props;
  const [workerName, setWorkerName] = useState("");

  async function handleDatabase(event) {
    event.preventDefault(); // to prevent the default behaviour of page refreshing upon form submission

    // perform check to see if worker is already in database
    let { data: worker, error } = await supabase
      .from("ManagerWorkerTable")
      .select("*")
      .eq("Worker_Name", workerName)
      .eq("Manager_ID", supabase.auth.user().id);

    console.log(worker);
    console.log(error);

    if (worker.length === 0) {
      // if worker does not exist, give error since worker must exist before we can assign to roster

      alert(`Worker does not exist and cannot be added into roster`);
    } else {
      // worker exist
      let { data: worker, error } = await supabase
        .from("RosterTable")
        .select("*")
        .eq("Worker_Name", workerName)
        .eq("Manager_ID", supabase.auth.user().id)
        .eq("day", daySelected)
        .eq("month", monthSelected)
        .eq("year", yearSelected);
      if (worker.length > 0) {
        // worker already have shift on the specified date
        alert(`Error: Worker ${workerName} is already working!`);
      } // Insert worker for shift
      else {
        const { data, error } = await supabase.from("RosterTable").insert([
          // insert
          {
            Worker_Name: workerName, // add new worker based on the worker name inputted by user
            Manager_ID: supabase.auth.user().id, // get the id of the acc user
            day: daySelected,
            month: monthSelected,
            year: yearSelected
          }
        ]);
        // alert(`Worker named ${workerName} has been scheduled.`); prob not that useful anymore since table now auto updates
      }
    }
  }

  return (
    <>
      <form onSubmit={handleDatabase}>
        <label>
          Name of worker to be added:
          <input
            style={{ margin: "0 1rem" }}
            type="text"
            value={workerName}
            // refer to workshop 4th example
            onChange={(event) => setWorkerName(event.target.value)} // note event is not a keyword, just a name
          />
        </label>
        <input type="submit" value="Add" />
      </form>
    </>
  );
}
export default InsertWorkerRoster;
