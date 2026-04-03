import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar, Home, SignUp, Log, Blog, PageNotFound, Footer, ContactUs, Otp, DashBoard } from './AllComponents.js'
import { useAuth } from './context/AllContext.jsx'


function PrivateRoute({ children }) {
  const { login } = useAuth()
    
  return login ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <div className='bg-white dark:from-zinc-900 h-full'>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* Public Routes  */}
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<SignUp />} />
          <Route path="/user-login" element={<Log />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<PageNotFound />} />

          {/* Private Routes - Only accessible when login is true */}
          <Route path="/otp/:type/:userid" element={<PrivateRoute><Otp /></PrivateRoute>} />
          <Route path="/dashBoard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

