import { getAccessToken } from "@/lib/access-token";
import axios from "axios";
import { calculateTotalHours } from "@/lib/format-date";

export const getPerson = async (paramsId: string) => {
  const token = await getAccessToken();
  const date = "2023-08-05";
  const endDate = "2023-08-21";
  const endpoint = `https://time-attendance.prod.jibble.io/v1/TimesheetsSummary?period=Custom&date=${date}&endDate=${endDate}&personIds=${paramsId}`;

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
      };
    });

    return newData;
  } catch (err) {
    console.error(`Error fetching: ${err}`);
  }
};