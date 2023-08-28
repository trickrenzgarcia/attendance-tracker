export type Employee = {
  personId: string;
  fullName: string;
  pictureUrl: string;
  totalHours: number;
  daily: [] | null;
  tracker: string;
};

export type EmployeeDaily = {
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
