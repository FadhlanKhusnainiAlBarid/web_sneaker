import { Checkbox, TableCell, TableRow } from "@mui/material";
import React from "react";

function TableRowSnkr({ handleClick, isItemSelected, labelId, row, Rupiah }) {
  return (
    <TableRow
      className="odd:bg-gray-50 flex items-start"
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
      sx={{ cursor: "pointer" }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell padding="none" className="w-24">
        <img src={row.image?.color_1[0] || null} />
      </TableCell>
      <TableCell>{row.information}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{Rupiah.format(row.price)}</TableCell>
    </TableRow>
  );
}

export default TableRowSnkr;
