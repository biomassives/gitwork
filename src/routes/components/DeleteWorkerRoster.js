// CURRENTLY UNUSED BUT JUST KEEP IN CASE
// CURRENTLY UNUSED BUT JUST KEEP IN CASE
// CURRENTLY UNUSED BUT JUST KEEP IN CASE
// CURRENTLY UNUSED BUT JUST KEEP IN CASE
// CURRENTLY UNUSED BUT JUST KEEP IN CASE
// CURRENTLY UNUSED BUT JUST KEEP IN CASE
// CURRENTLY UNUSED BUT JUST KEEP IN CASE

import { supabase } from "../../supabaseClient";
import Button from "@mui/material/Button";
import React, { useState } from "react";

function DeleteWorkerRoster(props) {
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
      // if worker does not exist, give error since worker must exist before we delete him from roster
      alert(`Worker does not exist and cannot be added into roster`);
    } else {
      let { data: worker, error } = await supabase
        .from("RosterTable")
        .select("*")
        .eq("Worker_Name", workerName)
        .eq("Manager_ID", supabase.auth.user().id)
        .eq("day", daySelected)
        .eq("month", monthSelected)
        .eq("year", yearSelected);

      if (worker.length == 0) {
        // worker not working on specified date so cant delete

        alert(
          `Error: Worker ${workerName} is not working on ${daySelected}/${monthSelected}/${yearSelected}`
        );
      } else {
        // worker is working so delete him from roster on specified date
        const { data, error } = await supabase
          .from("RosterTable")
          .delete()
          .eq("Worker_Name", workerName)
          .eq("Manager_ID", supabase.auth.user().id)
          .eq("day", daySelected)
          .eq("month", monthSelected)
          .eq("year", yearSelected);
        alert(
          `${workerName} has been successfully deleted from roster on ${daySelected}/${monthSelected}/${yearSelected}!`
        );
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleDatabase}>
        <label>
          Name of worker to be deleted:
          <input
            style={{ margin: "0 1rem" }}
            type="text"
            value={workerName}
            // refer to workshop 4th example
            onChange={(event) => setWorkerName(event.target.value)}
          />
        </label>
        <input type="submit" value="Delete" />
      </form>
    </div>
  );
}
export default DeleteWorkerRoster;
