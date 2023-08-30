import { Employee } from "lib/types/Employee";
import { getOJTS } from "./get-ojts";
import { sliceData } from "./get-slice-data";
import { getFlexibleEmployees } from ".";

export async function getEmployees() {
  const ojts = await getOJTS();
  const flexible = await getFlexibleEmployees();
  const emp = await sliceData();

  const ojtNames: Array<string> = ojts.map((ojt: Employee) => ojt.fullName);
  const flexibleNames: Array<string> = flexible.map(
    (flex: Employee) => flex.fullName
  );
  const employees = emp.filter(
    (employee: Employee) =>
      !ojtNames.includes(employee.fullName) ||
      !flexibleNames.includes(employee.fullName)
  );

  return employees;
}
