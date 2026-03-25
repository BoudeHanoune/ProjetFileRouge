import { createContext, useContext, useState, useEffect, ReactNode } from "react"


type User = {
    email: string
    username: string
}

type AuthContextType = {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, username: string) => Promise<void>
    logout: () => void
}


const USERS_KEY = "kana_users"
const SESSION_KEY = "kana_session"

type StoredUser = {
    email: string
    password: string
    username: string
}

function getStoredUsers(): StoredUser[] {
    try {
        const raw = localStorage.getItem(USERS_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveUser(user: StoredUser) {
    const users = getStoredUsers()
    users.push(user)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function findUser(email: string, password: string): StoredUser | undefined {
    return getStoredUsers().find(
        (u) => u.email === email && u.password === password
    )
}

function emailExists(email: string): boolean {
    return getStoredUsers().some((u) => u.email === email)
}


const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            const raw = localStorage.getItem(SESSION_KEY)
            if (raw) {
                const stored: User = JSON.parse(raw)
                setUser(stored)
            }
        } catch {
            localStorage.removeItem(SESSION_KEY)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const login = async (email: string, password: string) => {
        await new Promise((res) => setTimeout(res, 600))

        const found = findUser(email, password)
        if (!found) {
            throw new Error("Email ou mot de passe incorrect.")
        }

        const sessionUser: User = { email: found.email, username: found.username }
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
        setUser(sessionUser)
    }

    const register = async (email: string, password: string, username: string) => {
        await new Promise((res) => setTimeout(res, 600))

        if (emailExists(email)) {
            throw new Error("Un compte existe déjà avec cet email.")
        }

        saveUser({ email, password, username })
        const sessionUser: User = { email, username }
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser))
        setUser(sessionUser)
    }

    const logout = () => {
        localStorage.removeItem(SESSION_KEY)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
    return ctx
}