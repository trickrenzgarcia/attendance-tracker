import { isNoLastOut } from '@/lib/format-date'
import React from 'react'

type Props = {
  title: string,
  value: string,
  isNoLastOut?: any
}

const Content = ({ title, value, isNoLastOut }: Props) => {

  return (
    <div className='mb-4'>
      <h1 className="text-[14px] text-gray-500">{title}</h1>
      <p className={value && value !== 'PT0S' && value !== '7:30 AM' ? "" : "text-red-500"}>{value && value !== 'PT0S' && value !== '7:30 AM' ? value : value }<span className='text-yellow-500'>{isNoLastOut && ' (No Last Out)'}</span></p>
    </div>
  )
}

export default Content