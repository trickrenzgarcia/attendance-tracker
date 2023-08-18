import EmployeeTable from "@/components/EmployeeTable";
import { getAccessToken } from "@/lib/access-token";
import { calculateTotalHours } from "@/lib/format-date";
import axios from "axios";

import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function getUserData(): Promise<any | []> {
  const data = await getServerSession(authOptions)

  if(!data) redirect('/api/auth/signin')

  try {
    const accessToken = await getAccessToken()
    const endpoint = `https://time-attendance.prod.jibble.io/v1/TimesheetsSummary?period=Custom&date=2023-08-01&endDate=2023-08-08`;
    const responseData = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return responseData.data.value || []
  } catch (error){
    console.error('Error fetching data:', error);
  }
}

async function sliceData(): Promise<any> {
  const fromAPIData = await getUserData()
  const newData = fromAPIData.map((item: any) => {
    const totalHours = calculateTotalHours(item.daily)
    
    return {
      personId: item.personId,
      fullName: item.person.fullName,
      pictureUrl: item.person.pictureUrl,
      totalHours: totalHours.toFixed(1),
      daily: item.daily,
      tracker: item.personId
    }

  })

  return newData || []
}

export default async function Home() {
  const employees = await sliceData()
  const token = await getAccessToken()
  return (
    <main>
      <EmployeeTable employees={employees} token={token}/>
    </main>
  )
}

