import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./app/home/page";
import RegisterPage from "./app/register/page";
import LoginPage from "./app/login/page";


function App() {
  return (
    <Routes>
      <Route path="/login"  element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/"  element={<HomePage/>}/>
    </Routes>
  );
}

export default App;
