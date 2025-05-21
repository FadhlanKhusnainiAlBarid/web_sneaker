import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnkr } from "../app/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { AuthContext } from "../context/AuthContext";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../index.css";

// import required modules
import { Pagination } from "swiper/modules";
import { addCart } from "../app/actionsCart";
import Swal from "sweetalert2";

let Rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { snkr, loading } = useSelector((state) => state.sneaker);
  const { status } = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);

  const [selectColor, setselectColor] = useState(1);
  const [selectImage, setselectImage] = useState(1);

  useEffect(() => {
    dispatch(fetchSnkr(id));
  }, [dispatch]);

  // useEffect(() => {
  //   if (snkr) {
  //     console.log(
  //       Object.entries(snkr.image).sort()[1][selectColor][selectImage]
  //     );
  //   }
  // }, [snkr]);

  const handleAddCart = () => {
    try {
      dispatch(addCart({ uid: user.uid, sneakerId: snkr.id }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status) {
      Swal.fire("Status Add Cart", status.massage, status.icon);
    }
  }, [status]);
  return (
    <div className="container mx-auto">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-4 pt-4">
        <div className="lg:block hidden 2xl:col-start-2 lg:col-start-0 col-span-7 lg:col-span-6">
          <div className="2xl:w-4/5 xl:w-5/6 lg:w-6/7 ml-auto flex justify-between gap-x-3.5 sticky top-0">
            <div className="2xl:h-[658.271px] xl:h-[553.656px] lg:h-[439.031px] w-23 lg:w-24 no-scrollbar overflow-y-auto">
              {snkr &&
                Object.entries(snkr.image)
                  .sort()
                  .map(([_, value], index) => (
                    <div key={index}>
                      {index === selectColor - 1 && (
                        <div className="h-fit flex flex-col flex-nowrap gap-y-1.5">
                          {value.slice(1).map((v, i) => (
                            <button
                              key={i}
                              type="button"
                              onMouseEnter={() => setselectImage(i + 1)}
                              className={`relative size-19 cursor-pointer overflow-hidden rounded`}
                            >
                              {selectImage === i + 1 && (
                                <div className="absolute size-full bg-black/40" />
                              )}
                              <img className="size-19" src={v} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
            </div>
            <div className="relative size-full">
              <div className="absolute right-1/20 bottom-1/20 flex justify-between gap-x-2.5 *:flex *:justify-center *:items-center">
                <button
                  onClick={() =>
                    setselectImage((prev) =>
                      1 === prev
                        ? (prev = snkr.image[`color_${selectColor}`].length - 1)
                        : prev - 1
                    )
                  }
                  type="button"
                  className="cursor-pointer active:scale-95 size-10 rounded-full bg-white"
                >
                  <KeyboardArrowLeftIcon fontSize="large" />
                </button>
                <button
                  onClick={() =>
                    setselectImage((prev) =>
                      snkr.image[`color_${selectColor}`].length - 1 === prev
                        ? (prev = 1)
                        : prev + 1
                    )
                  }
                  type="button"
                  className="cursor-pointer active:scale-95 size-10 rounded-full bg-white"
                >
                  <KeyboardArrowRightIcon fontSize="large" />
                </button>
              </div>
              <img
                // src={snkr && snkr.image[`color_${selectColor}`][selectImage]}
                src={
                  snkr &&
                  Object.entries(snkr.image).sort()[selectColor - 1][1][
                    selectImage
                  ]
                }
              />
            </div>
          </div>
        </div>
        <div className="xl:col-span-4 lg:col-span-5 col-end-12">
          <h1 className="ml-4 lg:ml-0 text-wrap line-clamp-2 text-xl lg:text-lg font-semibold leading-6 text-gray-900 dark:text-dark">
            {snkr && snkr.name}
          </h1>
          <p className="ml-4 lg:ml-0 text-base font-medium leading-5 text-gray-700 dark:text-gray-500">
            {snkr && snkr.status}
          </p>
          <p className="ml-4 lg:ml-0 mt-3 text-lg font-semibold mb-3 lg:mb-6">
            {snkr && Rupiah.format(snkr.price)}
          </p>
          <div className="lg:hidden block mb-3">
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {snkr &&
                Object.entries(snkr.image)
                  .sort()
                  .map(([_, value], index) => (
                    <div key={index}>
                      {index === selectColor - 1 && (
                        <>
                          {value.slice(1).map((v) => (
                            <SwiperSlide>
                              <img src={v} alt={snkr.name} />
                            </SwiperSlide>
                          ))}
                        </>
                      )}
                    </div>
                  ))}
            </Swiper>
          </div>
          <div className="w-full overflow-x-scroll lg:overflow-hidden">
            <div className="w-fit flex flex-nowrap gap-2.5">
              {snkr &&
                Object.keys(snkr.image)
                  .sort()
                  .map((k, i) => (
                    <button
                      type="button"
                      onClick={() => {
                        setselectColor(i + 1);
                        setselectImage(1);
                      }}
                      key={i}
                      className={`cursor-pointer overflow-hidden size-28 lg:size-16 rounded ${
                        selectColor == i + 1
                          ? "border"
                          : "hover:border border-black"
                      } border-black`}
                    >
                      <img src={snkr.image[k][0]} alt="" />
                    </button>
                  ))}
            </div>
          </div>
          <div className="mt-6 space-y-2 lg:px-0 px-4">
            <Button
              onClick={handleAddCart}
              className="cursor-pointer w-full bg-black dark:bg-black dark:hover:bg-black/90 rounded-full"
              color="dark"
            >
              Add to Chart
            </Button>
            <Button
              className="cursor-pointer w-full dark:text-dark dark:bg-white dark:hover:bg-gray-50/90 rounded-full"
              color="light"
            >
              Favourite <FavoriteBorderIcon />
            </Button>
          </div>
          <p className="mt-6 lg:mt-9 lg:px-0 px-4 text-sm lg:text-xl font-medium text-black dark:text-black">
            {snkr && snkr.information}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
