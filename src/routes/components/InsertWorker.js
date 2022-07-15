import { supabase } from "../../supabaseClient";

import Button from "@mui/material/Button";
import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Input } from "@supabase/ui";
// this componenet handles the box you click to add worker

function InsertWorker() {
  const [workerName, setWorkerName] = useState("");

  async function handleDatabase(event) {
    event.preventDefault(); // to prevent the default behaviour of page refreshing upon form submission

    // perform check to see if worker is already in database
    let { data: potential_worker, error } = await supabase
      .from("ManagerWorkerTable")
      .select("*")
      .eq("Worker_Name", workerName)
      .eq("Manager_ID", supabase.auth.user().id);

    console.log(potential_worker);
    console.log(error);

    if (potential_worker.length === 0) {
      // if worker of that name doesnt exist yet.
      // worker name must be unique in each account, although different account can have same worker name
      const { data, error } = await supabase.from("ManagerWorkerTable").insert([
        {
          Worker_Name: workerName, // add new worker based on the worker name inputted by user
          Manager_ID: supabase.auth.user().id // get the id of the acc user
        }
      ]);
      //console.log(data);
      //console.log(error);
      alert(`${workerName} has been successfully added!`);
    } else {
      alert(
        `Error: Worker named ${workerName} already exists! (Worker names must be unique)`
      );
    }
  }

  return (
    /*
    <>
      <h2> Add Worker! </h2>

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
    */
    <Container maxWidth="md" sx={{ pt: 2, pr: 2, pl: 2 }}>
      <Paper variant="outlined" elevation={2}>
        <Typography component="h1" variant="h4" align="left" sx={{ m: 1.5 }}>
          Add Worker
        </Typography>
        <Box
          component="form"
          sx={{
            m: 1.5
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              size="small"
              id="outlined-required"
              label="Worker to be added"
              value={workerName}
              onChange={(event) => setWorkerName(event.target.value)}
              sx={{ pr: 1.5 }}
              // to prevent user from pressing enter to submit which leads to refresh https://stackoverflow.com/questions/43384039/how-to-get-the-textfield-value-when-enter-key-is-pressed-in-react
              onKeyPress={(ev) => {
                // console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === "Enter") {
                  ev.preventDefault();
                }
              }}
            />
            <Button
              onClick={handleDatabase}
              variant="contained"
              color="success"
              sx={{ pl: 3.2, pr: 3.2 }}
            >
              Add
            </Button>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}
export default InsertWorker;
