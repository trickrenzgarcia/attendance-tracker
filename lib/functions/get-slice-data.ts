import { calculateTotalHours, totalDaysOfWork } from "../format-date";
import { getUserData } from "../get-persons";
import { EmployeeDaily } from "../types/Employee";

export async function sliceData(): Promise<any> {
  const fromAPIData = await getUserData();
  const newData = fromAPIData.map((item: any) => {
    const totalHours = calculateTotalHours(item.daily);

    return {
      personId: item.personId,
      fullName: item.person.fullName,
      pictureUrl: item.person.pictureUrl,
      totalHours: totalHours.toFixed(1),
      daily: item.daily,
      tracker: item.personId,
      days: item.daily.filter(
        (d: EmployeeDaily) => d.firstIn !== null || d.lastOut !== null
      ).length,
    };
  });

  console.log(newData[0].daily[0]);
  return newData || [];
}
