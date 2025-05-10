import React, { useEffect, useState } from "react";
import { Button, Label, Select, TextInput, HR, Textarea } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addSnkr } from "../app/actions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UploadWidget from "../components/UploadWidget";
import Tooltip from "@mui/material/Tooltip";

function AddSnkrPage() {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [information, setinformation] = useState("");
  const [price, setprice] = useState("");
  const [status, setstatus] = useState("Men's Shoes");
  const [image, setimage] = useState([["", ""]]);

  const [selectColor, setselectColor] = useState(0);
  const [selectImage, setselectImage] = useState(1);

  const navigate = useNavigate();

  const handleAddImage = (key, index, value) => {
    setimage((prev) =>
      prev.map((data, i) =>
        i === key ? data.map((d, j) => (j === index ? value : d)) : data
      )
    );
  };

  const handleAddInputImage = (index) => {
    setimage((prev) =>
      prev.map((data, i) => (i === index ? [...data, ""] : data))
    );
  };

  const handleDeleteInputImage = (index) => {
    setimage((prev) =>
      prev.map((data, i) => (i === index ? data.slice(0, -1) : data))
    );
  };

  const handleAddInputColor = () => {
    setimage((prev) => {
      return [...prev, [""]];
    });
  };

  const handleDeleteInputColor = () => {
    setselectColor(0);
    setselectImage(1);
    setimage((prev) => {
      return prev.slice(0, -1);
    });
  };

  const handleData = () => {
    const queryResults = {};
    queryResults.name = name;
    queryResults.status = status;
    queryResults.price = price;
    image.map((d, i) => {
      queryResults.image?.length === 0
        ? (queryResults.image = { [`color_${i + 1}`]: d })
        : (queryResults.image = {
            ...queryResults.image,
            [`color_${i + 1}`]: d,
          });
    });
    queryResults.information = information;

    return queryResults;
  };

  const handleAdd = async () => {
    try {
      const queryResult = handleData();
      let errorMessage;

      if (queryResult.name <= 4) {
        errorMessage = "data name should be more than 4 characters";
        Swal.fire({
          title: "Status Add",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      if (/\D/.test(queryResult.price)) {
        errorMessage = "Price data all characters must be numbers";
        Swal.fire({
          title: "Status Add",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      for (const [key, value] of Object.entries(queryResult.image)) {
        if (value.length == 1) {
          errorMessage = `Images ${key.replace(
            "_",
            " "
          )} data must have at least 2 image`;
          Swal.fire({
            title: "Status Add",
            text: `${errorMessage}`,
            icon: "error",
          });
          return;
        }
      }

      if (queryResult.information.length < 10) {
        errorMessage = "data information should be more than 10 characters";
        Swal.fire({
          title: "Status Add",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      dispatch(addSnkr(queryResult));
      Swal.fire({
        title: "Status Add",
        text: "Success Add Sneaker!",
        icon: "success",
      });
      navigate("/admin");
    } catch (error) {
      Swal.fire({
        title: "Status Add",
        text: `;`,
        icon: "error",
      });
    }
  };

  let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between">
      <div className="size-full p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="space-y-5"
          oninvalid="Please cnknkcndk."
          oninput="this.setCustomValidity('')"
        >
          <div>
            <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium">
              Add New SNKR
            </h1>
          </div>
          <div className="space-y-3">
            {/* input name */}
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="name"
                  className="text-xs dark:text-black md:text-base xl:text-lg"
                  // color={error.name ? "failure" : "gray"}
                >
                  Name
                </Label>
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Name"
                // color={error.name ? "failure" : "gray"}
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>

            {/* input gender */}
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="status"
                  className="text-xs dark:text-black md:text-base xl:text-lg"
                  // color={error.status ? "failure" : "gray"}
                >
                  Status
                </Label>
              </div>
              <Select
                value={status}
                onChange={(e) => setstatus(e.target.value)}
                id="status"
                required
              >
                <option value="Men's Shoes">Men's Shoes</option>
                <option value="Women's Shoes">Women's Shoes</option>
              </Select>
            </div>

            {/* input price */}
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="price"
                  className="text-xs dark:text-black md:text-base xl:text-lg"
                  // color={error.password ? "failure" : "gray"}
                >
                  Price
                </Label>
              </div>
              <TextInput
                id="price"
                type="number"
                // color={error.password ? "failure" : "gray"}
                value={price}
                onChange={(e) => setprice(e.target.value)}
                required
              />
            </div>

            {/* input image */}
            <div>
              <h1 className="text-sm font-medium text-black md:text-base xl:text-lg">
                Image
              </h1>

              <div className="ml-5 space-y-5">
                {image.map((value, i) => {
                  return (
                    <div key={i}>
                      <h1 className="text-sm font-medium text-black md:text-base xl:text-lg">
                        Colour {i + 1}
                      </h1>
                      <div className="ml-5 space-y-3">
                        {value.map((data, index) => (
                          <div key={index}>
                            <div className="mb-1 block">
                              <Label
                                htmlFor={`color${i}image${index}`}
                                className="text-xs dark:text-black md:text-base xl:text-lg"
                                // color={error.password ? "failure" : "gray"}
                              >
                                Image {index + 1}
                              </Label>
                            </div>
                            <div className="flex gap-2">
                              <Tooltip title="Please upload image to fill this field.">
                                <TextInput
                                  className="w-full"
                                  id={`color${i}image${index}`}
                                  type="text"
                                  // color={error.password ? "failure" : "gray"}
                                  value={data}
                                  required
                                  aria-disabled
                                />
                              </Tooltip>
                              <UploadWidget
                                ky={i}
                                index={index}
                                image={image}
                                setimage={setimage}
                                handleAddImage={handleAddImage}
                              />
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleAddInputImage(i)}
                            className="cursor-pointer"
                            type="button"
                            color="light"
                          >
                            Add Image
                          </Button>
                          <Button
                            disabled={value.length == 1}
                            onClick={() => handleDeleteInputImage(i)}
                            className="cursor-pointer"
                            type="button"
                            color="light"
                          >
                            Delete Image
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex gap-3">
                  <Button onClick={handleAddInputColor}>Add Color</Button>
                  <Button
                    disabled={image.length == 1}
                    onClick={handleDeleteInputColor}
                  >
                    Delete Color
                  </Button>
                </div>
              </div>
            </div>

            {/* input information */}
            <div>
              <div className="mb-1 block">
                <Label
                  htmlFor="information"
                  className="text-xs dark:text-black md:text-base xl:text-lg"
                  // color={error.password ? "failure" : "gray"}
                >
                  Information
                </Label>
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                // color={error.password ? "failure" : "gray"}
                value={information}
                onChange={(e) => setinformation(e.target.value)}
                required
                rows={4}
              />
            </div>
          </div>
          <HR className="my-5" />
          <Button type="submit" className="cursor-pointer w-full h-12 text-lg">
            Add
          </Button>
        </form>
      </div>
      <div className="size-full p-4">
        <h1
          className={`${
            name.length > 0
              ? "text-wrap line-clamp-2 text-base lg:text-lg font-semibold leading-6 text-gray-900 dark:text-dark"
              : "animate-pulse w-36 h-5 rounded bg-gray-400"
          }`}
        >
          {name}
        </h1>
        <p
          className={`mt-px ${
            status.length > 0
              ? "text-base font-medium leading-5 text-gray-700 dark:text-gray-500"
              : "animate-pulse w-24 h-4 rounded bg-gray-400"
          }`}
        >
          {status}
        </p>
        <p className="mt-3 text-lg font-semibold mb-6">
          {Rupiah.format(price)}
        </p>
        <div className="flex gap-1">
          {image.map((data, i) => (
            <button
              type="button"
              onClick={() => {
                setselectColor(i);
                setselectImage(1);
              }}
              key={i}
              className={`${
                data[0] == ""
                  ? `animate-pulse size-16 bg-gray-400`
                  : `cursor-pointer overflow-hidden size-16 rounded ${
                      selectColor === i ? "border" : "hover:border border-black"
                    }`
              }`}
            >
              <img src={data[0] || null} alt="" />
            </button>
          ))}
        </div>
        <div className="h-fit mt-6 flex justify-between gap-3.5">
          <div
            className={`h-[832.500px] flex flex-col flex-nowrap w-25 overflow-y-auto gap-1.5`}
          >
            <div className="h-fit">
              {image[selectColor].slice(1) == "" ? (
                <div className="animate-pulse size-14 rounded bg-gray-400"></div>
              ) : (
                <>
                  {image[selectColor].slice(1).map((data, i) => (
                    <button
                      type="button"
                      onMouseEnter={() => setselectImage(i + 1)}
                      key={i}
                      className={`relative size-14 ${
                        data == ""
                          ? "animate-pulse rounded bg-gray-400"
                          : "cursor-pointer overflow-hidden rounded"
                      }`}
                    >
                      {selectImage === i + 1 && (
                        <div className="absolute size-full bg-black/40" />
                      )}
                      <img className="size-14" src={data} alt="" />
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            {image[selectColor][selectImage] === "" ? (
              <div className="animate-pulse w-full h-96 rounded bg-gray-400"></div>
            ) : (
              <img src={image[selectColor][selectImage]} alt="" />
            )}
          </div>
        </div>
        <div className="mt-3">
          {information == "" ? (
            <div className="animate-pulse w-full h-60 rounded bg-gray-400"></div>
          ) : (
            <p className="text-xl font-medium text-black dark:text-black">
              {information}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddSnkrPage;
