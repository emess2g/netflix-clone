import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDAMYl5mnSjYlKQ4ATdtGKLHrNsm5zpYQM",
  authDomain: "netflix-clone-80b4c.firebaseapp.com",
  projectId: "netflix-clone-80b4c",
  storageBucket: "netflix-clone-80b4c.firebasestorage.app",
  messagingSenderId: "430058979250",
  appId: "1:430058979250:web:20d6fa04eec99acd802eab",
  measurementId: "G-QTKDC5SRTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// signup func
const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db,'user'),{
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}


// login func
const login = async(email,password) => {
    try {
         await signInWithEmailAndPassword(auth, email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

// logout func
const logout = () => {
    signOut(auth)
}

export {auth, db, signup, login, logout}