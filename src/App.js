import React from 'react'
import AuthProvider from './auth/AuthProvider'
import AppRouter from './routers/AppRouter'
import './App.css'

export default function App() {
    return (
        <div>
            <AuthProvider>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,186.7C672,171,768,117,864,80C960,43,1056,21,1152,53.3C1248,85,1344,171,1392,213.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                <AppRouter />
            </AuthProvider>
        </div>
    )
}
