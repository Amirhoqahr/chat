import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CatchErr from "../utils/catchErr";
import {auth} from "./firebase";
import { setLoadingType } from "../Types";

export const BE_signUp = (email: string, password: string, confirmPassword: string, setLoading: setLoadingType, reset: () => void) => {
    if (email && password && confirmPassword) {
        if (password == confirmPassword) {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                setLoading(false)

            })
            .catch((error) => {
                CatchErr(error)
                setLoading(false)
            });
        } else {
            // console.log("password and confirm don't match")
            toast.error("password and confirm don't match")
        }
    } else {
        toast.error("Fields shouldn't be empty")
    }
};