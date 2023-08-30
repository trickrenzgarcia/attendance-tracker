const month: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function isFirstCutOff(): boolean {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const lastDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  return (currentDay >= 5 && currentDay <= 20) ||
    (currentDay <= 4 && lastDayOfCurrentMonth === 30)
    ? true
    : false;
}

export function getCurrentCutOff() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const lastDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  return (currentDay >= 5 && currentDay <= 20) ||
    (currentDay <= 4 && lastDayOfCurrentMonth === 30)
    ? `[${month[currentMonth]} ${6} - ${
        month[currentMonth + 1 > 12 ? 1 : currentMonth + 1]
      } 20]`
    : `[${month[currentMonth]} ${21} - ${
        month[currentMonth + 1 > 12 ? 1 : currentMonth + 1]
      } 5]`;
}

export async function getApiEndPoint(): Promise<string> {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const lastDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  if (
    (currentDay >= 5 && currentDay <= 20) ||
    (currentDay <= 4 && lastDayOfCurrentMonth === 30)
  ) {
    return `https://time-attendance.prod.jibble.io/v1/TimesheetsSummary?period=Custom&date=2023-0${currentMonth}-06&endDate=2023-0${currentMonth}-${currentDay}`;
  } else {
    // 21 - 5
    return `https://time-attendance.prod.jibble.io/v1/TimesheetsSummary?period=Custom&date=2023-0${currentMonth}-21&endDate=2023-0${currentMonth}-${currentDay}`;
  }
}
