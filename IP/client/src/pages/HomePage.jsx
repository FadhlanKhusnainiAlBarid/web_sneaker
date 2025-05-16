import React, { useEffect, useState } from "react";
import CardsProduct from "../components/CardsProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnkrs, FilterSnksr } from "../app/actions";
import { Dropdown, DropdownItem, TextInput } from "flowbite-react";
import { validatePassword } from "firebase/auth";

function Home() {
  const dispatch = useDispatch();
  const { snkrsFilter, loading } = useSelector((state) => state.snkrs);
  const [search, setsearch] = useState({ field: "name", value: "" });
  const [genderFilter, setgenderFilter] = useState({
    field: "gender",
    op: "==",
    value: "",
  });
  const [priceFilter, setpriceFilter] = useState({ field: "price", value: "" });

  useEffect(() => {
    console.log(genderFilter, priceFilter);
    setTimeout(() => {
      dispatch(FilterSnksr([search, genderFilter, priceFilter]));
    }, 1500);
  }, [genderFilter, priceFilter, search]);

  return (
    <div className="container mx-auto space-y-6">
      <div className="space-y-3 mb-[99999px]">
        <div className="flex gap-3.5 items-center sticky top-0 z-10 bg-white py-3">
          <h1 className="ml-6 text-lg font-medium">Populer</h1>
          <TextInput
            id="search"
            type="search"
            placeholder="Search name"
            value={search.value}
            onChange={(e) =>
              setsearch((prev) => {
                return { ...prev, value: e.target.value };
              })
            }
          />
          <Dropdown label="Filter" dismissOnClick={false}>
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
          <Dropdown label="Sort By" dismissOnClick={false}>
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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 lg:gap-2.5 px-0">
          {loading ? (
            <h1>...Loading</h1>
          ) : (
            <>
              {snkrsFilter.map((d) => (
                <CardsProduct key={d.id} data={d} />
              ))}
              {/* snkrs.map((d) => <CardsProduct key={d.id} data={d} />) */}
            </>
          )}
          <div className="mb-12" />
        </div>
      </div>
    </div>
  );
}

export default Home;
