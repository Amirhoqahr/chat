import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import CatchErr from "../utils/catchErr";
import { auth, db } from "./firebase";
import { authDataType, setLoadingType, userType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { defaultUser, setUser } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";

// Collection Names
const userColl = "users";

// register a user
export const BE_signUp = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password, confirmPassword } = data;

  if (email && password && confirmPassword) {
    if (password == confirmPassword) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          // TODO: create user image
          const user = userCredential.user;
          toast.success("Account created successfully");
          setLoading(false);
          reset();
          goTo("/dashboard");
          const userInfo = addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            "Image Link"
          );
          // TODO: set user info in store and local storage
          dispatch(setUser);
        })
        .catch((error) => {
          CatchErr(error);
          setLoading(false);
        });
    } else {
      // console.log("password and confirm don't match")
      toast.error("password and confirm don't match");
    }
  } else {
    toast.error("Fields shouldn't be empty");
  }
};

// login a user
export const BE_signIn = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void,
  goTo: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password } = data;
  setLoading(true);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // get user information
      const user = userCredential.user;
      const userInfo = getUserData(user.uid);

      toast.success("Logged in successfully");
      setLoading(false);
      reset();
      goTo("/dashboard");
    })
    .catch((error) => {
      CatchErr(error);
      setLoading(false);
    });
};

async function addUserToCollection(
  id: string,
  email: string,
  username: string,
  img: string
) {
  await setDoc(doc(db, userColl, "id"), {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: "My Bio",
  });
  return getUserData(id);
}

async function getUserData(id: string): Promise<userType> {
  const docRef = doc(db, userColl, id);
  const theUser = await getDoc(docRef);
  if (theUser.exists()) {
    const { img, isOnline, username, email, bio, creationTime, lastSeen } =
      theUser.data();
    return {
      id: theUser.id,
      img,
      isOnline,
      username,
      email,
      bio,
      creationTime,
      lastSeen,
    };
  } else {
    return defaultUser;
  }
}
