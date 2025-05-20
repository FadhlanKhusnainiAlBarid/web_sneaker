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
  limit,
  startAfter,
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
      quantity: Number(products.quantity),
      nameLowerCase: products.name.toLowerCase(),
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
      quantity: Number(products.quantity),
      nameLowerCase: products.name.toLowerCase(),
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
    // console.log(queryTarget);
    let q = query(collection(db, "sneakers"));

    await queryTarget.query.forEach((element) => {
      if (element.value !== "") {
        q =
          element.field === "gender" || element.field === "nameLowerCase"
            ? query(q, where(element.field, element.op, element.value))
            : query(q, orderBy(element.field, element.value));
      }
    });

    const TOTAL_SNEAKER = (await getDocs(q)).size;
    const newTotalPage = Math.ceil(
      TOTAL_SNEAKER / queryTarget.paginate.LIMIT_SNEAKER
    );
    queryTarget.paginate.settotalPage(newTotalPage);

    // reset current page when trigger func, total page is more then current page
    if (queryTarget.paginate.currentPage > newTotalPage) {
      queryTarget.paginate.setCurrentPage(1);
    }

    q = query(q, limit(queryTarget.paginate.LIMIT_SNEAKER));

    if (queryTarget.paginate.currentPage > 1) {
      const documentSnapshots = await getDocs(
        query(
          q,
          limit(
            (queryTarget.paginate.currentPage - 1) *
              queryTarget.paginate.LIMIT_SNEAKER
          )
        )
      );

      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      q = query(q, startAfter(lastVisible));
    }

    const response = await getDocs(q);
    const data = response.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    dispatch(setSnkrsFilter(data));
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 250);
  }
};
