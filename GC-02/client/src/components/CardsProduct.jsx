import React from "react";
import { Card } from "flowbite-react";
import { CardTheme } from "../assets/CustomTheme";

function CardsProduct() {
  return (
    <Card
      theme={CardTheme}
      className="cursor-pointer max-w-sm"
      renderImage={() => (
        <img
          width={500}
          height={500}
          src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f153b4e4-9069-44ae-bf86-f70ae8ecbaa1/W+AIR+FORCE+1+%2707+FLYEASE.png"
          alt="image 1"
        />
      )}
    >
      <div className="flex flex-col justify-center gap-2">
        <h5 className="text-wrap line-clamp-2 text-base lg:text-lg font-semibold leading-6 text-gray-900 dark:text-dark">
          Nike Air Force 1 '07 EasyOn
        </h5>
        <p className="text-wrap line-clamp-2 text-base font-medium leading-5 text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
      <p className="text-xl font-semibold mb-3">Rp 1.549.000</p>
    </Card>
  );
}

export default CardsProduct;
