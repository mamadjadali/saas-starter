import { columns } from "@/components/ui/data-table/columns"
import { DataTable } from "@/components/ui/data-table-admin/DataTable"
import { usage } from "@/data/dashboard/data"
import { TableExample } from "@/components/ui/data-table-admin/DTable"
import Component from "@/components/comp-485"

export default function Example() {
  return (
    <>
      <div className="m-8">
      <h1 className="text-lg font-medium mb-4 text-gray-900 sm:text-xl dark:text-gray-50">
        Patiants
      </h1>
        {/* <DataTable data={usage} columns={columns} /> */}
        <Component/>
      </div>
    </>
  )
}
