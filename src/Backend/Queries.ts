import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import CatchErr from "../utils/catchErr";
import {auth} from "./firebase";
import { setLoadingType } from "../Types";
import { NavigateFunction } from "react-router-dom";

export const BE_signUp = (email: string, password: string, confirmPassword: string, setLoading: setLoadingType, reset: () => void, goTo: NavigateFunction) => {
    if (email && password && confirmPassword) {
        if (password == confirmPassword) {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                toast.success("Account created successfully")
                setLoading(false);
                reset();
                goTo("/dashboard")

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

export const BE_signIn = (email: string, password: string, setLoading: setLoadingType, reset: () => void, goTo: NavigateFunction) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        toast.success("Logged in successfully")
        setLoading(false);
        reset();
        goTo("/dashboard")

    })
    .catch((error) => {
        CatchErr(error)
        setLoading(false)
    })
}