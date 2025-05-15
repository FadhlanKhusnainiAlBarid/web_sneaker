import React from "react";
import FormSnkr_CU from "../components/FormSnkr_CU";
import ShowResult_CU from "../components/ShowResult_CU";
import useFormCU from "../hook/useFormCU";
import { useSelector } from "react-redux";

function AddSnkrPage() {
  const { loading } = useSelector((state) => state.snkrs);
  const {
    name,
    setname,
    status,
    setstatus,
    price,
    setprice,
    image,
    setimage,
    information,
    setinformation,
    quantity,
    setquantity,
    selectColor,
    setselectColor,
    selectImage,
    setselectImage,
    handleAddImage,
    handleAddInputImage,
    handleDeleteInputImage,
    handleAddInputColor,
    handleDeleteInputColor,
    handleAdd,
  } = useFormCU();

  const handleAddAction = () => {
    handleAdd();
  };

  let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between">
      <div className="size-full p-4">
        <FormSnkr_CU
          action={handleAddAction}
          loading={loading}
          name={name}
          setname={setname}
          status={status}
          setstatus={setstatus}
          price={price}
          setprice={setprice}
          image={image}
          setimage={setimage}
          information={information}
          setinformation={setinformation}
          quantity={quantity}
          setquantity={setquantity}
          handleAddImage={handleAddImage}
          handleAddInputColor={handleAddInputColor}
          handleDeleteInputColor={handleDeleteInputColor}
          handleAddInputImage={handleAddInputImage}
          handleDeleteInputImage={handleDeleteInputImage}
          setselectColor={setselectColor}
          setselectImage={setselectImage}
        />
      </div>
      <div className="size-full p-4">
        <ShowResult_CU
          name={name}
          status={status}
          price={price}
          Rupiah={Rupiah}
          image={image}
          selectColor={selectColor}
          setselectColor={setselectColor}
          selectImage={selectImage}
          setselectImage={setselectImage}
        />
      </div>
    </div>
  );
}

export default AddSnkrPage;
