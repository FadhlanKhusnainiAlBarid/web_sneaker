import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { setSnkrs, setSnkr, setLoading, setSnkrsFilter } from "./sneakerSlice";

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

export const fetchSnkrsFilter = (filter) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let q = query(collection(db, "sneakers"));
    const response = await getDocs(q);
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

export const FilterSnksr = (queryTarget) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log(queryTarget);
    let q = query(collection(db, "sneakers"));

    await queryTarget.forEach((element) => {
      if (element.value !== "" && element.field !== "name") {
        q =
          element.field === "gender"
            ? query(q, where(element.field, element.op, element.value))
            : query(q, orderBy(element.field, element.value));
      }
    });

    const response = await getDocs(q);
    let data = response.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    if (queryTarget[0].value) {
      const capitalizeWords = (s) => {
        let arrayString = s.split(" ");
        let newString = "";
        arrayString.forEach((string, i) =>
          i === 0
            ? string &&
              (newString +=
                String(string[0]).toUpperCase() +
                string.slice(1, string.length))
            : string &&
              (newString += ` ${
                String(string[0]).toUpperCase() + string.slice(1, string.length)
              }`)
        );
        return newString;
      };
      const newData = [];
      data.map((d) => {
        d.name.includes(capitalizeWords(queryTarget[0].value)) &&
          newData.push({ ...d });
      });
      dispatch(setSnkrsFilter(newData));
      return;
    }

    dispatch(setSnkrsFilter(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
