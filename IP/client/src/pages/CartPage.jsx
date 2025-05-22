import { Button, HR } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from "../app/actionsCart";
import { AuthContext } from "../context/AuthContext";
import CartRow from "../components/CartRow";
import { setTotalItems } from "../app/cartSlice";

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

function CartPage() {
  const dispatch = useDispatch();
  const { carts, totalItems, totalPrice } = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      dispatch(fetchCarts(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (carts) {
      let newTotalItems = 0;
      carts.forEach((element) => {
        newTotalItems += element.quantityCheckout;
        dispatch(setTotalItems(newTotalItems));
      });
    }
  }, [carts]);
  return (
    <div className="container mx-auto px-2">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-4 pt-4 h-screen">
        <div className="2xl:col-start-2 lg:col-start-0 col-span-8 2xl:col-span-7 px-2">
          <div className="flex flex-col items-center justify-center lg:items-start leading-3.5 lg:mb-3.5">
            <h1 className="text-2xl font-semibold">Cart</h1>
            <div className="lg:hidden block">
              <span className="text-base text-gray-600 font-medium">
                {totalItems} items |
              </span>{" "}
              {Rupiah.format(totalPrice)}
            </div>
            <HR className="lg:hidden block dark:bg-gray-200 w-full mt-7 mb-5" />
          </div>
          <div className="flex flex-col">
            {/* component detail cart */}
            {carts.length > 0 ? (
              carts.map((data) => <CartRow key={data.id} data={data} />)
            ) : (
              <h1 className="text-lg font-medium mb-10">
                There are no items in your bag.
              </h1>
            )}

            <h1 className="lg:block hidden text-2xl font-semibold mt-8 mb-2.5">
              Favourites
            </h1>
            <div className="lg:flex hidden flex-col">
              <div className="relative overflow-hidden">
                <div className="flex justify-between">
                  <div className="w-full flex gap-2.5">
                    <img
                      className="rounded h-41 w-fit"
                      src="https://static.nike.com/a/images/t_PDP_1728_v1/w_592,f_auto,q_auto:eco,b_rgb:f5f5f5/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png"
                      alt=""
                    />
                    <div className="w-full">
                      <div className="w-full flex justify-between">
                        <div>
                          <h1 className="text-wrap line-clamp-2 text-base lg:text-lg font-semibold leading-6 text-gray-900 dark:text-dark">
                            Nike Air Force 1 '07
                          </h1>
                          <p className="mt-px text-base font-medium leading-5 text-gray-700 dark:text-gray-500">
                            Men's Shoes
                          </p>
                        </div>
                        <span className="text-lg text-nowrap font-semibold">
                          Rp 6.196.000,00
                        </span>
                      </div>
                      <button className="cursor-pointer flex items-center gap-2.5 px-4 py-2 mt-2 border hover:border-2 border-gray-200 rounded-full text-md font-medium bg-white">
                        <span className="flex justify-center items-center size-4.5 bg-green-500 rounded-full text-white">
                          <CheckIcon fontSize="exstra small" />
                        </span>
                        Added
                      </button>
                    </div>
                  </div>
                  <Link
                    to="favourite"
                    className="ml-2 flex items-center text-nowrap text-md font-semibold text-gray-500"
                  >
                    Go to Favourites
                    <HR className="absolute w-full border-2 bottom-0 z-10 mb-0 border-black dark:bg-black" />
                  </Link>
                </div>

                <HR className="mb-0 dark:bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-4 lg:col-span-4 col-end-12 px-2 pb-6">
          <h1 className="text-2xl font-semibold mb-2.5">Summary</h1>
          <div className="text-lg font-medium space-y-0 lg:space-y-2.5 leading-">
            <span className="flex justify-between">
              Subtotal <p>Rp 7.745.000,00</p>
            </span>
            <span className="flex justify-between">
              Estimated Delivery & Handling
              <p>Free</p>
            </span>
            <HR className="lg:block hidden my-3.5 dark:bg-gray-200" />
            <span className="mt-3.5 font-semibold flex justify-between">
              Total
              <p>Rp 7.745.000,00</p>
            </span>
            <HR className="lg:block hidden my-3.5 dark:bg-gray-200" />
            <Button
              className="lg:block hidden w-full rounded-full"
              size="xl"
              color="dark"
            >
              Checkout
            </Button>
          </div>
          <h1 className="lg:hidden block text-2xl font-semibold mt-8 mb-2.5">
            Favourites
          </h1>
          <div className="lg:hidden flex flex-col">
            <div className="relative overflow-hidden">
              <div className="flex justify-between">
                <div className="w-full flex gap-2.5">
                  <img
                    className="rounded h-41 w-fit"
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/w_592,f_auto,q_auto:eco,b_rgb:f5f5f5/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-shoes-WrLlWX.png"
                    alt=""
                  />
                  <div className="w-full">
                    <div className="w-full flex justify-between">
                      <div>
                        <h1 className="text-wrap text-base lg:text-lg font-semibold leading-6 text-gray-900 dark:text-dark">
                          Nike Air Force 1 '07
                        </h1>
                        <p className="mt-px line-clamp-1 text-base font-medium leading-5 text-gray-700 dark:text-gray-500">
                          Men's Shoes
                        </p>
                      </div>
                      <span className="text-lg text-nowrap font-semibold">
                        Rp 6.196.000,00
                      </span>
                    </div>
                    <button className="cursor-pointer flex items-center gap-2.5 px-4 py-2 mt-2 border hover:border-2 border-gray-200 rounded-full text-md font-medium bg-white">
                      <span className="flex justify-center items-center size-4.5 bg-green-500 rounded-full text-white">
                        <CheckIcon fontSize="exstra small" />
                      </span>
                      Added
                    </button>
                  </div>
                </div>
              </div>

              <HR className="mb-0 dark:bg-gray-200" />
              <Link
                to="favourite"
                className="relative pb-1 text-nowrap text-md font-semibold text-gray-500"
              >
                Go to Favourites
                <HR className="absolute w-full border-2 bottom-0 z-10 mb-0 border-black dark:bg-black" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
