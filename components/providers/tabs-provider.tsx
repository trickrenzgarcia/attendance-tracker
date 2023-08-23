'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Tabs from '../Tabs'
import { TabsContent } from '../ui/tabs'


type Props = {
  children: React.ReactNode
  employees: React.ReactNode,
  ojts: React.ReactNode,
  flexible: React.ReactNode
}

export default function TabsProvider({ employees, ojts, flexible }: Props) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <Tabs>
      <TabsContent value='employees'>{employees}</TabsContent>
      <TabsContent value='ojts'>{ojts}</TabsContent>
      <TabsContent value='flexible'>{flexible}</TabsContent>
    </Tabs>
  )
}