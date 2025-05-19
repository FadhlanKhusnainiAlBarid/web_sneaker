import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import { visuallyHidden } from "@mui/utils";
import { TextInput, HR } from "flowbite-react";

import { useDispatch, useSelector } from "react-redux";
import { deleteSnkr, fetchSnkrs, FilterSnksr } from "../app/actions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import TableRowSnkr from "./TableRowSnkr";

function createData(id, name, imageUrl, information, price) {
  return {
    id,
    name,
    imageUrl,
    information,
    price,
  };
}

const rows = [
  createData(
    1,
    "Lorem ipsum dolor sit",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    2,
    "Donut",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    3,
    "Eclair",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    4,
    "Frozen yoghurt",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    5,
    "Gingerbread",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    6,
    "Honeycomb",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    7,
    "Ice cream sandwich",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    8,
    "Jelly Bean",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    9,
    "KitKat",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    10,
    "Lollipop",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    11,
    "Marshmallow",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    12,
    "Nougat",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
  createData(
    13,
    "Oreo",
    "https://static.nike.com/a/images/w_1280,q_auto,f_auto/0812cf8f-ba9e-4bde-8a7b-3082cfcc96c2/air-max-waffle-black-and-hyper-blue-fv6946-400-release-date.jpg",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aperiam tempore qui corrupti esse corporis impedit, odio culpa iste totam non? Obcaecati libero dolorum maxime perferendis quas aliquam doloribus adipisci.",
    20000000
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "name",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: true,
    label: "image",
  },
  {
    id: "information",
    numeric: false,
    disablePadding: false,
    label: "information",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "gender",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "price",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className="capitalize"
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* icons sortable in thead */}
            {headCell.label === "price" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, selected, setSelected } = props;
  const dispatch = useDispatch();
  // const [filter, setfilter] = React.useState([
  //   {
  //     field: "name",
  //     value: "",
  //   },
  //   {
  //     field: "gender",
  //     op: "==",
  //     value: "",
  //   },
  //   {
  //     field: "price",
  //     op: "==",
  //     value: "",
  //   },
  // ]);
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // React.useEffect(() => {
  //   if (filter[0].value || filter[1].value) {
  //     console.log(filter);
  //     setTimeout(() => {
  //       dispatch(FilterSnksr(filter));
  //     }, 1500);
  //   }
  // }, [filter]);

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will not be able to restore these ${numSelected} data!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSnkr(selected));
        setSelected([]);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;
  return (
    <Toolbar
      className="flex justify-between"
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Table
        </Typography>
        // <TextInput
        //   id="search"
        //   type="search"
        //   placeholder="Search Name"
        //   className="w-2/4 md:w-2/5 lg:w-1/4"
        //   color=""
        //   onChange={(e) => {
        //     // const capitalizeWords = (s) => {
        //     //   let arrayString = s.split(" ");
        //     //   let newString = "";
        //     //   arrayString.forEach((string, i) =>
        //     //     i === 0
        //     //       ? string &&
        //     //         (newString +=
        //     //           String(string[0]).toUpperCase() +
        //     //           string.slice(1, string.length))
        //     //       : string &&
        //     //         (newString += ` ${
        //     //           String(string[0]).toUpperCase() +
        //     //           string.slice(1, string.length)
        //     //         }`)
        //     //   );
        //     //   return newString;
        //     // };
        //     setfilter((prev) =>
        //       prev.map((d) =>
        //         d.field === "name" ? { ...d, value: e.target.value } : { ...d }
        //       )
        //     );
        //   }}
        // />
      )}
      {numSelected == 1 && (
        <Link to={`/edit_sneaker/${selected}`}>
          <Tooltip title="Edite Document">
            <IconButton>
              <EditDocumentIcon />
            </IconButton>
          </Tooltip>
        </Link>
      )}
      {numSelected > 0 ? (
        <Tooltip onClick={handleDelete} title="Delete Document">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div>
          <Link to="/add_sneaker">
            <Tooltip title="Add Snkr">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Link>
          {/* <Tooltip
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            title="Filter"
          >
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="py-2 px-4 font-semibold">
              <p className="mb-px" sx={{ p: 0.5 }}>
                Gender:
              </p>
              <p
                className={`cursor-pointer ${
                  filter[1].value === "Men's Shoes" && "text-gray-300"
                }`}
                onClick={() =>
                  setfilter((prev) =>
                    prev.map((d) =>
                      d.field === "gender"
                        ? d.value === "Men's Shoes"
                          ? { ...d, value: "" }
                          : { ...d, value: "Men's Shoes" }
                        : { ...d }
                    )
                  )
                }
                sx={{ p: 0.5 }}
              >
                Men
              </p>
              <p
                className={`cursor-pointer ${
                  filter[1].value === "Women's Shoes" && "text-gray-300"
                }`}
                onClick={() =>
                  setfilter((prev) =>
                    prev.map((d) =>
                      d.field === "gender"
                        ? d.value === "Women's Shoes"
                          ? { ...d, value: "" }
                          : { ...d, value: "Women's Shoes" }
                        : { ...d }
                    )
                  )
                }
                sx={{ p: 0.5 }}
              >
                Women
              </p>
            </div>
            <HR className="my-1 mx-3" />
            <div className="py-2 px-4 font-semibold">
              <p className="mb-px" sx={{ p: 0.5 }}>
                Sort By:
              </p>
              <p
                className={`cursor-pointer ${
                  filter[2].value === "asc" && "text-gray-300"
                }`}
                onClick={() =>
                  setfilter((prev) =>
                    prev.map((d) =>
                      d.field === "price"
                        ? d.value === "asc"
                          ? { ...d, value: "" }
                          : { ...d, value: "asc" }
                        : { ...d }
                    )
                  )
                }
                sx={{ p: 0.5 }}
              >
                Price: High-Low
              </p>
              <p
                className={`cursor-pointer ${
                  filter[2].value === "desc" && "text-gray-300"
                }`}
                onClick={() =>
                  setfilter((prev) =>
                    prev.map((d) =>
                      d.field === "price"
                        ? d.value === "desc"
                          ? { ...d, value: "" }
                          : { ...d, value: "desc" }
                        : { ...d }
                    )
                  )
                }
                sx={{ p: 0.5 }}
              >
                Price: Low-High
              </p>
            </div>
          </Popover> */}
        </div>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
};

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export default function EnhancedTable() {
  const dispatch = useDispatch();
  const { snkrs, loading } = useSelector((state) => state.sneaker);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = snkrs?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - snkrs?.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...snkrs]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, snkrs]
  );

  React.useEffect(() => {
    dispatch(fetchSnkrs());
  }, [dispatch]);
  // end code fetch firestore

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          setSelected={setSelected}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={snkrs?.length}
            />
            <TableBody>
              {loading ? (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              ) : (
                <>
                  {visibleRows?.map((row, index) => {
                    const isItemSelected = selected.includes(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRowSnkr
                        key={row.id}
                        handleClick={handleClick}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        row={row}
                        Rupiah={Rupiah}
                      />
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={snkrs?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
