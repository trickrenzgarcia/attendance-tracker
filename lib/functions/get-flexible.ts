import { PrismaClient } from "@prisma/client";
import { Employee } from "lib/types/Employee";
import { sliceData } from "./get-slice-data";

const prisma = new PrismaClient();

export async function getFlexibleEmployees() {
  const employees = await sliceData();
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

  const filterFlex = flexEmployees.map((flex: any) => ({
    ...flex,
    type: "Flexible",
  }));

  return filterFlex;
}

export async function getFlexiblePerson(name: string) {
  try {
    const flexi = await prisma.employees.findFirst({
      where: {
        name: name,
      },
      select: {
        employeeType: true,
      },
    });

    return flexi;
  } catch (err) {
    console.log(err);
  }
}
