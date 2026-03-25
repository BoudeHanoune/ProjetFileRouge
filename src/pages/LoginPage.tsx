import { useState, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./AuthPage.css"

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [apiError, setApiError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const validate = () => {
        const newErrors: typeof errors = {}
        if (!email.trim()) newErrors.email = "L'email est requis."
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Format d'email invalide."
        if (!password) newErrors.password = "Le mot de passe est requis."
        return newErrors
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setApiError("")
        const fieldErrors = validate()
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors)
            return
        }
        setErrors({})
        setIsLoading(true)
        try {
            await login(email, password)
            navigate("/")
        } catch (err: unknown) {
            setApiError(err instanceof Error ? err.message : "Erreur de connexion.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Connexion</h2>
                <p className="auth-subtitle">Content de te revoir ! 👋</p>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {apiError && (
                        <div className="auth-error-banner" role="alert">
                            {apiError}
                        </div>
                    )}

                    <div className="auth-field">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="toi@exemple.com"
                            className={errors.email ? "error" : ""}
                            autoComplete="email"
                        />
                        {errors.email && (
                            <span className="auth-field-error">{errors.email}</span>
                        )}
                    </div>

                    <div className="auth-field">
                        <label htmlFor="login-password">Mot de passe</label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={errors.password ? "error" : ""}
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <span className="auth-field-error">{errors.password}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>Connexion en cours<span className="auth-loading-dots" /></>
                        ) : (
                            "Se connecter"
                        )}
                    </button>
                </form>

                <p className="auth-footer">
                    Pas encore de compte ?{" "}
                    <Link to="/register">S'inscrire</Link>
                </p>
            </div>
        </div>
    )
}