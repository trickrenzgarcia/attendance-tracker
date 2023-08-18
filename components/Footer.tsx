import React from 'react'

type Props = {
  corporation: string,
  year: string,
}

export default function Footer({ year, corporation}: Props) {
  return (
    <footer className='mt-10 border-t-[1px] p-10'>
      <h1>@{year} - {corporation}</h1>
    </footer>
  )
}