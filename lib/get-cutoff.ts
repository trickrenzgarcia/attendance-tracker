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
