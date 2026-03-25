import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

type Props = {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
                color: "#607099",
                fontSize: "1rem"
            }}>
                Chargement…
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}