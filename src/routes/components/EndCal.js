import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
//https://mui.com/x/react-date-pickers/date-picker/

function EndCal(props) {
  let {
    value,
    setValue,
    setDaySelected,
    setMonthSelected,
    setYearSelected
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          inputFormat="dd/MM/yyyy"
          label="Select ending date"
          value={value}
          minDate={new Date("2017-01-01")}
          //formatDate={(date) => moment(date).format("DD-MM-YYYY")}
          onChange={(newValue) => {
            setValue(newValue);
            setDaySelected(newValue.getDate());
            setMonthSelected(newValue.getMonth() + 1);
            setYearSelected(newValue.getFullYear());
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default EndCal;
