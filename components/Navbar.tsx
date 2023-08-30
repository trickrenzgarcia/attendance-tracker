"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentCutOff } from '@/lib/get-cutoff';

async function handleLogOut() {
  await signOut();
}

export default function Navbar() {
  const [date, setDate] = useState<string>("");
  const [toggleTheme, setToggleTheme] = useState<boolean>(false);

  const { setTheme } = useTheme();

  function handleThemeMode(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setToggleTheme(!toggleTheme);
    setTheme(toggleTheme ? "dark" : "light");
  }

  useEffect(() => {

    function getDateNow() {
      // Get the current timestamp
      const currentTimestamp = Date.now();

      // Create a Date object from the timestamp
      const currentDate = new Date(currentTimestamp);

      // Months array for converting month index to month name
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Extract the month, day, and year from the date
      const monthIndex = currentDate.getMonth();
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();

      // Convert the month index to the month name
      const monthName = months[monthIndex];

      // Form the desired date format
      setDate(`${monthName} ${day}, ${year}`);
    }
    getDateNow()

  }, []);

  return (
    <nav className="p-4">
      <div className="flex justify-between">
        <div>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="cursor-pointer select-none hover:text-gray-400">
            Tiger&apos;s Mark Company
          </p>
          <h1 className="cursor-pointer hover:text-gray-400 text-2xl md:text-4xl select-none">
            Attendance Tracker
          </h1>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <p className="text-2xl hidden md:contents">Tmc-admin</p>
            <div>
              <Button variant="default" size="icon" onClick={handleThemeMode}>
                {toggleTheme === true ? (
                  <span>
                    <SunIcon />
                  </span>
                ) : (
                  <MoonIcon />
                )}
              </Button>
            </div>

            <Button onClick={handleLogOut}>Logout</Button>
          </div>
          <div className="">
            <h1 className="">Date: <span className='font-bold'>{date}</span></h1>
            <p>Cut off: <span className='font-bold'>{getCurrentCutOff()}</span></p>
          </div>
        </div>
      </div>
    </nav>
  );
}
