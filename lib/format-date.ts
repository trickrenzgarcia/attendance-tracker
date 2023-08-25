import moment from "moment";

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
  });
  return formattedTime;
}

export function fixedLastOut(dateTime: string) {
  const employeeLastOut = new Date(dateTime);

  if (!dateTime) {
    return "No record";
  }

  const lastOutTime = new Date(dateTime);

  if (employeeLastOut.getDay() === 6) {
    lastOutTime.setHours(13, 0, 0, 0);
    if (employeeLastOut > lastOutTime) return "01:00 PM";
  } else {
    lastOutTime.setHours(18, 0, 0, 0); // set to 6:00 PM on the same day
    if (employeeLastOut > lastOutTime) return "06:00 PM";
  }

  const formattedTime = new Date(employeeLastOut).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedTime;
}

export function trackedTime(fIn: string, lOut: string, dataTime: string) {
  const firstIn: any = new Date(`2023-08-23 ${fIn}`);
  const lastOut: any = new Date(`2023-08-23 ${lOut}`);

  if (!firstIn || !lastOut || lOut === "No record" || fIn === "No record") {
    return "No record";
  }

  const trackedTimeInSeconds = (lastOut - firstIn) / 1000; // Convert milliseconds to seconds
  const requiredWorkTimeInSeconds = 9 * 60 * 60; // 9 hours in seconds

  if (new Date(dataTime).getDay() === 6) {
    return trackedTimeInSeconds >= 4 * 60 * 60 ? "04:00 PM" : "";
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

function calculateTimeDifference(
  date1: Date,
  date2: Date
): { hours: number; minutes: number } {
  const timeDiffMillis = Math.abs(date1.getTime() - date2.getTime());

  const hours = timeDiffMillis / (1000 * 60 * 60) - 1;
  console.log(hours, "hours");
  const minutes = Math.floor((timeDiffMillis % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
}

export function calculateTardiness(
  firstInDate: string,
  lastOutDate: string,
  dateTime: string
) {
  const lastOutFiltered = fixedLastOut(lastOutDate);
  const firstInFiltered = fixedFormatTime(firstInDate);
  const date = new Date(dateTime);
  const day = date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth();
  const currentFirst: any = new Date(
    `${year}-${month}-${day} ${lastOutFiltered}`
  );
  const currentLast: any = new Date(
    `${year}-${month}-${day} ${firstInFiltered}`
  );

  const hours = Math.floor((currentFirst - currentLast) / 1000 / 60 / 60);
  const minutes = (currentFirst - currentLast) / 1000 / 60;

  if (day === 6) {
    return hours >= 4 ? "No tardiness" : "";
  }

  const isHour: boolean = hours >= 0;

  return hours >= 9 ? "No tardiness" : isHour ? `${hours}hr` : "";

  console.log(minutes);
  if (!lastOutFiltered || !firstInFiltered) return "No record";
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
