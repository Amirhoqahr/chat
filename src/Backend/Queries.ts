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
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { defaultUser, setUser } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import ConvertTime from "../utils/convertTime";
import AvatarGenerator from "../utils/avatar";

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
        .then(async (userCredential) => {
          // Signed up
          // TODO: create user image
          const user = userCredential.user;
          toast.success("Account created successfully");
          setLoading(false);
          reset();
          goTo("/dashboard");
          const username = user.email?.split("@")[0] || "";
          const userInfo = await addUserToCollection(
            user.uid,
            user.email || "",
            username,
            AvatarGenerator(username) //img
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
    .then(async (userCredential) => {
      const user = userCredential.user;

      updateUserInfo({ id: user.uid, isOnline: true });

      // get user information
      const userInfo = await getUserData(user.uid);

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

// add user to collection
async function addUserToCollection(
  id: string,
  email: string,
  username: string,
  img: string
) {
  //create user with userID
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

// get user information
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
      creationTime: creationTime
        ? ConvertTime(creationTime.toDate)
        : "no date yet: userInfo",
      lastSeen: lastSeen
        ? ConvertTime(lastSeen.toDate)
        : "no date yet: userInfo",
    };
  } else {
    return defaultUser;
  }
}

// update user info
const updateUserInfo = async ({
  id,
  username,
  img,
  isOnline,
  isOffline,
}: {
  id?: string;
  username?: string;
  img?: string;
  isOnline?: boolean;
  isOffline?: boolean;
}) => {
  if (!id) {
    id = getStorageUser().id;
  }
  if (id) {
    await updateDoc(doc(db, userColl, id), {
      ...(username && { username }),
      ...(img && { img }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      lastSeen: serverTimestamp(),
    });
  }
};

const getStorageUser = () => {
  const user = localStorage.getItem("superhero_user");
  if (user) return JSON.parse("user");
  else return null;
};
