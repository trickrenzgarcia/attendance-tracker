import { redirect } from "next/navigation";
import { getAccessToken } from "./access-token";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getApiEndPoint } from "./get-cutoff";

async function getUserData(): Promise<any> {
  const data = await getServerSession(authOptions);

  if (!data) redirect("/api/auth/signin");

  try {
    const accessToken = await getAccessToken();
    const endpoint = await getApiEndPoint();
    const responseData = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return responseData.data.value || [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function sliceData(): Promise<any> {
  const fromAPIData = await getUserData();
  const newData = fromAPIData.map((item: any) => {
    return {
      personId: item.personId,
      fullName: item.person.fullName,
      pictureUrl: item.person.pictureUrl,
      daily: item.daily,
      tracker: item.personId,
    };
  });

  return newData || [];
}

export { sliceData, getUserData };
