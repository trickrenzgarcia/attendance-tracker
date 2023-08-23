import { PrismaClient } from "@prisma/client";
import { Employee } from "lib/types/Employee";
import { sliceData } from "./get-slice-data";

export async function getOJTS() {
  const employees = await sliceData();
  const prisma = new PrismaClient();

  const ojts = await prisma.employees.findMany({
    where: {
      employeeType: "OJT",
    },
    select: {
      name: true,
      employeeType: true,
    },
  });

  const ojtNames = ojts.map((ojt) => ojt.name);
  const ojtEmployees = employees.filter((employee: Employee) =>
    ojtNames.includes(employee.fullName)
  );

  return ojtEmployees;
}
