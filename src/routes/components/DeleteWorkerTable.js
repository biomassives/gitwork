import { supabase } from "../../supabaseClient";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

function MakeDeleteWorkerTable(props) {
  let { workerList } = props;
  useEffect(() => {
    console.log(workerList);
  }, []); // dependancies
  return workerList.length === 0 ? (
    <Typography component="h3" variant="h5" align="center" sx={{ m: 0.5 }}>
      You currently have no workers.
    </Typography>
  ) : (
    <Container maxWidth="md" sx={{ pt: 0, pr: 2, pl: 2 }}>
      <Paper variant="outlined" elevation={2}>
        <Typography component="h1" variant="h4" align="left" sx={{ m: 1.5 }}>
          Worker List
        </Typography>
        <Container sx={{ mx: "auto", my: 2 }}>
          <TableContainer component={Paper} style={{ width: "80%" }}>
            <MuiTable size="small" options={{ filtering: true }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"> Worker Name </TableCell>
                  <TableCell align="center"> Delete Worker? </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workerList.map((worker) => (
                  <TableRow>
                    <TableCell align="center"> {worker}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={async () => {
                          const { data, error } = await supabase
                            .from("ManagerWorkerTable")
                            .delete()
                            .eq("Worker_Name", worker)
                            .eq("Manager_ID", supabase.auth.user().id);
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
        </Container>
      </Paper>
    </Container>
  );
  //<h1>temp</h1>
  //);
}

function DeleteWorkerTable() {
  const [workers, setWorkers] = useState([]);
  function sortFunction(a, b) {
    if (a.toUpperCase() < b.toUpperCase()) {
      return -1;
    } else if (a.toUpperCase() > b.toUpperCase()) {
      return 1;
    }
    return 0;
  }
  async function handleDatabase(event) {
    let { data: dbworkers, error } = await supabase
      .from("ManagerWorkerTable")
      .select("Worker_Name")
      .eq("Manager_ID", supabase.auth.user().id);
    // dbWorkers will be an array of workernames objects. need use temp  to make it into a proper array of string
    let temp = [];
    for (let i = 0; i < dbworkers.length; i++) {
      temp.push(dbworkers[i].Worker_Name);
    }
    temp.sort(sortFunction);
    setWorkers(temp);
    //console.log(workers);
  }
  useEffect(() => {
    // this will load the database/table upon entering this page and if the dependancies change
    handleDatabase();
  }, [workers]); // dependancies
  return <MakeDeleteWorkerTable workerList={workers} />;
}

export default DeleteWorkerTable;
