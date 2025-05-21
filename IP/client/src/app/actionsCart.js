import { addDoc, collection } from "firebase/firestore";
import { setLoading } from "./cartSlice";
import { db } from "../config/firebase";

export const addFavourite = (query) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await addDoc(collection(db, "carts"), {
      userId: query.uid,
      sneakerId: query.sneakerId,
      quantityCheckout: query.quantity,
    });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
