import React from "react";

function ShowResult_CU({
  name,
  status,
  price,
  Rupiah,
  image,
  information,
  selectColor,
  setselectColor,
  selectImage,
  setselectImage,
}) {
  return (
    <>
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
      <p className="mt-3 text-lg font-semibold mb-6">{Rupiah.format(price)}</p>
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
        <div className="h-full flex flex-col size-14 gap-1.5">
          <div className="h-fit">
            {image[selectColor]?.slice(1) == "" ? (
              <div className="animate-pulse size-14 rounded bg-gray-400"></div>
            ) : (
              <>
                {image[selectColor]?.slice(1).map((data, i) => (
                  <button
                    type="button"
                    onMouseEnter={() => setselectImage(i + 1)}
                    key={i}
                    className={`relative size-14 ${
                      data === ""
                        ? "animate-pulse rounded bg-gray-400"
                        : "cursor-pointer overflow-hidden rounded"
                    }`}
                  >
                    {selectImage === i + 1 && (
                      <div className="absolute size-full bg-black/40" />
                    )}
                    <img className="size-14" src={data || null} />
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
            <img src={image[selectColor][selectImage]} />
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
    </>
  );
}

export default ShowResult_CU;
