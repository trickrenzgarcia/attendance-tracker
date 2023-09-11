import { fixedLastOut, formatTime, trackedTime } from "./format-date";
import { EmployeeDaily } from "./types/Employee";

function calculateWorkHours(
  firstInDate: string,
  lastOutDate: string,
  dateTime: string
) {
  const totalTracked = trackedTime(
    formatTime(firstInDate),
    fixedLastOut(lastOutDate),
    dateTime
  ).split(" ")[0];

  return totalTracked;
}

export function totalHoursWork(daily: EmployeeDaily[]) {
  const t = daily.filter((d) => d.firstIn !== null);
  if (!t) return "No Hours of work!";

  const dailyHours = t
    .map(
      (m) => calculateWorkHours(m.firstIn, m.lastOut, m.firstIn).split(":")[0]
    )
    .map((str) => parseInt(str));

  const dailyMinutes = t
    .map(
      (m) => calculateWorkHours(m.firstIn, m.lastOut, m.firstIn).split(":")[1]
    )
    .map((str) => parseInt(str));

  const totalHours = dailyHours.reduce((acc, curr) => acc + curr, 0);
  const totalMinutes = dailyMinutes.reduce((acc, curr) => acc + curr, 0);
  let hh = totalHours > 1 ? totalHours + " Hours" : totalHours + " Hour";
  let mm =
    totalMinutes > 2 ? totalMinutes + " Minutes" : totalMinutes + " Minute";
  return `${hh} ${mm}`;
}
