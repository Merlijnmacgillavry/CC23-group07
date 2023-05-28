import React, { useEffect, useState } from 'react'

const SessionContext = React.createContext()
export const useSession = () => React.useContext(SessionContext)

export default function SessionProvider(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const user = User.fromSessionStorage()
        if (user) {
            setUser(user)
        }
    }, [])

    function createUser(user_code, display_name, state) {
        const user = new User(user_code, display_name, state)
        console.log(user)
        user.toSessionStorage()
        setUser(user)
    }


    return (
        <SessionContext.Provider value={{ user, createUser }}>
            {props.children}
        </SessionContext.Provider>
    )
}

class User {
    constructor(user_code, display_name, state) {
        this.user_code = user_code
        this.display_name = display_name
        this.state = state
    }

    toSessionStorage() {
        sessionStorage.setItem('user', JSON.stringify(this))
    }

    updateState(state) {
        this.state = state
        this.toSessionStorage()
    }

    static fromJSON(json) {

        return new User(json.user_code, json.display_name, json.state)
    }


    static fromSessionStorage() {
        const json = JSON.parse(sessionStorage.getItem('user'))
        if (!json) return null

        return this.fromJSON(json)
    }
}
