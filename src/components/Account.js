import React from 'react'
import useAuth from '../auth/useAuth'

const Account = () => {
    const { user } = useAuth()

    return (
        <div>
            <h1>Hello {user.name}</h1>
        </div>
    )
}

export default Account

