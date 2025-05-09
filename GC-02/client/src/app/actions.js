import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
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

export const addSnkr = (product) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await addDoc(collection(db, "sneakers"), product);
    dispatch(fetchSnkrs());
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const editSnkr = () => async (dispatch) => {};

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
