import EmployeeTable from '@/components/EmployeeTable'
import { getAccessToken } from '@/lib/access-token'
import { getOJTS } from '@/lib/functions'

export default async function Ojts() {
  const ojts = await getOJTS()
  const token = await getAccessToken()

  return (
    <main className='min-h-[640px]'>
      <EmployeeTable employees={ojts} token={token} />
    </main>
  )
}