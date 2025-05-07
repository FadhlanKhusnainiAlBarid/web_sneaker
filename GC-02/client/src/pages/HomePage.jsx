import React, { useState } from "react";
import CardsProduct from "../components/CardsProduct";

function Home() {
  const [data, setdata] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  return (
    <div className="container mx-auto space-y-6">
      <div className="space-y-3">
        <div className="sticky top-0 z-10 bg-white py-1">
          <h1 className="ml-6 text-lg font-medium">Populer</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 lg:gap-2.5 px-0">
          {data.map((d) => (
            <CardsProduct key={d} />
          ))}
          <div className="mb-12" />
        </div>
      </div>
    </div>
  );
}

export default Home;
