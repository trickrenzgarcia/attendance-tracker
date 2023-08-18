export function formatDate(inputDate: string): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const parts = inputDate.split("-");
  const year = parts[0];
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  const date = new Date(inputDate);
  const dayOfWeek = daysOfWeek[date.getDay()];

  const formattedDate = `${months[month - 1]} ${day}, ${year} (${dayOfWeek})`;
  return formattedDate;
}

export function formatTrackedTimeInSeconds(trackedTime: string) {
  let time: string = trackedTime.replace("PT", "").replace("S", "");
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (time.includes("H")) {
    const [hourStr, rest] = time.split("H");
    hours = parseInt(hourStr);
    time = rest;
  }

  if (time.includes("M")) {
    const [minuteStr, rest] = time.split("M");
    minutes = parseInt(minuteStr);
    time = rest;
  }

  if (time.includes("S")) {
    seconds = parseInt(time);
  }

  return hours * 3600 + minutes * 60 + seconds;
}

export function formatTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);

  // Format the date into "h:mm A" format
  const formattedTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTime;
}

export function pthdTo24Hours(duration: string): string {
  // Extract hours, minutes, and seconds from the duration
  const regex = /PT(\d+)H(\d+)M([\d.]+)S/;
  const matches = duration.match(regex);

  if (matches) {
    const hours = parseInt(matches[1]);
    const minutes = parseInt(matches[2]);
    const seconds = parseFloat(matches[3]);

    // Format hours, minutes, and seconds to HH:mm:ss format
    const formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toFixed(0).padStart(2, "0")}`;
    return formattedDuration;
  }

  return "";
}

export function calculateTardiness(individualCheckInTime: string): string {
  const officeStartTimeObj = new Date();
  officeStartTimeObj.setHours(9, 0, 0, 0);

  const individualCheckInTimeObj = new Date(individualCheckInTime);

  const totalOfficeStartMinutes =
    officeStartTimeObj.getHours() * 60 + officeStartTimeObj.getMinutes();
  const totalCheckInMinutes =
    individualCheckInTimeObj.getHours() * 60 +
    individualCheckInTimeObj.getMinutes();

  const tardinessMinutes = totalCheckInMinutes - totalOfficeStartMinutes;

  if (tardinessMinutes <= 0) {
    return "No tardiness";
  } else {
    return `${tardinessMinutes.toString().padStart(2, "0")} minutes`;
  }
}

export const calculateTotalHours = (dailyData: any) => {
  let totalHours = 0;
  for (const entry of dailyData) {
    if (entry.firstIn && entry.lastOut) {
      const firstIn: any = new Date(entry.firstIn);
      const lastOut: any = new Date(entry.lastOut);
      const hoursWorked = (lastOut - firstIn) / (1000 * 60 * 60); // Convert milliseconds to hours
      totalHours += hoursWorked;
    }
  }
  return totalHours;
};
