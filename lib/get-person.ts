import { getAccessToken } from "@/lib/access-token";
import axios from "axios";
import { calculateTotalHours } from "@/lib/format-date";
import { getApiEndPoint } from "./get-cutoff";
import { EmployeeDaily } from "./types/Employee";

export const getPerson = async (paramsId: string) => {
  const token = await getAccessToken();
  const endpoint = (await getApiEndPoint()) + `&personIds=${paramsId}`;

  try {
    const responseData = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "json",
    });

    const data = responseData.data.value || [];

    const newData = data.map((item: any) => {
      const totalHours = calculateTotalHours(item.daily);

      return {
        personId: item.personId,
        fullName: item.person.fullName,
        pictureUrl: item.person.pictureUrl,
        totalHours: totalHours.toFixed(1),
        daily: item.daily,
        tracker: item.personId,
        days: item.daily.filter((d: EmployeeDaily) => d.firstIn !== null)
          .length,
      };
    });

    return newData;
  } catch (err) {
    console.error(`Error fetching: ${err}`);
  }
};
