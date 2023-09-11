import { totalDaysOfWork } from "../format-date";
import { getUserData } from "../get-persons";
import { EmployeeDaily } from "../types/Employee";

export async function sliceData(): Promise<any> {
  const fromAPIData = await getUserData();
  const newData = fromAPIData.map((item: any) => {
    return {
      personId: item.personId,
      fullName: item.person.fullName,
      pictureUrl: item.person.pictureUrl,
      daily: item.daily,
      tracker: item.personId,
      days: item.daily.filter(
        (d: EmployeeDaily) => d.firstIn !== null || d.lastOut !== null
      ).length,
    };
  });

  return newData || [];
}
