import React from "react";
import { Button, HR, Label, Select, Textarea, TextInput } from "flowbite-react";
import UploadWidget from "./UploadWidget";
import Tooltip from "@mui/material/Tooltip";

function FormSnkr_CU({
  action,
  loading,
  name,
  setname,
  status,
  setstatus,
  price,
  setprice,
  image,
  information,
  setinformation,
  handleAddImage,
  handleAddInputColor,
  handleDeleteInputColor,
  handleAddInputImage,
  handleDeleteInputImage,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action();
      }}
      className="space-y-5"
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
            >
              Name
            </Label>
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Name"
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
            >
              Price
            </Label>
          </div>
          <TextInput
            id="price"
            type="number"
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
                              defaultValue={data}
                              required
                              readOnly
                            />
                          </Tooltip>
                          <UploadWidget
                            ky={i}
                            index={index}
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
              <Button className="cursor-pointer" onClick={handleAddInputColor}>
                Add Color
              </Button>
              <Button
                className="cursor-pointer"
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
            >
              Information
            </Label>
          </div>
          <Textarea
            id="comment"
            placeholder="Leave a comment..."
            value={information}
            onChange={(e) => setinformation(e.target.value)}
            required
            rows={4}
          />
        </div>
      </div>
      <HR className="my-5" />
      <Button type="submit" className="cursor-pointer w-full h-12 text-lg">
        {loading && (
          <svg
            className="mr-3 -ml-1 size-5  text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        Add
      </Button>
    </form>
  );
}

export default FormSnkr_CU;
