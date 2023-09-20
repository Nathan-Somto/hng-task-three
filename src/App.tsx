import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./app/home/page";
import RegisterPage from "./app/register/page";
import LoginPage from "./app/login/page";
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "./config/firebase";
import {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { selectUser, setUser } from "./features/user/userSlice";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const User = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    const unsub = onAuthStateChanged(auth, (user)=> {
      if(user !== null){
        dispatch(setUser({user}));
      }
      else{
        dispatch(setUser({user:null}));
      }
      setLoading(false);
      return () => unsub();
    })
  },[dispatch])
  return (
    <>   
    <Routes>
      <Route path="/login"  element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/"  element={
        <ProtectedRoute loading={loading} User={User}>
          <HomePage/>
        </ProtectedRoute>
      }/>
    </Routes>
    <ToastContainer position='top-right'  theme='dark' />
    </>
  );
}

export default App;
