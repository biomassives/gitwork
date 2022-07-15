import { supabase } from "../../supabaseClient";

import Button from "@mui/material/Button";
import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function DeleteWorker() {
  const [workerName, setWorkerName] = useState("");

  // delete worker (maybe can add an "are you sure" / confirmation thingy too)
  async function handleDatabase(event) {
    event.preventDefault(); // to prevent the default behaviour of page refreshing upon form submission

    // perform check to see if worker is already in database
    let { data: potential_worker, error } = await supabase
      .from("ManagerWorkerTable")
      .select("*")
      .eq("Worker_Name", workerName)
      .eq("Manager_ID", supabase.auth.user().id);

    //console.log(potential_worker);
    //console.log(error);
    if (potential_worker.length === 0) {
      // if worker doesnt even exist then we inform user
      alert(`Error: Worker named ${workerName} does not exist in database!`);
    } else {
      const { data, error } = await supabase
        .from("ManagerWorkerTable")
        .delete()
        .eq("Worker_Name", workerName)
        .eq("Manager_ID", supabase.auth.user().id);
      alert(`${workerName} has been successfully deleted!`);
    }
  }

  return (
    /*
    <>
      <h2> Delete Worker! </h2>

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
    </>
    */
    <Container maxWidth="md" sx={{ pl: 1.5, pr: 1.5 }}>
      <Paper variant="outlined" elevation={2}>
        <Typography component="h1" variant="h4" align="left" sx={{ m: 1.5 }}>
          Delete Worker
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
              label="Worker to be removed"
              value={workerName}
              onChange={(event) => setWorkerName(event.target.value)}
              sx={{ pr: 1.5 }}
            />
            <Button
              onClick={handleDatabase}
              variant="contained"
              color="error"
              sx={{}}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}
export default DeleteWorker;
