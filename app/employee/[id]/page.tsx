import { Button } from "@/components/ui/button";
import { getPerson } from "@/lib/get-person";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link"; 
import { calculateTardiness, formatDate, formatTime, pthdTo24Hours } from "@/lib/format-date";
import Content from "@/components/Content";

import { getServerSession } from 'next-auth/next'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string }}){
  const data = await getServerSession(authOptions)

  if(!data) redirect('/api/auth/signin')

  const person = await getPerson(params.id)
  
  return (
    <main> 
      {person.map((p: any) => (
        <div key={p.personId}>
          <div className="grid grid-rows-3 grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3 xl:col-span-4 row-span-3 lg:row-s">
              <Card>
                <div className="relative w-full max-w-[265px] aspect-square my-8 mx-auto">
                  <Image className="rounded-full border-gray-400 border-4" src={p.pictureUrl} alt="default profile" fill priority/>
                </div>
              </Card>
              
            </div>
            <div className="col-span-12 lg:col-span-9 xl:col-span-8 row-span-3">
              <Card>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>Details</CardTitle>
                        <CardDescription>A information of a person.</CardDescription>
                      </div>
                      <div>
                        <Link href='/'><Button className="px-6">Back</Button></Link>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className="text-[14px]">Person Id:</span>
                    <p className="font-bold mb-5 text-[22px]">{p.personId}</p>

                    <span className="text-[14px]">Full name</span>
                    <p className="font-bold mb-5 text-[22px]">{p.fullName}</p>

                    <span className="text-[14px]">Total hours of work</span>
                    <p className="font-bold mb-5 text-3xl">{p.totalHours}</p>
                    
                  </CardContent>
              </Card>
            </div>
            <Card className="col-span-12">
              <CardHeader>
                
                <CardTitle>Attendance record</CardTitle>
                <CardDescription>An employee attendance records</CardDescription>
                
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {p.daily[0] != null ? p.daily.map((d: any) => (
                    d.firstIn || d.lastOut ? (
                      <Card key={d.date} className="col-span-3 md:grid-cols-2 lg:col-span-1 xl:col-span-1">
                        <CardHeader>
                          <CardTitle>{formatDate(d.date)}</CardTitle>
                          <CardDescription>Date</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Content title="First In:" value={formatTime(d.firstIn)} />
                          <Content title="Last Out:" value={formatTime(d.lastOut)} />
                          <Content title="Total Tracked Time:" value={pthdTo24Hours(d.tracked)} />
                          <Content title="Tardy in minutes:" value={calculateTardiness(d.firstIn)} />
                          <Content title="Overtime: " value={pthdTo24Hours(d.overtime)}/>
                        </CardContent>
                      </Card>
                    ): null)
                  ) : (
                    <div className="p-10">
                      <h1 className="text-center text-3xl">No records was found.</h1>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </main>
  )
}