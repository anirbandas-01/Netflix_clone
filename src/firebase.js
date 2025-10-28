import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD-oHG-YxqNuMkFZ3AANCWpb2778iy85lE",
  authDomain: "netflix-clone-cf24f.firebaseapp.com",
  projectId: "netflix-clone-cf24f",
  storageBucket: "netflix-clone-cf24f.firebasestorage.app",
  messagingSenderId: "1031243461621",
  appId: "1:1031243461621:web:a69dfca275f755242266bc"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=> {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));   
    }
}


const login = async (email, password)=>{
   try {
     await signInWithEmailAndPassword(auth, email, password);
   } catch (error) {
     console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const logout = () => {
      signOut(auth);
}


export { auth, db, signup, login, logout };