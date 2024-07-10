import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CatchErr from "../utils/catchErr";
import {auth} from "./firebase";

export const BE_signUp = (email:string, password:string, confirmPassword:string) => {

    if (email && password && confirmPassword) {
        if (password == confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
            })
            .catch((error) => {
                CatchErr(error)
            });
        } else {
            // console.log("password and confirm don't match")
            toast.error("password and confirm don't match")
        }
    } else {
        toast.error("Fields shouldn't be empty")
    }
};