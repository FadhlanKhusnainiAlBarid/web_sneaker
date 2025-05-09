import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { setSnkrs, setSnkr, setLoading } from "./sneakerSlice";
import { useNavigate } from "react-router-dom";

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
    console.log(error);
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
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};
