import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSnkr, fetchSnkr } from "../app/actions";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FormSnkr_CU from "../components/FormSnkr_CU";
import ShowResult_CU from "../components/ShowResult_CU";

function EditSnkrPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { snkr, loading } = useSelector((state) => state.snkrs);
  const [name, setname] = useState("");
  const [information, setinformation] = useState("");
  const [price, setprice] = useState("");
  const [status, setstatus] = useState("Men's Shoes");
  const [image, setimage] = useState([["", ""]]);

  const [selectColor, setselectColor] = useState(0);
  const [selectImage, setselectImage] = useState(1);

  const navigate = useNavigate();

  const handleAddImage = (key, index, value) => {
    setimage((prev) =>
      prev.map((data, i) =>
        i === key ? data.map((d, j) => (j === index ? value : d)) : data
      )
    );
  };

  const handleAddInputImage = (index) => {
    setimage((prev) =>
      prev.map((data, i) => (i === index ? [...data, ""] : data))
    );
  };

  const handleDeleteInputImage = (index) => {
    setimage((prev) =>
      prev.map((data, i) => (i === index ? data.slice(0, -1) : data))
    );
  };

  const handleAddInputColor = () => {
    setimage((prev) => {
      return [...prev, [""]];
    });
  };

  const handleDeleteInputColor = () => {
    setselectColor(0);
    setselectImage(1);
    setimage((prev) => {
      return prev.slice(0, -1);
    });
  };

  const handleData = () => {
    const queryResults = {};
    queryResults.id = id;
    queryResults.name = name;
    queryResults.information = information;
    queryResults.status = status;
    queryResults.price = price;
    image.map((d, i) => {
      queryResults.image?.length === 0
        ? (queryResults.image = { [`color_${i + 1}`]: d })
        : (queryResults.image = {
            ...queryResults.image,
            [`color_${i + 1}`]: d,
          });
    });

    return queryResults;
  };

  const handleEdit = async () => {
    try {
      const queryResult = handleData();
      let errorMessage = "";

      if (queryResult.name <= 4) {
        errorMessage = "data name should be more than 4 characters";
        Swal.fire({
          title: "Status Edit",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      if (/\D/.test(queryResult.price)) {
        errorMessage = "Price data all characters must be numbers";
        Swal.fire({
          title: "Status Edit",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      if (queryResult.price.length >= 2) {
        if (queryResult.price.slice(0, 1).includes(0)) {
          errorMessage = "Price data frist character must be number 0";
          Swal.fire({
            title: "Status Edit",
            text: `${errorMessage}`,
            icon: "error",
          });
          return;
        }
      }

      for (const [key, value] of Object.entries(queryResult.image)) {
        if (value.length == 1) {
          errorMessage = `Images ${key.replace(
            "_",
            " "
          )} data must have at least 2 image`;
          Swal.fire({
            title: "Status Edit",
            text: `${errorMessage} this error`,
            icon: "error",
          });
          return;
        }

        for (const [i, v] of value.entries()) {
          if (v.length === 0) {
            errorMessage = `${key.replace("_", " ")} Image ${
              i + 1
            } data required to fill`;
            Swal.fire({
              title: "Status Add",
              text: `${errorMessage}`,
              icon: "error",
            });
            return;
          }
        }
      }

      if (queryResult.information.length < 10) {
        errorMessage = "data information should be more than 10 characters";
        Swal.fire({
          title: "Status Edit",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      dispatch(editSnkr(queryResult));
      Swal.fire({
        title: "Status Edit",
        text: "Success Edit Sneaker!",
        icon: "success",
      });
      navigate("/admin");
    } catch (error) {
      Swal.fire({
        title: "Status Edit",
        text: `${error.message}`,
        icon: "error",
      });
    }
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
          action={handleEdit}
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
