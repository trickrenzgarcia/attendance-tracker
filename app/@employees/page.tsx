import EmployeeTable from '@/components/EmployeeTable'
import { getAccessToken } from '@/lib/access-token'
import { getEmployees } from '@/lib/functions'

export default async function Employees() {
  const employees = await getEmployees()
  const token = await getAccessToken()
  console.log(employees)
  return (
    <EmployeeTable employees={employees} token={token} />
  )
}