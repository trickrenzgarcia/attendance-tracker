import { PrismaClient } from "@prisma/client";
import { Employee } from "lib/types/Employee";
import { sliceData } from "./get-slice-data";

export async function getFlexibleEmployees() {
  const employees = await sliceData();
  const prisma = new PrismaClient();

  const flexible = await prisma.employees.findMany({
    where: {
      employeeType: "flexible",
    },
    select: {
      name: true,
      employeeType: true,
    },
  });

  const flexibleNames = flexible.map((flex) => flex.name);
  const flexEmployees = employees.filter((employee: Employee) =>
    flexibleNames.includes(employee.fullName)
  );

  return flexEmployees;
}
