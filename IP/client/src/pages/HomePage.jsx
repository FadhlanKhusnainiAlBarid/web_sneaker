import React, { useEffect, useState } from "react";
import CardsProduct from "../components/CardsProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnkrs } from "../app/actions";

function Home() {
  const dispatch = useDispatch();
  const { snkrs, loading } = useSelector((state) => state.snkrs);

  useEffect(() => {
    dispatch(fetchSnkrs());
  }, []);

  return (
    <div className="container mx-auto space-y-6">
      <div className="space-y-3">
        <div className="sticky top-0 z-10 bg-white py-1">
          <h1 className="ml-6 text-lg font-medium">Populer</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 lg:gap-2.5 px-0">
          {loading ? (
            <h1>...Loading</h1>
          ) : (
            <>
              {snkrs.map((d) => (
                <CardsProduct key={d.id} data={d} />
              ))}
            </>
          )}
          <div className="mb-12" />
        </div>
      </div>
    </div>
  );
}

export default Home;
