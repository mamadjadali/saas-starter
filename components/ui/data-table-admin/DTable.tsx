import { Badge } from "@/components/Badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table"

export function TableExample() {
  const data: Array<{
    workspace: string
    owner: string
    status: string
    costs: string
    region: string
    capacity: string
    lastEdited: string
  }> = [
    {
      workspace: "sales_by_day_api",
      owner: "John Doe",
      status: "Live",
      costs: "$3,509.00",
      region: "US-West 1",
      capacity: "99%",
      lastEdited: "23/09/2023 13:00",
    },
    {
      workspace: "marketing_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "test_environment",
      owner: "David Clark",
      status: "Inactive",
      costs: "$800.00",
      region: "EU-Central 1",
      capacity: "40%",
      lastEdited: "25/09/2023 16:20",
    },
    {
      workspace: "sales_campaign",
      owner: "Jane Smith",
      status: "Live",
      costs: "$5,720.00",
      region: "US-East 2",
      capacity: "80%",
      lastEdited: "22/09/2023 10:45",
    },
    {
      workspace: "development_env",
      owner: "Mike Johnson",
      status: "Inactive",
      costs: "$4,200.00",
      region: "EU-West 1",
      capacity: "60%",
      lastEdited: "21/09/2023 14:30",
    },
    {
      workspace: "new_workspace_1",
      owner: "Alice Brown",
      status: "Inactive",
      costs: "$2,100.00",
      region: "US-West 2",
      capacity: "75%",
      lastEdited: "24/09/2023 09:15",
    },
  ]

  return (
    <>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">
          Workspaces
        </h3>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Overview of all registered workspaces within your organization.
        </p>
      </div>
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Workspace</TableHeaderCell>
              <TableHeaderCell>Owner</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Region</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell className="text-right">Costs</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Last edited
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.workspace}>
                <TableCell >{item.workspace}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "Inactive" ? "warning" : "default"}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.region}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell className="text-right">{item.costs}</TableCell>
                <TableCell className="text-right">{item.lastEdited}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </>
  )
}