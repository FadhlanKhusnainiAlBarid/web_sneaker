import React from "react";
import { Card } from "flowbite-react";
import { CardTheme } from "../assets/CustomTheme";

function CardsProduct() {
  return (
    <Card
      theme={CardTheme}
      className="group cursor-pointer max-w-sm"
      renderImage={() => (
        <img
          width={500}
          height={500}
          src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e794bcae-1c12-4f44-aeca-76efce96aa04/AIR+FORCE+1+%2707+LV8.png"
          alt="image 1"
        />
      )}
    >
      <div className="flex flex-col justify-center gap-2">
        <div className="group-hover:flex hidden gap-2">
          <img
            className="h-12"
            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e794bcae-1c12-4f44-aeca-76efce96aa04/AIR+FORCE+1+%2707+LV8.png"
            alt=""
          />
          <img
            className="h-12"
            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e7b6c6c6-cf50-4772-9bfe-0b15ea19461d/AIR+FORCE+1+%2707+LV8.png"
            alt=""
          />
          <img
            className="h-12"
            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ef454901-b884-44b8-a916-1256d599a5ca/AIR+FORCE+1+%2707+LV8.png"
            alt=""
          />
        </div>
        <h5 className="group-hover:hidden text-wrap line-clamp-2 text-base lg:text-lg font-semibold leading-6 text-gray-900 dark:text-dark">
          Nike Air Force 1 '07 EasyOn
        </h5>
        <p className="group-hover:hidden text-wrap line-clamp-2 text-base font-medium leading-5 text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>
      <p className="text-xl font-semibold mb-3">Rp 1.549.000</p>
    </Card>
  );
}

export default CardsProduct;
