import React from "react";
import RowSneakers from "./RowSneakers";
import { Button, Checkbox } from "flowbite-react";

function TableSneakers() {
  return (
    <div className="overflow-hidden overflow-x-auto">
      <div className="flex justify-between py-1">
        <input type="text" className="border" />
        <div className="flex gap-1.5 mr-1">
          <Button>d</Button>
          <Button color="red">c</Button>
        </div>
      </div>
      <table className="w-full min-w-[768px] table-auto">
        <thead>
          <tr className="*:bg-blue-100/60 *:text-blue-600 *:text-start *:text-2xl *:font-medium *:pl-2 md:*:pl-4 *:py-2.5 border-t-2 border-blue-300">
            <th>
              <Checkbox className="p-4" />
            </th>
            <th>No</th>
            <th>Name</th>
            <th>Image</th>
            <th>Decs</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <RowSneakers />
          <RowSneakers />
          <RowSneakers />
          <RowSneakers />
          <RowSneakers />
          <RowSneakers />
          <RowSneakers />
          <RowSneakers />
          <RowSneakers />
        </tbody>
      </table>
    </div>
  );
}

export default TableSneakers;
