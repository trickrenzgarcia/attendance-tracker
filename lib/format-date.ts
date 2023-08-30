import { EmployeeDaily } from "./types/Employee";

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

export function fixedFormatTime(dateTimeStr: string): string {
  const employeeLastOut = new Date(dateTimeStr);

  if (!dateTimeStr) {
    return "No record";
  }

  const firstInTime = new Date(dateTimeStr);
  firstInTime.setHours(9, 0, 0, 0);
  if (employeeLastOut <= firstInTime) return "09:00 AM";

  const formattedTime = new Date(employeeLastOut).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  });
  return formattedTime;
}

export function fixedFirstIn(dateTime: string) {
  const employeeLastOut = new Date(dateTime);

  if (!dateTime) {
    return "No record";
  }

  const lastOutTime = new Date(dateTime);
  lastOutTime.setHours(9, 0, 0, 0);
  if (employeeLastOut >= lastOutTime) return "09:00 AM";

  const formattedTime = new Date(employeeLastOut).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  });
  return formattedTime;
}

export function isNoLastOut(dateTime: string): boolean {
  return !dateTime ? true : false;
}

export function fixedLastOut(dateTime: string) {
  const employeeLastOut = new Date(dateTime);

  if (!dateTime) {
    return "6:00 PM";
  }

  let lastOutTime = new Date(dateTime);
  lastOutTime.setHours(18, 0, 0, 0); // set to 6:00 PM on the same day

  if (employeeLastOut >= lastOutTime) {
    return "06:00 PM";
  }

  const formattedTime = new Date(employeeLastOut).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });
  return formattedTime;
}

export function trackedTime(fIn: string, lOut: string, dataTime: string) {
  const firstIn: any = new Date(`2023-08-23 ${fIn}`);
  const lastOut: any = new Date(`2023-08-23 ${lOut}`);

  if (lOut === "No record" || fIn === "No record") {
    return "No record";
  }

  const trackedTimeInSeconds = (lastOut - firstIn) / 1000; // Convert milliseconds to seconds
  const requiredWorkTimeInSeconds = 9 * 60 * 60; // 9 hours in seconds
  const getPeriod = fIn.split(":")[1].split(" ")[1];

  if (getPeriod == "PM") {
    // walang bawas
    const hours = Math.floor(trackedTimeInSeconds / 3600); // Convert seconds to hours
    const minutes = Math.floor((trackedTimeInSeconds % 3600) / 60); // Remaining seconds to minutes
    const period = hours >= 12 ? "Hours" : "Hours";
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

    return `${displayHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  }

  if (new Date(dataTime).getDay() === 6) {
    if (trackedTimeInSeconds >= 4 * 60 * 60) return "04:00 Hours";
  }

  if (trackedTimeInSeconds >= requiredWorkTimeInSeconds) {
    return "08:00 Hours";
  }

  const hours = Math.floor(trackedTimeInSeconds / 3600 - 1); // Convert seconds to hours
  const minutes = Math.floor((trackedTimeInSeconds % 3600) / 60); // Remaining seconds to minutes
  const period = hours >= 12 ? "Hours" : "Hours";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  return `${displayHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
}

export function formatTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);

  // Format the date into "h:mm A" format
  const formattedTime = date.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
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

function calculateTimeDifference(inputTime: string, day: number): string {
  const standardTime = day !== 6 ? "08:60" : "04:60";
  const [inputHours, inputMinutes] = inputTime.split(":").map(Number);
  const [standardHours, standardMinutes] = standardTime.split(":").map(Number);

  if (!inputTime) return "No record";

  let differenceHours = inputHours - standardHours;
  let differenceMinutes = standardMinutes - inputMinutes;

  let tardiness = "";
  differenceHours++;
  let theresHour = Math.abs(differenceHours);
  if (differenceHours < 0) {
    tardiness = tardiness.concat(
      `${theresHour} hour${theresHour > 1 ? "s" : ""} `
    ); // Corrected this line
  }
  if (differenceMinutes != 60) {
    tardiness = tardiness.concat(
      `${differenceMinutes} minute${differenceMinutes > 1 ? "s" : ""}`
    ); // Corrected this line
  }
  if (!tardiness) return "No tardiness";
  return tardiness;
}

export function calculateTardiness(
  firstInDate: string,
  lastOutDate: string,
  dateTime: string
) {
  const day = new Date(dateTime).getDay();
  const totalTracked = trackedTime(
    formatTime(firstInDate),
    fixedLastOut(lastOutDate),
    dateTime
  ).split(" ")[0];

  const tardiness = calculateTimeDifference(totalTracked, day);
  return tardiness;
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

export const isNotLate = (inputValue: string): boolean => {
  const timeIn = new Date(`2023-08-23 ${inputValue}`);
  const lateTime = new Date(`2023-08-23 9:00 AM`);
  return timeIn < lateTime;
};

export function totalDaysOfWork(daily: EmployeeDaily[]) {
  // this function grab daily of employee and get the length of his days of work
  return daily.filter(
    (d: EmployeeDaily) => d.firstIn !== null && d.lastOut !== null
  ).length;
}

export function totalTardinessTime(daily: EmployeeDaily[]) {
  const t = daily.filter((d) => d.firstIn !== null && d.lastOut !== null);
  if (!t) return "No tardiness";
  const m = t
    .map((x) => calculateTardiness(x.firstIn, x.lastOut, x.firstIn))
    .filter((c) => c.includes("minutes") || c.includes("minute"))
    .map((z) => parseInt(z.split(" ")[0]));
  const h = t
    .map((x) => calculateTardiness(x.firstIn, x.lastOut, x.firstIn))
    .filter((c) => c.includes("hours") || c.includes("hour"))
    .map((z) => parseInt(z.split(" ")[0]));

  // Sum up the total minutes
  const totalMinutes = m.reduce((acc, current) => acc + current, 0);

  const totalHours = h.reduce((acc, cur) => acc + cur, 0);

  // Convert total minutes to hours and minutes
  const hours = Math.floor(totalMinutes / 60) + totalHours;
  const minutes = totalMinutes % 60;
  let hh = hours > 1 ? hours + " hours" : hours + " hour";
  let mm = minutes > 1 ? minutes + " minutes" : minutes + " minute";

  // Format hours and minutes
  if (hours <= 0) return mm;

  return hh + " " + mm;
}
