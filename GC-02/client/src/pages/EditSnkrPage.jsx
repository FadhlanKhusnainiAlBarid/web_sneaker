import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnkr } from "../app/actions";
import { useParams } from "react-router-dom";
import FormSnkr_CU from "../components/FormSnkr_CU";
import ShowResult_CU from "../components/ShowResult_CU";
import useFormCU from "../hook/useFormCU";

function EditSnkrPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { snkr, loading } = useSelector((state) => state.snkrs);
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
    selectColor,
    setselectColor,
    selectImage,
    setselectImage,
    handleAddImage,
    handleAddInputImage,
    handleDeleteInputImage,
    handleAddInputColor,
    handleDeleteInputColor,
    handleEdit,
  } = useFormCU();

  const handleEditAction = () => {
    handleEdit(id);
  };

  useEffect(() => {
    dispatch(fetchSnkr(id));
  }, [dispatch]);

  useEffect(() => {
    if (snkr) {
      setname(snkr.name);
      setstatus(snkr.status);
      setprice(snkr.price);
      const newImages = Object.entries(snkr.image).map(([_, v]) => [...v]);
      setimage(newImages);
      setinformation(snkr.information);
    }
  }, [snkr]);

  let Rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between">
      <div className="size-full p-4">
        <FormSnkr_CU
          action={handleEditAction}
          loading={loading}
          name={name}
          setname={setname}
          status={status}
          setstatus={setstatus}
          price={price}
          setprice={setprice}
          image={image}
          information={information}
          setinformation={setinformation}
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

export default EditSnkrPage;
