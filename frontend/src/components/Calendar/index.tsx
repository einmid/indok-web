import { IconButton, Grid, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { useState } from "react";
import CalendarTable from "./CalendarTable";
import { DATE_FORMAT } from "./constants";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import DayCell from "./DayCell";

export interface CalendarEvent {
  date: string;
  renderComponent: (key: string) => React.ReactNode;
}

interface CalendarProps {
  disabledDates?: string[];
  handleDateClicked?: (date: string) => void;
  initSelectedDay?: string;
}

const Calendar: React.FC<CalendarProps> = ({ disabledDates, initSelectedDay, handleDateClicked }) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState(initSelectedDay ? dayjs(initSelectedDay) : undefined);

  const previousMonthDays = (month: dayjs.Dayjs): JSX.Element[] => {
    const previousDays: JSX.Element[] = [];
    const firstOfMonth = month.startOf("month");
    const mondayIndex = 0;
    // Check if Month starts with a Monday
    if (firstOfMonth.weekday() !== mondayIndex) {
      const previousMonday = firstOfMonth.subtract(1, "months").endOf("month").weekday(mondayIndex);
      const dayDifference = firstOfMonth.diff(previousMonday, "days") + 1;

      for (let i = 0; i < dayDifference; i++) {
        const date = firstOfMonth.subtract(dayDifference - i, "day");
        previousDays.push(<DayCell key={`prev-${date.format(DATE_FORMAT)}`} isHidden></DayCell>);
      }
    }
    return previousDays;
  };

  const getDaysOfMonth = (month: dayjs.Dayjs) => {
    const daysOfMonth: JSX.Element[] = [];
    const today = dayjs();
    for (let i = 1; i <= month.daysInMonth(); i++) {
      const date = dayjs(month).set("date", i);
      daysOfMonth.push(
        <DayCell
          isSelected={selectedDay ? date.isSame(selectedDay, "day") : false}
          onClick={() => {
            if (handleDateClicked) {
              setSelectedDay(date);
              handleDateClicked(date.format(DATE_FORMAT));
            }
          }}
          isDisabled={date.isBefore(today, "day") || disabledDates?.includes(date.format(DATE_FORMAT))}
          clickable={handleDateClicked === undefined}
          key={date.format(DATE_FORMAT)}
        >
          <Grid container justify="center" alignItems="center" style={{ height: "100%" }}>
            <Grid item>
              <Typography>{i}</Typography>
            </Grid>
          </Grid>
        </DayCell>
      );
    }
    return daysOfMonth;
  };

  const nextMonthDays = (month: dayjs.Dayjs): JSX.Element[] => {
    const nextDays: JSX.Element[] = [];
    const endOfMonth = month.endOf("month");
    const sundayIndex = 6;

    // Check if Month ends with a sunday
    if (endOfMonth.weekday() !== sundayIndex) {
      const nextSunday = endOfMonth.add(1, "months").startOf("month").weekday(sundayIndex);
      const dayDifference = nextSunday.diff(endOfMonth, "days") + 1;

      for (let i = 0; i < dayDifference; i++) {
        const date = dayjs(endOfMonth).add(i + 1, "day");
        nextDays.push(<DayCell key={`next-${date.format(DATE_FORMAT)}`} isHidden></DayCell>);
      }
    }
    return nextDays;
  };

  const getRows = (month: dayjs.Dayjs) => {
    const slots: JSX.Element[] = [...previousMonthDays(month), ...getDaysOfMonth(month), ...nextMonthDays(month)];
    let cells: JSX.Element[];
    return slots.reduce(
      (prev: JSX.Element[][], curr, index) => {
        if (index % 7 === 0) {
          // When we reach 7 days, push new Row
          prev.push(cells);
          // Clear Cells
          cells = [];
        }
        // Push current cell to cells
        cells.push(curr);
        // We reached the end, push last row
        if (index === slots.length - 1) {
          prev.push(cells);
        }
        return prev;
      },
      [[]]
    );
  };

  const onChangeMonth = (months: number) => {
    const newSelectedMonth = selectedMonth.add(months, "months");
    setSelectedMonth(newSelectedMonth);
  };

  return (
    <Grid container direction="column">
      <Grid item container alignItems="center" justify="space-between" xs>
        <IconButton onClick={() => onChangeMonth(-1)}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="body1">{`${selectedMonth.format("MMMM")} - ${selectedMonth.format("YYYY")}`}</Typography>
        <IconButton onClick={() => onChangeMonth(1)}>
          <NavigateNextIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <CalendarTable getRows={getRows} month={selectedMonth.clone()} />
      </Grid>
    </Grid>
  );
};

export default Calendar;
