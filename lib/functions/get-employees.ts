import { Employee } from "lib/types/Employee";
import { getOJTS } from "./get-ojts";
import { sliceData } from "./get-slice-data";

export async function getEmployees() {
  const ojts = await getOJTS();
  const emp = await sliceData();

  const ojtNames: Array<string> = ojts.map((ojt: Employee) => ojt.fullName);
  const employees = emp.filter(
    (employee: Employee) => !ojtNames.includes(employee.fullName)
  );

  return employees;
}
