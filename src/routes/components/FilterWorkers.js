import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import StartCal from "./StartCal";
import EndCal from "./EndCal";

import MaterialTable from "material-table";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";
const generateClassName = createGenerateClassName({
  productionPrefix: "mt",
  seed: "mt"
});

function ShowTable(props) {
  let { tableworkers, shifts, workingdays, attendeddays } = props;
  if (tableworkers.length > 0) {
    for (var i = 0; i < tableworkers.length; ++i) {
      tableworkers[i].shift = shifts[i];
      tableworkers[i].workingday = workingdays[i];
      tableworkers[i].attendance = attendeddays[i];
    }
  }
  console.log(tableworkers);
  //Append the shifts and the days worked to tableworkers to be passed into mui-table
  //console.log(tableworkers);
  //console.log(workingdays);
  //https://material-table.com/#/docs/features/detail-panel
  //https://material-table.com/#/docs/features/custom-column-rendering
  return tableworkers.length === 0 ? (
    <>
      <div>
        <h1>You have no workers!</h1>
        <Link to="/InsertDelete">Click here to add some workers!</Link>
      </div>
    </>
  ) : (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <MaterialTable
          columns={[
            { title: "Worker Name", field: "Worker_Name" },
            { title: "Shifts Worked", field: "shift" },
            { title: "Attendance", field: "attendance" }
          ]}
          data={tableworkers}
          title="List of workers"
          options={{
            filtering: true
          }}
          detailPanel={(rowData) => {
            return (
              <MaterialTable
                title=""
                columns={[
                  { title: "Day", field: "day" },
                  { title: "Month", field: "month" },
                  { title: "Year", field: "year" },
                  {
                    title: "Full Date",
                    render: (workingday) => {
                      return `${workingday.day} / ${workingday.month} / ${workingday.year}`;
                    }
                  },
                  { title: "Attended", field: "Attendance" }
                ]}
                data={rowData.workingday}
              />
            );
          }}
        />
      </StylesProvider>
    </>
  );
}

export default function FilterWorkers() {
  const [StartDate, setStartDate] = useState(new Date(2022, 0, 1, 0));
  const [EndDate, setEndDate] = useState(new Date());
  //Sets starting and ending as a date object
  let [StartDay, setStartDay] = useState(StartDate.getDate());
  let [StartMonth, setStartMonth] = useState(StartDate.getMonth() + 1);
  let [StartYear, setStartYear] = useState(StartDate.getFullYear());
  //Sets the day month and year of StartDate individually
  let [EndDay, setEndDay] = useState(EndDate.getDate());
  let [EndMonth, setEndMonth] = useState(EndDate.getMonth() + 1);
  let [EndYear, setEndYear] = useState(EndDate.getFullYear());
  //Sets day month & year of EndDate individually
  const [workers, setWorkers] = useState([]);
  const [shifts_log, setShifts_log] = useState([]);
  let [flag, setflag] = useState(false);
  //Use for conditional to render table only when button is clicked
  const [DaysWorked, setDaysWorked] = useState([]);
  const [DaysAttended, setDaysAttended] = useState([]);

  async function filter_shifts() {
    setShifts_log([]); //empties the shift log
    setWorkers([]); //empties the worker list
    setDaysWorked([]);
    setDaysAttended([]);
    const Starting_Day = StartYear * 10000 + StartMonth * 100 + StartDay; //sets filterint for starting date
    const Ending_Day = EndYear * 10000 + EndMonth * 100 + EndDay; //sets filterint for ending date
    //console.log(Starting_Day)
    //console.log(Ending_Day)
    let { data: dbworkers, error } = await supabase
      .from("ManagerWorkerTable")
      .select("*")
      .eq("Manager_ID", supabase.auth.user().id);
    setWorkers(dbworkers); //obtains list of workers under manager
    //console.log("Entering")
    for (var i = 0; i < workers.length; i++) {
      const { data: shifts, error1 } = await supabase
        .from("RosterTable")
        .select()
        .eq("Manager_ID", supabase.auth.user().id)
        .eq("Worker_Name", workers[i].Worker_Name)
        .lte("FilterInt", Ending_Day)
        .gte("FilterInt", Starting_Day);
      setShifts_log((shifts_log) => [...shifts_log, shifts.length]); //appends shifts to shift_log

      //const workerdays = shifts.map(({day, month, year}) => [day, month, year]);
      setDaysWorked((DaysWorked) => [...DaysWorked, shifts]);
      const { data: shifts1, error2 } = await supabase
        .from("RosterTable")
        .select()
        .eq("Manager_ID", supabase.auth.user().id)
        .eq("Worker_Name", workers[i].Worker_Name)
        .eq("Attendance", true)
        .lte("FilterInt", Ending_Day)
        .gte("FilterInt", Starting_Day);
      setDaysAttended((DaysAttended) => [...DaysAttended, shifts1.length]);
    }
    //console.log(workers);
    //console.log(shifts_log);
    //console.log(DaysWorked);
  }

  useEffect(() => {
    filter_shifts();
  }, []);

  return (
    <>
      <Typography component="h4" variant="h6" align="left" sx={{ pb: 0.5 }}>
        Filter by date:
      </Typography>
      <StartCal
        value={StartDate}
        setValue={setStartDate}
        setDaySelected={setStartDay}
        setMonthSelected={setStartMonth}
        setYearSelected={setStartYear}
      />
      <br></br>
      <EndCal
        value={EndDate}
        setValue={setEndDate}
        setDaySelected={setEndDay}
        setMonthSelected={setEndMonth}
        setYearSelected={setEndYear}
      />
      <Button
        onClick={() => {
          filter_shifts();
          //console.log("hello");
          //console.log(shifts_log);
          setflag(true);
        }}
        variant="outlined"
        colour="success"
        sx={{ mb: 2, mt: 2 }}
      >
        Display table
      </Button>
      {flag ? (
        <ShowTable
          tableworkers={workers}
          shifts={shifts_log}
          workingdays={DaysWorked}
          attendeddays={DaysAttended}
        />
      ) : (
        <></>
      )}
    </>
  );
}
