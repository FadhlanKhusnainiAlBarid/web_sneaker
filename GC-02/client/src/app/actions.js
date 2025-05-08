import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { setSnkrs, setSnkr } from './sneakerSlice'

export const fetchSnkrs = () => async (dispatch) => {
    try {
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
    }
}