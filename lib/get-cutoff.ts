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
  const currentMonth = currentDate.getMonth() + 1;
  const lastDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentMonth,
    0
  ).getDate(); // Changed to currentMonth

  if (
    currentDay >= 5 &&
    currentDay <= 20 // Changed range from 5-20 to 6-20
  ) {
    // 6 - 20 or 1 - 5 (if last day of the month is 30)
    return `${currentMonth.toString().padStart(2, "0")}-05 -> ${currentMonth
      .toString()
      .padStart(2, "0")}-20 (First Cut-off)`;
  } else {
    // 21 - 4
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextMonthYear =
      currentMonth === 12
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear();

    return `${(currentMonth - 1)
      .toString()
      .padStart(2, "0")}-21 -> ${currentMonth
      .toString()
      .padStart(2, "0")}-04 (Second Cut-off)`;
  }
}

export async function getApiEndPoint(): Promise<string> {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const lastDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentMonth,
    0
  ).getDate(); // Changed to currentMonth

  if (
    (currentDay >= 5 && currentDay <= 20) || // Changed range from 5-20 to 6-20
    (currentDay >= 1 && currentDay <= 5 && lastDayOfCurrentMonth === 30) // Changed range from 1-4 to 1-5
  ) {
    // 5 - 20 or 1 - 5 (if last day of the month is 30)
    return `https://time-attendance.prod.jibble.io/v1/TimesheetsSummary?period=Custom&date=${currentYear}-${currentMonth
      .toString()
      .padStart(2, "0")}-05&endDate=${currentYear}-${currentMonth
      .toString()
      .padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;
  } else {
    // 21 - 4
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    return `https://time-attendance.prod.jibble.io/v1/TimesheetsSummary?period=Custom&date=${currentYear}-${(
      currentMonth - 1
    )
      .toString()
      .padStart(2, "0")}-21&endDate=${currentYear}-${currentMonth
      .toString()
      .padStart(2, "0")}-${currentDay.toString().padStart(2, "0")}`;
  }
}
