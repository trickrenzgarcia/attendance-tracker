"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  employees: any;
  token: any;
};

export type Employee = {
  personId: string;
  fullName: string;
  pictureUrl: string;
  totalHours: Float32Array;
};

export default function EmployeeTable({ employees, token }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isViewing, setIsViewing] = useState<boolean>(false);

  const data = useMemo(() => employees, [employees]);

  useEffect(() => {
    let subscribe = true;

    const getToken = async () => {
      if (subscribe) {
        setIsLoading(true);
      }
    };

    getToken();

    return () => {
      subscribe = false;
      setIsLoading(false);
    };
  }, [isViewing, token]);

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "personId",
      header: "Person ID",
      cell: ({ row }) => <div>{row.getValue("personId")}</div>,
    },
    {
      header: "Full Name",
      accessorKey: "fullName",
    },
    {
      header: "Total Hours",
      accessorKey: "totalHours",
    },
    {
      header: "Visit Profile",
      accessorKey: "tracker",
      cell: ({ row }) => (
        <HoverCard key={row.getValue("tracker")}>
          <HoverCardTrigger asChild>
            <Link href={`/employee/${row.getValue("tracker")}`}>
              <Button>View</Button>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            {data
              .filter((user: any) => user.personId === row.getValue("tracker"))
              .map((user: any) => (
                <div
                  key={user.personId}
                  className="flex justify-between space-x-4"
                >
                  <Avatar>
                    <AvatarImage src={user.pictureUrl} />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      @{`${user.fullName}`}
                    </h4>
                    <p className="text-sm">Click view for more details...</p>
                    <div className="flex items-center pt-2">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Updated on {new Date(Date.now()).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </HoverCardContent>
        </HoverCard>
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <Table>
        <TableCaption>fetched from jibble API</TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: any) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row: any) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell: any) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
