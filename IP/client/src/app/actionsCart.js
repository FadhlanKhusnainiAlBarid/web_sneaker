import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  setCarts,
  setLoading,
  setStatus,
  setTotalItems,
  setTotalPrice,
} from "./cartSlice";
import { db } from "../config/firebase";

export const fetchCarts = (uid) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const responseGetAllCart = await getDocs(
      query(collection(db, "carts"), where("userId", "==", uid))
    );

    const dataAllCart = await Promise.all(
      responseGetAllCart.docs.map((dataCart) => {
        const fetchSnkr = async () => {
          const reponse = await getDoc(
            doc(db, "sneakers", dataCart.data().sneakerId)
          );
          return {
            id: reponse.id,
            idCart: dataCart.id,
            ...reponse.data(),
            image: reponse.data().image.color_1[0],
            quantityCheckout: dataCart.data().quantityCheckout,
          };
        };
        return fetchSnkr();
      })
    );
    dispatch(setCarts(dataAllCart));
  } catch (error) {
    dispatch(
      setStatus({
        massage: error.message,
        icon: "error",
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const addCart = (queryId) => async (dispatch, getState) => {
  const { carts } = getState().cart;
  try {
    dispatch(setLoading(true));

    const responseCheck = await getDocs(
      query(
        collection(db, "carts"),
        where("userId", "==", queryId.uid),
        where("sneakerId", "==", queryId.sneakerId)
      )
    );

    const GetSneaker = (
      await getDoc(doc(db, "sneakers", queryId.sneakerId))
    ).data();

    if (!queryId.uid) {
      dispatch(
        setStatus({
          massage: `You mush login to add ${GetSneaker.name} on your cart!`,
          icon: "error",
        })
      );
      return;
    }

    if (responseCheck.docs.length > 0) {
      if (
        GetSneaker.quantity === responseCheck.docs[0].data().quantityCheckout
      ) {
        dispatch(
          setStatus({
            massage:
              "Sorry, you have reached the quantity limit. Please remove an item and try again.",
            icon: "error",
          })
        );
        return;
      }
      // if responseCheck.color selected berbeda maka akan tambah cart yang berbeda color
      const updateData = async () => {
        await updateDoc(doc(db, "carts", responseCheck.docs[0].id), {
          quantityCheckout: responseCheck.docs[0].data().quantityCheckout + 1,
        });
      };
      updateData();
      if (carts.length > 0) {
        dispatch(
          setCarts(
            carts.map((prev) => {
              return prev.id === data.id
                ? { ...prev, quantityCheckout: quantity }
                : { ...prev };
            })
          )
        );
      }
    } else {
      const addData = async () => {
        await addDoc(collection(db, "carts"), {
          userId: queryId.uid,
          sneakerId: queryId.sneakerId,
          quantityCheckout: 1,
          // colorSelected: queryId.colorSelected,
        });
      };
      addData();
    }
    dispatch(
      setStatus({
        massage: `Success add ${GetSneaker.name} to cart!`,
        icon: "success",
      })
    );
  } catch (error) {
    dispatch(
      setStatus({
        massage: error.message,
        icon: "error",
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const operatorCart = (query) => async (dispatch) => {
  await updateDoc(doc(db, "carts", query.id), {
    quantityCheckout: query.quantityCheckout,
  });
  const response = await getDocs(
    collection(db, "carts"),
    where("userId", "==", query.userId)
  );
  let newTotalItems = 0;
  response.forEach((element) => {
    newTotalItems += element.data().quantityCheckout;
  });
  dispatch(setTotalItems(newTotalItems));
  dispatch(changeTotalPrice(query.userId));
};

export const deleteCart = (query) => async (dispatch) => {
  await deleteDoc(doc(db, "carts", query.idCart));
  dispatch(fetchCarts(query.uid));
  const response = await getDocs(
    collection(db, "carts"),
    where("userId", "==", query.userId)
  );
  let newTotalItems = 0;
  response.forEach((element) => {
    newTotalItems += element.data().quantityCheckout;
  });
  dispatch(setTotalItems(newTotalItems));
  dispatch(changeTotalPrice(query.uid));
};

export const changeTotalPrice = (uid) => async (dispatch) => {
  const response = await getDocs(
    query(collection(db, "carts"), where("userId", "==", uid))
  );

  const dataAll = await Promise.all(
    response.docs.map((element) => {
      const getSnkr = async () => {
        const response = await getDoc(
          doc(db, "sneakers", element.data().sneakerId)
        );
        return {
          idCart: element.id,
          ...response.data(),
          quantityCheckout: element.data().quantityCheckout,
        };
      };
      return getSnkr();
    })
  );
  let newTotalItems = 0;
  let newTotalPrice = 0;
  dataAll.forEach((element) => {
    newTotalItems += element.quantityCheckout;
    newTotalPrice += element.quantityCheckout * element.price;
  });
  dispatch(setTotalItems(newTotalItems));
  dispatch(setTotalPrice(newTotalPrice));
};

// export const
