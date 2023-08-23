import { calculateTotalHours } from "../format-date";
import { getUserData } from "../get-persons";

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
    };
  });

  return newData || [];
}
