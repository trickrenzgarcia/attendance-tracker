import React from 'react'

type Props = {
  title: string,
  value: string | null,
}

const Content = ({ title, value }: Props) => {
  return (
    <div className='mb-4'>
      <h1 className="text-[14px] text-gray-500">{title}</h1>
      <p className={value && value !== 'PT0S' && value !== '7:30 AM' ? "" : "text-red-500"}>{value && value !== 'PT0S' && value !== '7:30 AM' ? value : 'No record' }</p>
    </div>
  )
}

export default Content