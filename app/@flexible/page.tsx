import EmployeeTable from '@/components/EmployeeTable'
import { getAccessToken } from '@/lib/access-token'
import { getFlexibleEmployees } from '@/lib/functions/get-flexible'
import React from 'react'

export default async function Flexible() {
  const flexible = await getFlexibleEmployees()
  const token = await getAccessToken()
  return (
    <EmployeeTable employees={flexible} token={token} />
  )
}