"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { Input } from "./ui/input";
import { EmployeeDaily } from '@/lib/types/Employee';

type Props = {
  employees: any;
  token: any;
};

export type Employee = {
  personId: string;
  fullName: string;
  pictureUrl: string;
  daily: EmployeeDaily[];
  days: string;
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
      header: "Total Days", 
      accessorKey: "days",
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
                    <p className="text-sm">type: <b>{user.type}</b></p>
                    <div className="flex items-center pt-2">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Updated on{" "}
                        {new Date(Date.now()).toLocaleDateString("en-US", {
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

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <Input
        placeholder="Filter name..."
        value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("fullName")?.setFilterValue(event.target.value)
        }
        className="max-w-sm my-4"
      />
      <Card>
        <Table>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
