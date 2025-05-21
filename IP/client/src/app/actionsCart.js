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
      // responseCheck.forEach((docCheck) => {
      //   if (docCheck.data().colorSelected === queryId.colorSelected) {
      const updateData = async () => {
        await updateDoc(doc(db, "carts", responseCheck.docs[0].id), {
          ...responseCheck.docs[0].data(),
          quantityCheckout: queryId.quantityCheckout
            ? queryId.quantityCheckout
            : responseCheck.docs[0].data().quantityCheckout + 1,
        });
      };
      updateData();
      //   } else {
      //     const addData = async () => {
      //       await addDoc(collection(db, "carts"), {
      //         userId: queryId.uid,
      //         sneakerId: queryId.sneakerId,
      //         quantityCheckout: 1,
      //         colorSelected: queryId.colorSelected,
      //       });
      //     };
      //     addData();
      //   }
      // });
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
