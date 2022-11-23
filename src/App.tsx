import { useState, useContext, createContext } from 'react'
import './App.css'
import SignIn from './pages/SignIn'
import Exam from './pages/Exam'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Notfound from './pages/Notfound'
import Result from './pages/Result'

const AuthContext = createContext({
  isAuth: false,
  name: "",
  email: "",
  googleID: "",
})

export const useAuth = () => {
  return useContext(AuthContext)
}

function App() {
  
  return (
    <div className="App">
      <AuthContext.Provider value={{
        isAuth: Boolean(localStorage.getItem("isAuth")) || false,
        name: localStorage.getItem("name") || "",
        email: localStorage.getItem("email") || "",
        googleID: localStorage.getItem("googleID") || "",
      }}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/result" element={<Result />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </div>
  )
}

export default App
