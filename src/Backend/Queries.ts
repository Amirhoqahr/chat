import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import CatchErr from "../utils/catchErr";
import { auth, db } from "./firebase";
import { authDataType, setLoadingType, taskListType, userType } from "../Types";
import { NavigateFunction } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { defaultUser, setUser, userStorageName } from "../Redux/userSlice";
import { AppDispatch } from "../Redux/store";
import ConvertTime from "../utils/convertTime";
import AvatarGenerator from "../utils/avatar";
import {
  addTaskList,
  defaultTaskList,
  setTaskList,
} from "../Redux/taskListSlice";

// Collection Names
const userColl = "users";
const taskListColl = "taskList";

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
    if (password === confirmPassword) {
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
          // dispatch(setUser);
          dispatch(setUser(userInfo)); // بفرست تو رداکس
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
      dispatch(setUser(userInfo)); // بفرست تو رداکس

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

// logout a user
export const BE_signOut = async (
  dispatch: AppDispatch,
  goTo: NavigateFunction,
  setLoading: setLoadingType
) => {
  setLoading(true);
  // logout in firebase

  // it must be before signOut because in Firebase Rules we have seid that only
  // authenticated users may read/write collections, so after signOut will lose
  // user's auth so updateUserInfo will fail
  await updateUserInfo({ isOffline: true });
  signOut(auth)
    .then(async () => {
      // set currentSelected user to empty user
      dispatch(setUser(defaultUser));

      // // remove from local storage
      localStorage.removeItem(userStorageName);

      // route to auth page
      goTo("/");

      setLoading(false);
    })
    .catch((err) => CatchErr(err));
};

export const getStorageUser = () => {
  const user = localStorage.getItem(userStorageName);
  if (user) return JSON.parse(user);
  else return null;
};

// add user to collection
async function addUserToCollection(
  id: string,
  email: string,
  username: string,
  img: string
) {
  //create user with userID
  // await setDoc(doc(db, userColl, "id"), { // bug...
  await setDoc(doc(db, userColl, id), {
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
    // console.log(
    //   creationTime,
    //   lastSeen,
    //   creationTime.toDate(),
    //   lastSeen.toDate()
    // );
    return {
      id: theUser.id,
      img,
      isOnline,
      username,
      email,
      bio,
      creationTime: creationTime
        ? ConvertTime(creationTime.toDate())
        : "no date yet: userInfo",
      lastSeen: lastSeen
        ? ConvertTime(lastSeen.toDate())
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
  // console.log("to log in: ", id);
  if (!id) {
    id = getStorageUser().id;
  }
  if (id) {
    // console.log("Logged in", id);
    await updateDoc(doc(db, userColl, id), {
      ...(username && { username }),
      ...(img && { img }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      lastSeen: serverTimestamp(),
    });
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user.uid);
    console.log("auth:    ", auth);
    // Access user data (e.g., user.email, user.displayName)
  } else {
    // User is signed out
    console.log("User is signed out");
  }
});

// --------------------------- TASK LIST ----------------------------------

export const BE_addTaskList = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const { title } = defaultTaskList;
  const list = await addDoc(collection(db, taskListColl), {
    title,
    userId: getStorageUser().id,
  });

  const newDocSnap = await getDoc(doc(db, list.path));
  if (newDocSnap.exists()) {
    const newlyAddedDocument: taskListType = {
      id: newDocSnap.id,
      title: newDocSnap.data().title,
    };
    dispatch(addTaskList(newlyAddedDocument));
    setLoading(false);
  } else {
    toast.error("BE_addTaskList: no such doc");
    setLoading(false);
  }
};

export const BE_getTaskList = async (
  dispatch: AppDispatch,
  setLoading: setLoadingType
) => {
  setLoading(true);
  const id = getStorageUser().id;
  if (id) {
    // get user task list
    const taskList = await getAllTaskList();
    console.log("getAllTaskList", taskList);

    dispatch(setTaskList(taskList));
    setLoading(false);
  }
};

// get all users taskList
const getAllTaskList = async () => {
  const id = getStorageUser().id;
  const q = query(collection(db, taskListColl), where("userId", "==", id));

  const taskListSnapshot = await getDocs(q);
  const taskList: taskListType[] = [];

  taskListSnapshot.forEach((doc) => {
    const { title } = doc.data();
    // console.log("getAllTaskList", doc.id, title);
    taskList.push({
      id: doc.id,
      title,
      editMode: false,
      tasks: [],
    });
  });

  return taskList;
};
