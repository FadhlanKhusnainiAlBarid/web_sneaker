import React from "react";
import { Carousel, Card } from "flowbite-react";
import { CarouselTheme, CardTheme } from "../assets/CustomTheme";
import BannerSneaker1 from "../assets/sneaker/1796.jpg";

function Home() {
  return (
    <div className="container mx-auto space-y-6">
      <div className="h-28 md:h-56 lg:h-72 xl:h-80">
        <Carousel theme={CarouselTheme} slide={false}>
          <div className="relative">
            <img className="size-full" src={BannerSneaker1} alt="..." />
          </div>
          <div className="relative">
            <img
              className="size-full"
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
              alt="..."
            />
          </div>
          <div className="relative">
            <img
              className="size-full"
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
          </div>
          <div className="relative">
            <img
              className="size-full"
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
          </div>
          <div className="relative">
            <img
              className="size-full"
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            />
          </div>
        </Carousel>
      </div>
      <div className="space-y-6">
        <h1 className="ml-6 text-2xl font-medium">Populer</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 lg:gap-2.5 px-0">
          <Card
            theme={CardTheme}
            className="max-w-sm md:max-w-full"
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
              <h5 className="text-wrap line-clamp-2 text-lg font-semibold tracking-tight leading-6 text-gray-900 dark:text-white">
                Nike Air Force 1 '07 EasyOn
              </h5>
              <p className="text-wrap line-clamp-2 text-base font-medium leading-5 text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
            <p className="text-xl font-semibold">Rp 1.549.000</p>
          </Card>
          <Card
            theme={CardTheme}
            className="max-w-sm md:max-w-full"
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
              <h5 className="text-wrap line-clamp-2 text-lg font-semibold tracking-tight leading-6 text-gray-900 dark:text-white">
                Nike Air Force 1 '07 EasyOn
              </h5>
              <p className="text-wrap line-clamp-2 text-base font-medium leading-5 text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
            <p className="text-xl font-semibold">Rp 1.549.000</p>
          </Card>
          <Card
            theme={CardTheme}
            className="max-w-sm md:max-w-full"
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
              <h5 className="text-wrap line-clamp-2 text-lg font-semibold tracking-tight leading-6 text-gray-900 dark:text-white">
                Nike Air Force 1 '07 EasyOn
              </h5>
              <p className="text-wrap line-clamp-2 text-base font-medium leading-5 text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
            <p className="text-xl font-semibold">Rp 1.549.000</p>
          </Card>
          <Card
            theme={CardTheme}
            className="max-w-sm md:max-w-full"
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
              <h5 className="text-wrap line-clamp-2 text-lg font-semibold tracking-tight leading-6 text-gray-900 dark:text-white">
                Nike Air Force 1 '07 EasyOn
              </h5>
              <p className="text-wrap line-clamp-2 text-base font-medium leading-5 text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
            <p className="text-xl font-semibold">Rp 1.549.000</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
