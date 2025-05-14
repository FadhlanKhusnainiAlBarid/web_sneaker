import React, { useState } from "react";
import { Card } from "flowbite-react";
import { CardTheme } from "../assets/CustomTheme";
import { Link } from "react-router-dom";

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

function CardsProduct({ data }) {
  const [selectColor, setselectColor] = useState(0);
  return (
    <Link to={`/detail/${data.id}`}>
      <Card
        theme={CardTheme}
        className="group cursor-pointer max-w-sm"
        renderImage={() => (
          <img
            width={500}
            height={500}
            src={Object.values(data.image)[selectColor][0]}
            alt="image 1"
          />
        )}
      >
        <div className="flex flex-col justify-center gap-1">
          {Object.keys(data.image).length > 1 && (
            <>
              <div className="group-hover:flex hidden gap-2">
                {Object.entries(data.image).map(([key, value], i) => (
                  <img
                    key={key}
                    onMouseEnter={() => setselectColor(i)}
                    className="h-12"
                    src={value[0]}
                    alt={data.name}
                  />
                ))}
              </div>
            </>
          )}
          <div
            className={`${
              Object.keys(data.image).length > 1 && "*:group-hover:hidden"
            }`}
          >
            <h5 className="text-wrap line-clamp-2 text-base lg:text-lg font-semibold leading-6 text-gray-900 dark:text-dark">
              {data.name}
            </h5>
            <p className="line-clamp-2 text-base leading-5 text-gray-700 dark:text-gray-500">
              {data.status}
            </p>
            <p className="line-clamp-2 text-base leading-5 text-gray-700 dark:text-gray-500">
              {`${Object.keys(data.image).length} ${
                Object.keys(data.image).length > 1 ? "Colours" : "Colour"
              }`}
            </p>
          </div>
        </div>
        <p className="text-xl font-semibold mb-9">
          {Rupiah.format(data.price)}
        </p>
      </Card>
    </Link>
  );
}

export default CardsProduct;
