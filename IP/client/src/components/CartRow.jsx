import React, { useContext, useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { HR } from "flowbite-react";
import { useDispatch } from "react-redux";
import { deleteCart, operatorCart } from "../app/actionsCart";
import { AuthContext } from "../context/AuthContext";

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

function CartRow({ data }) {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [quantity, setquantity] = useState(1);

  useEffect(() => {
    if (data) {
      setquantity(data.quantityCheckout);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (quantity === 0) {
        dispatch(deleteCart({ idCart: data.idCart, uid: user.uid }));
      } else {
        dispatch(
          operatorCart({
            id: data.idCart,
            userId: user.uid,
            quantityCheckout: quantity,
          })
        );
      }
    }
  }, [quantity]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-fit flex gap-2.5">
          <div className="space-y-2.5">
            <img className="rounded h-41" src={data.image} alt="" />
            <div className="flex justify-between">
              <div className="flex size-fit rounded-full border border-gray-300">
                <div className="rounded-l-full bg-white">
                  <button
                    onClick={() => setquantity((prev) => Math.max(prev - 1, 0))}
                    className="size-10 cursor-pointer rounded-full hover:bg-gray-300 text-black"
                    color=""
                  >
                    {quantity > 1 ? (
                      <RemoveIcon className="text-black" />
                    ) : (
                      <DeleteOutlineIcon />
                    )}
                  </button>
                </div>
                <input
                  className="inputQuantity bg-gray-50 border-x-0 border-gray-300 h-10 w-6 text-center text-gray-900 text-lg block py-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                  value={quantity}
                  type="number"
                  disabled
                />
                <div className="rounded-r-full bg-white">
                  <button
                    // this max will got from max quantity sneaker
                    onClick={() =>
                      setquantity((prev) => Math.min(prev + 1, data.quantity))
                    }
                    className="size-10 cursor-pointer rounded-full bg-white hover:bg-gray-300 text-black"
                    color=""
                  >
                    <AddIcon className="text-black" />
                  </button>
                </div>
              </div>
              <button className="cursor-pointer size-[39.988px] rounded-full bg-white border border-gray-300 hover:bg-gray-300">
                <FavoriteBorderIcon />
              </button>
            </div>
          </div>
          <div>
            <span className="md:hidden block text-base text-nowrap font-semibold">
              {Rupiah.format(quantity * data.price)}
            </span>
            <h1 className="text-wrap line-clamp-2 text-base lg:text-lg font-semibold leading-6 text-gray-900 dark:text-dark">
              {data.name}
            </h1>
            <p className="mt-px text-base font-medium leading-5 text-gray-700 dark:text-gray-500">
              {data.gender}
            </p>
          </div>
        </div>
        <span className="md:block hidden text-base text-nowrap font-semibold">
          {Rupiah.format(quantity * data.price)}
        </span>
      </div>
      <HR className="mb-0 dark:bg-gray-200" />
    </div>
  );
}

export default CartRow;
