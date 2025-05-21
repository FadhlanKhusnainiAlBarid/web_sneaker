import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { setLoading, setStatus } from "./cartSlice";
import { db } from "../config/firebase";

export const addCart = (queryId) => async (dispatch) => {
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

    responseCheck.forEach((docCheck) => {
      if (GetSneaker.quantity === docCheck.data().quantityCheckout) {
        dispatch(
          setStatus({
            massage:
              "Sorry, you have reached the quantity limit. Please remove an item and try again.",
            icon: "error",
          })
        );
        return;
      }
      if (docCheck.exists()) {
        const updateData = async () => {
          await updateDoc(doc(db, "carts", docCheck.id), {
            ...docCheck.data(),
            quantityCheckout: queryId.quantityCheckout
              ? queryId.quantityCheckout
              : docCheck.data().quantityCheckout + 1,
          });
        };
        updateData();
      } else {
        const addData = async () => {
          await addDoc(collection(db, "carts"), {
            userId: query.uid,
            sneakerId: query.sneakerId,
            quantityCheckout: 1,
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
    });
  } catch (error) {
    dispatch(
      setStatus({
        massage: error.massage,
        icon: "error",
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};
