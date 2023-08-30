import { Employee } from "lib/types/Employee";
import { getOJTS } from "./get-ojts";
import { sliceData } from "./get-slice-data";
import { getFlexibleEmployees } from ".";
import { PrismaClient } from "@prisma/client";

async function getFixedEmployee() {
  const employees = await sliceData();
  const prisma = new PrismaClient();

  const fixed = await prisma.employees.findMany({
    where: {
      employeeType: "fixed",
    },
    select: {
      name: true,
      employeeType: true,
    },
  });

  const fixedNames = fixed.map((fix) => fix.name);
  const fixedEmployees = employees.filter((employee: Employee) =>
    fixedNames.includes(employee.fullName)
  );

  return fixedEmployees;
}

export async function getEmployees() {
  const fixed = await getFixedEmployee();
  const emp = await sliceData();

  const fixedNames: Array<string> = fixed.map((fix: Employee) => fix.fullName);
  const employees = emp.filter((employee: Employee) =>
    fixedNames.includes(employee.fullName)
  );

  return employees;
}
