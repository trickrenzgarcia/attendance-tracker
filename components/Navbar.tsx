'use client'

import { useState } from 'react'

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { signOut } from 'next-auth/react'
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

async function handleLogOut(){
  await signOut()
}

export default function Navbar() {
  const [toggleTheme, setToggleTheme] = useState<boolean>(false)

  const { setTheme } = useTheme()

  function handleThemeMode(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setToggleTheme(!toggleTheme)
    setTheme(toggleTheme ? 'light' : 'dark')
  }

  return (
    <nav className='p-4'>
      <div className="flex justify-between">
        <div>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="cursor-pointer select-none hover:text-gray-400">Tiger's Mark Company</p>
          <h1 className='cursor-pointer hover:text-gray-400 text-2xl md:text-4xl select-none'>Attendance Tracker</h1>
        </div>
        
        <div className='flex flex-row items-center gap-5'>
          <p className='text-2xl hidden md:contents'>Tmc-admin</p>
          <div>
          <Button variant="default" size="icon" onClick={handleThemeMode}>
            {toggleTheme === true ? (
              <span>
                <SunIcon/>
              </span>
             
            ): (
              <MoonIcon/>
            )}
          </Button>
          </div>

          <Button onClick={handleLogOut}>Logout</Button>

        </div>
      </div>
    </nav>
  )
}