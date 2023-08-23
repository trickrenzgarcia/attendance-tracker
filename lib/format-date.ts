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

export function calculateTardiness(input: string): string {
  // Extract hours, minutes, and seconds from the input
  const match: any = input.match(/PT(?:(\d+)H)?(?:(\d+)M)?(\d+\.\d+)S/);
  if (!match) {
    return "";
  }

  const hours = parseFloat(match[1] || 0);
  const minutes = parseFloat(match[2] || 0);
  const seconds = parseFloat(match[3]);

  // Convert input time to minutes
  const totalMinutes = hours * 60 + minutes + seconds / 60;

  // Check if the total time is greater than or equal to 9 hours
  if (totalMinutes >= 9 * 60) {
    return "No tardiness";
  } else {
    // Calculate tardiness
    const tardinessMinutes = 9 * 60 - totalMinutes;
    return `${tardinessMinutes.toFixed(2)} minutes`;
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

export const isNotLate = (inputValue: string): boolean => {
  const timeIn = new Date(`2023-08-23 ${inputValue}`);
  const lateTime = new Date(`2023-08-23 9:00 AM`);
  return timeIn < lateTime;
};
