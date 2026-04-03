import { use } from 'react';
import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}



export function AuthProvider({ children }) {

  const [login, setLogIn] = useState(false);
  const [profile, setProfile] = useState({})
  
  const value = { login, setLogIn, profile, setProfile }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}