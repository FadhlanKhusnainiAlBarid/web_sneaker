import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { setSnkrs, setSnkr, setLoading } from "./sneakerSlice";

export const fetchSnkrs = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getDocs(collection(db, "sneakers"));
    const data = response.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch(setSnkrs(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSnkr = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getDoc(doc(db, "sneakers", id));
    dispatch(setSnkr(response.data()));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addSnkr = (products) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await addDoc(collection(db, "sneakers"), {
      ...products,
      price: Number(products.price),
    });
    dispatch(fetchSnkrs());
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const editSnkr = (products) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await updateDoc(doc(db, "sneakers", products.id), {
      ...products,
      price: Number(products.price),
    });
    dispatch(fetchSnkrs());
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(true));
  }
};

export const deleteSnkr = (arrayId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await arrayId.map(async (id) => {
      await deleteDoc(doc(db, "sneakers", id));
    });
    dispatch(fetchSnkrs());
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
