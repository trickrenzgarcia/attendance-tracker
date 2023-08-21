import { sliceData } from "@/lib/get-persons"
import Link from "next/link"

type Person = {
  personId: string,
  fullName: string,
  pictureUrl: string,
  totalHours: number,
}

export default async function Page(){
  const people = await sliceData()
  return (
    <main>
      {people.map(((person: Person) => {
        return (
          <div key={person.personId}>
            <ul>
              <Link href={`/employee/${person.personId}`}>
                <li className="p-3 bg-slate-100 mb-2 border rounded hover:bg-slate-300">{person.fullName}</li>
              </Link>
            </ul>
          </div>
        )
      }))}
    </main>
  )
} 