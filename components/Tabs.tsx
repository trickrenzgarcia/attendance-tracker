import React from 'react';
import { Tabs as ShadTabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function Tabs({ children } : { children: React.ReactNode }){
  return (
    <ShadTabs defaultValue='employees' className=''>
      <TabsList>
        <TabsTrigger value='employees'>Employees</TabsTrigger>
        <TabsTrigger value='ojts'>OJT&apos;s</TabsTrigger>
        <TabsTrigger value='flexible'>Flexible</TabsTrigger>
      </TabsList>
      {children}
    </ShadTabs>
  )
}