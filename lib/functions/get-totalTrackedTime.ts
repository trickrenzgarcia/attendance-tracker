type Daily = {
  date: string;
  firstIn: string;
  lastOut: string;
  tracked: string;
  regular: string;
  overtime: string;
  dailyOvertime: string;
  dailyDoubleOvertime: string;
  restDayOvertime: string;
  publicHolidayOvertime: string;
};

function parseDurationToHours(duration: string) {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:([\d.]+)S)?/;
  const matches: any = regex.exec(duration);

  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  const seconds = parseFloat(matches[3]) || 0;

  return hours + minutes / 60 + seconds / 3600;
}

function getTotalTrackedTimeInHours(trackedTimes: string[] | undefined) {
  const totalHours = trackedTimes?.reduce((total, duration) => {
    return total + parseDurationToHours(duration);
  }, 0);

  return totalHours;
}

export async function getTotalTrackedTime(daily: Daily[] | null) {
  const trackedTime = daily
    ?.filter((dt: Daily) => dt.tracked !== "PT0S")
    .map((dt: Daily) => dt.tracked);

  return getTotalTrackedTimeInHours(trackedTime)?.toFixed(2);
}
