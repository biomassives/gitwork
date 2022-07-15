import { Link } from "react-router-dom";

import InsertWorker from "./components/InsertWorker";

import TopBar from "./components/TopBar";
import DeleteWorkerTable from "./components/DeleteWorkerTable";

export default function roster() {
  return (
    <>
      <TopBar />

      <InsertWorker />
      <br></br>

      <DeleteWorkerTable />
    </>
  );
}
