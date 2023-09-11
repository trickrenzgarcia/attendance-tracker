import { getAccessToken } from "@/lib/access-token";
import axios from "axios";
import { getApiEndPoint } from "./get-cutoff";
import { EmployeeDaily } from "./types/Employee";
import { PrismaClient } from "@prisma/client";
import { getFlexiblePerson } from "./functions";

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
    const type = await getFlexiblePerson(data[0].person.fullName);

    const newData = data.map((item: any) => {
      return {
        personId: item.personId,
        fullName: item.person.fullName,
        pictureUrl: item.person.pictureUrl,
        daily: item.daily,
        tracker: item.personId,
        days: item.daily.filter((d: EmployeeDaily) => d.firstIn !== null)
          .length,
        type: type,
      };
    });

    return newData;
  } catch (err) {
    console.error(`Error fetching: ${err}`);
  }
};
