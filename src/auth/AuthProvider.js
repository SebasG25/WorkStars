import axios from 'axios'
import { useState, createContext } from 'react'
import roles from '../helpers/roles'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    //const [user, setUser] = useState({id: 1, role: roles.admin})

    const login = async ({email, password}, e) => {
        e.preventDefault()
        const res = await axios.get('http://localhost:3001/users')
        for (let i = 0; i < res.data.length; i++) {
            console.log(res.data[i])
            console.log(email === res.data[i].email)
            if (email === res.data[i].email && password === res.data[i].password) {
                setUser(res.data[i])
            }
        }
        
    }

    const logout = () => setUser(null)

    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;

    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout,

    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
