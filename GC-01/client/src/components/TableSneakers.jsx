import React from "react";
import RowSneakers from "./RowSneakers";

function TableSneakers() {
  return (
    <div className="overflow-hidden overflow-x-auto">
      <table className="min-w-[768px] table-auto">
        <thead>
          <tr className="*:bg-blue-100/60 *:text-blue-600 *:text-start *:text-xl *:pl-2 md:*:pl-4 *:py-2.5 border-t-2 border-blue-300">
            <th>No</th>
            <th>Name</th>
            <th>Image</th>
            <th>Decs</th>
            <th>Price</th>
            <th>Actio</th>
          </tr>
        </thead>
        <tbody>
          <RowSneakers />
        </tbody>
      </table>
    </div>
  );
}

export default TableSneakers;
