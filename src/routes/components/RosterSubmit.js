import { Link, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { supabase } from "../../supabaseClient";
import { useState } from "react";

function RosterSubmit(props) {
  const {
    daySelected,
    monthSelected,
    yearSelected,
    selectedWorkers,
    setSelectedWorkers,
    workersNeeded
  } = props; // object destructuring

  async function submission() {
    // handles submission according to algorithm
    if (selectedWorkers.length === 0) {
      alert("No workers have been selected");
    } else {
      if (workersNeeded >= selectedWorkers.length) {
        // enough vacancies for all interested workers so just throw all workers in
        for (let i = 0; i < selectedWorkers.length; i++) {
          const { data, error } = await supabase.from("RosterTable").insert([
            // insert
            {
              Worker_Name: selectedWorkers[i], // add new worker based on the curr worker name in the selectedWorkers array
              Manager_ID: supabase.auth.user().id, // get the id of the acc user
              day: daySelected,
              month: monthSelected,
              year: yearSelected,
              FilterInt:
                yearSelected * 10000 + monthSelected * 100 + daySelected
            }
          ]);
        }
      } else {
        // {workersNeeded < selectedWorkers.length} // must use algo to select workers fairly
        console.log("algo needed");
        let daysWorked = []; // intialise empty array to keep track of daysworked in the month of each selected worker
        for (let i = 0; i < selectedWorkers.length; i++) {
          let { data: shifts, error } = await supabase
            .from("RosterTable")
            .select("day")
            .eq("Manager_ID", supabase.auth.user().id)
            .eq("month", monthSelected)
            .eq("year", yearSelected)
            .eq("Worker_Name", selectedWorkers[i]);
          console.log(shifts);
          daysWorked.push(shifts.length); // shifts.length will be the number of shifts worked by that worker in the month
        }
        daysWorked.sort();
        console.log(daysWorked);
        const maxDaysWorked = daysWorked[workersNeeded - 1];
        if (daysWorked[workersNeeded - 1] !== daysWorked[workersNeeded]) {
          // no ties, no need for randomisation, can just take all workers with daysWorked<= daysWorked[workersNeeded-1]
          for (let i = 0; i < selectedWorkers.length; i++) {
            // check workers 1 by 1 to see if their days worked <= maxDaysWorked
            let { data: shifts, error } = await supabase
              .from("RosterTable")
              .select("day")
              .eq("Manager_ID", supabase.auth.user().id)
              .eq("month", monthSelected)
              .eq("year", yearSelected)
              .eq("Worker_Name", selectedWorkers[i]);

            if (shifts.length <= maxDaysWorked) {
              // push worker into database if his numshiftsworked is less than max
              const { data, error } = await supabase
                .from("RosterTable")
                .insert([
                  // insert
                  {
                    Worker_Name: selectedWorkers[i], // add new worker based on the curr worker name in the selectedWorkers array
                    Manager_ID: supabase.auth.user().id, // get the id of the acc user
                    day: daySelected,
                    month: monthSelected,
                    year: yearSelected,
                    FilterInt:
                      yearSelected * 10000 + monthSelected * 100 + daySelected
                  }
                ]);
            }
            // else dont push in so do nothing.
          }
        } // ties present, randomisation needed
        else {
          let workersAdded = 0; // to keep track of the number of workers who have been added withou randomisation
          let workersToRandomise = [];
          for (let i = 0; i < selectedWorkers.length; i++) {
            // check workers 1 by 1 to see if their days worked < maxDaysWorked or == maxDaysWorked
            let { data: shifts, error } = await supabase
              .from("RosterTable")
              .select("day")
              .eq("Manager_ID", supabase.auth.user().id)
              .eq("month", monthSelected)
              .eq("year", yearSelected)
              .eq("Worker_Name", selectedWorkers[i]);

            if (shifts.length < maxDaysWorked) {
              // push worker into database if his numshiftsworked is less than max
              const { data, error } = await supabase
                .from("RosterTable")
                .insert([
                  // insert
                  {
                    Worker_Name: selectedWorkers[i], // add new worker based on the curr worker name in the selectedWorkers array
                    Manager_ID: supabase.auth.user().id, // get the id of the acc user
                    day: daySelected,
                    month: monthSelected,
                    year: yearSelected,
                    FilterInt:
                      yearSelected * 10000 + monthSelected * 100 + daySelected
                  }
                ]);
              workersAdded++;
            } else if (shifts.length === maxDaysWorked) {
              workersToRandomise.push(selectedWorkers[i]); // one of the tied workers so we push it to the array
            }
            // else dont push in as shifts.length > maxDaysWorked
          }
          // At this point we will have pushed all workers to DB whose daysworked < maxDaysWorked.
          // But still must settle the remaining workers.
          for (
            let i = 0;
            i < workersNeeded - workersAdded;
            i++ // still need to select (workersNeeded - workersAdded) more workers who are tied.
          ) {
            const randomNum = Math.floor(
              Math.random() * workersToRandomise.length
            ); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random // This will be a number between 0 and length-1
            const workerNameSelected = workersToRandomise[randomNum];
            workersToRandomise.splice(randomNum, 1); // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
            const { data, error } = await supabase.from("RosterTable").insert([
              // insert
              {
                Worker_Name: workerNameSelected, // add new worker based on the curr worker name in the selectedWorkers array
                Manager_ID: supabase.auth.user().id, // get the id of the acc user
                day: daySelected,
                month: monthSelected,
                year: yearSelected,
                FilterInt:
                  yearSelected * 10000 + monthSelected * 100 + daySelected
              }
            ]);
          }
        }

        // must reset the checkboxses for some reason

        setSelectedWorkers([]); // empty the array
      }
    }
  }

  return (
    <Link // this link functions as a button, handling database and then redirecting to management page
      onClick={() => {
        console.log(selectedWorkers);
        submission();
      }}
      to="/management"
    >
      <Button>Submit</Button>
    </Link>
  );
}
export default RosterSubmit;
