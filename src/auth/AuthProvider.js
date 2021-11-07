import axios from 'axios'
import { useState, createContext } from 'react'
import roles from '../helpers/roles'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    //const [user, setUser] = useState({id: 1, role: roles.admin})

    const login = async ({email, password}, e) => {
        e.preventDefault()
        const res = await axios.get('http://localhost:3001/users')
        for (let i = 0; i < res.data.length; i++) {
            if (email === res.data[i].email && password === res.data[i].password) {
                setUser(res.data[i])
                return MySwal.fire({
                    icon: 'success',
                    title: `Bienvenido, ${res.data[i].name}`,
                    showConfirmButton: false,
                    timer: 700
                  })
            }
        }
        return MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Verifique su correo y su contraseña',
          })
        
    }

    const logout = () => setUser(null)

    const updateUser = (data) => {
        setUser({
            ...user,
            ...data
        })
    }

    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;

    const contextValue = {
        user,
        updateUser,
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
