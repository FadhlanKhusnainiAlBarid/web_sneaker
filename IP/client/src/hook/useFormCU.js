import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addSnkr, editSnkr } from "../app/actions";
import { useDispatch } from "react-redux";

function useFormCU() {
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [information, setinformation] = useState("");
  const [price, setprice] = useState("");
  const [gender, setgender] = useState("Men's Shoes");
  const [image, setimage] = useState([["", ""]]);
  const [quantity, setquantity] = useState(0);

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

  const handleDeleteInputImage = (i, index) => {
    setimage((prev) =>
      prev.map((data, j) =>
        j === i ? data.filter((d, k) => k !== index) : data
      )
    );
  };

  const handleAddInputColor = () => {
    setimage((prev) => {
      return [...prev, [""]];
    });
  };

  const handleDeleteInputColor = (i) => {
    setselectColor(0);
    setselectImage(1);
    setimage((prev) => prev.filter((d, j) => j !== i));
  };

  const handleData = () => {
    const queryResults = {};
    queryResults.name = name;
    queryResults.information = information;
    queryResults.gender = gender;
    queryResults.price = price;
    image.map((d, i) => {
      queryResults.image?.length === 0
        ? (queryResults.image = { [`color_${i + 1}`]: d })
        : (queryResults.image = {
            ...queryResults.image,
            [`color_${i + 1}`]: d,
          });
    });
    queryResults.quantity = quantity;

    return queryResults;
  };

  const handleAdd = async () => {
    try {
      const queryResult = handleData();
      let errorMessage;

      if (queryResult.name <= 4) {
        errorMessage = "data name should be more than 4 characters";
        Swal.fire({
          title: "Status Add",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      if (/\D/.test(queryResult.price)) {
        errorMessage = "Price data all characters must be numbers";
        Swal.fire({
          title: "Status Add",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      if (queryResult.price.length >= 2) {
        if (queryResult.price.slice(0, 1).includes(0)) {
          errorMessage = "Price data frist character must be number 0";
          Swal.fire({
            title: "Status Add",
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
            title: "Status Add",
            text: `${errorMessage}`,
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
          title: "Status Add",
          text: `${errorMessage}`,
          icon: "error",
        });
        return;
      }

      if (queryResult.quantity === 0) {
        errorMessage =
          "Items will not appear if quantity is 0, are you sure about this?";
        await new Promise((resolve) => {
          Swal.fire({
            title: "Status Add",
            text: `${errorMessage}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I'am sure!",
          }).then((result) => {
            if (result.isConfirmed) {
              resolve();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              return;
            }
          });
        });
      }

      dispatch(addSnkr(queryResult));
      Swal.fire({
        title: "Status Add",
        text: "Success Add Sneaker!",
        icon: "success",
      });
      navigate("/admin");
    } catch (error) {
      Swal.fire({
        title: "Status Add",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  const handleEdit = async (id) => {
    try {
      const queryResult = handleData();
      queryResult.id = id;
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
              title: "Status Edit",
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

      if (queryResult.quantity === 0) {
        errorMessage =
          "Items will not appear if quantity is 0, are you sure about this?";
        await new Promise((resolve) => {
          Swal.fire({
            title: "Status Add",
            text: `${errorMessage}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I'am sure!",
          }).then((result) => {
            if (result.isConfirmed) {
              resolve();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              return;
            }
          });
        });
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
    setname("");
    setgender("Men's Shoes");
    setprice("");
    setimage([["", ""]]);
    setinformation("");
    setquantity(0);
    setselectColor(0);
    setselectImage(1);
  }, []);

  return {
    name,
    setname,
    gender,
    setgender,
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
    handleEdit,
  };
}

export default useFormCU;
