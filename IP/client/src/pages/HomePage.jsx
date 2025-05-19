import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import CardsProduct from "../components/CardsProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnkrs, FilterSnksr } from "../app/actions";
import {
  Button,
  Dropdown,
  DropdownItem,
  Pagination,
  Spinner,
  TextInput,
} from "flowbite-react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const LIMIT_SNEAKER = 4;

function Home() {
  const dispatch = useDispatch();
  const { snkrsFilter, loading } = useSelector((state) => state.sneaker);
  const [search, setsearch] = useState({
    field: "nameLowerCase",
    op: "==",
    value: "",
  });
  const [genderFilter, setgenderFilter] = useState({
    field: "gender",
    op: "==",
    value: "",
  });
  const [priceFilter, setpriceFilter] = useState({ field: "price", value: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(10);

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    const sub = setTimeout(() => {
      dispatch(
        FilterSnksr({
          query: [
            { ...search, value: search.value.toLowerCase() },
            genderFilter,
            priceFilter,
          ],
          paginate: {
            LIMIT_SNEAKER,
            currentPage,
            setCurrentPage,
            totalPage,
            settotalPage,
          },
        })
      );
    }, 1500);
    return () => clearTimeout(sub);
  }, [genderFilter, priceFilter, search, currentPage]);

  return (
    <div className="container mx-auto space-y-6">
      <div className="space-y-3 mb-12">
        <div className="md:flex gap-3.5 items-center sticky top-0 z-10 bg-white py-3">
          <h1 className="ml-6 text-lg font-medium">Populer</h1>
          <div className="mx-6 flex gap-3.5 items-center py-3">
            <Tooltip title="Search with full name">
              <TextInput
                id="search"
                type="search"
                placeholder="Search name"
                color=""
                value={search.value}
                onChange={(e) =>
                  setsearch((prev) => {
                    return { ...prev, value: e.target.value };
                  })
                }
              />
            </Tooltip>
            <Dropdown
              label="Filter"
              renderTrigger={() => (
                <span className="cursor-default relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-fit">
                  <h1 className="hidden md:block">Filter</h1>
                  <div className="block md:hidden">
                    <FilterListIcon />
                  </div>
                </span>
              )}
              dismissOnClick={false}
            >
              <DropdownItem
                className={`${
                  genderFilter.value === "Men's Shoes" && "bg-gray-500"
                }`}
                onClick={() =>
                  setgenderFilter((prev) =>
                    prev.value === "Men's Shoes"
                      ? { ...prev, value: "" }
                      : { ...prev, value: "Men's Shoes" }
                  )
                }
                value="Men's Shoes"
              >
                Men
              </DropdownItem>
              <DropdownItem
                className={`${
                  genderFilter.value === "Women's Shoes" && "bg-gray-500"
                }`}
                onClick={() =>
                  setgenderFilter((prev) =>
                    prev.value === "Women's Shoes"
                      ? { ...prev, value: "" }
                      : { ...prev, value: "Women's Shoes" }
                  )
                }
                value="Women's Shoes"
              >
                Women
              </DropdownItem>
            </Dropdown>
            <Dropdown
              label="Sort By"
              renderTrigger={() => (
                <span className="cursor-default relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-fit">
                  <h1 className="hidden md:block">Sort By</h1>
                  <div className="block md:hidden">
                    <SwapVertIcon />
                  </div>
                </span>
              )}
              dismissOnClick={false}
            >
              <DropdownItem
                className={`${priceFilter.value === "asc" && "bg-gray-500"}`}
                onClick={() =>
                  setpriceFilter((prev) =>
                    prev.value === "asc"
                      ? { ...prev, value: "" }
                      : { ...prev, value: "asc" }
                  )
                }
                value="asc"
              >
                Price: Low to High
              </DropdownItem>
              <DropdownItem
                className={`${priceFilter.value === "desc" && "bg-gray-500"}`}
                onClick={() =>
                  setpriceFilter((prev) =>
                    prev.value === "desc"
                      ? { ...prev, value: "" }
                      : { ...prev, value: "desc" }
                  )
                }
                value="desc"
              >
                Price: High to Low
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        {loading ? (
          <div className="h-64 w-full items-center flex justify-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : (
          <>
            {snkrsFilter.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 lg:gap-2.5 px-0">
                {snkrsFilter.map((d) => (
                  <CardsProduct key={d.id} data={d} />
                ))}
                <div className="mb-12" />
              </div>
            ) : (
              <div className="h-64 px-6 md:px-0 w-full items-center flex justify-center">
                <h1 className="text-lg font-bold text-center">
                  Sneaker not found, please search full name sneaker.
                </h1>
              </div>
            )}
          </>
        )}
        {!loading && (
          <>
            {snkrsFilter.length > 0 ? (
              <div className="size-full flex py-1.5 gap-3.5 overflow-x-auto items-center justify-center">
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Prev
                </Button>
                <span className="text-xl font-semibold">
                  Page <strong>{currentPage} </strong>of{" "}
                  <strong>{totalPage}</strong>
                </span>
                <Button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPage))
                  }
                >
                  Next
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
