import { useState, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./AuthPage.css"

export default function RegisterPage() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [errors, setErrors] = useState<{
        email?: string
        username?: string
        password?: string
        confirm?: string
    }>({})
    const [apiError, setApiError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const validate = () => {
        const newErrors: typeof errors = {}
        if (!username.trim()) newErrors.username = "Le pseudo est requis."
        if (!email.trim()) newErrors.email = "L'email est requis."
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Format d'email invalide."

        if (!password) newErrors.password = "Le mot de passe est requis."
        else if (password.length < 6)
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères."

        if (!confirm) newErrors.confirm = "Veuillez confirmer votre mot de passe."
        else if (confirm !== password) newErrors.confirm = "Les mots de passe ne correspondent pas."

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
            await register(email, password, username)
            navigate("/")
        } catch (err: unknown) {
            setApiError(err instanceof Error ? err.message : "Erreur lors de l'inscription.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Inscription</h2>
                <p className="auth-subtitle">Crée ton compte pour commencer 🎌</p>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {apiError && (
                        <div className="auth-error-banner" role="alert">
                            {apiError}
                        </div>
                    )}

                    <div className="auth-field">
                        <label htmlFor="reg-email">Email</label>
                        <input
                            id="reg-email"
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
                        <label htmlFor="reg-password">Mot de passe</label>
                        <input
                            id="reg-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="6 caractères minimum"
                            className={errors.password ? "error" : ""}
                            autoComplete="new-password"
                        />
                        {errors.password && (
                            <span className="auth-field-error">{errors.password}</span>
                        )}
                    </div>

                    <div className="auth-field">
                        <label htmlFor="reg-confirm">Confirmation du mot de passe</label>
                        <input
                            id="reg-confirm"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="••••••••"
                            className={errors.confirm ? "error" : ""}
                            autoComplete="new-password"
                        />
                        {errors.confirm && (
                            <span className="auth-field-error">{errors.confirm}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>Création du compte<span className="auth-loading-dots" /></>
                        ) : (
                            "Créer mon compte"
                        )}
                    </button>
                </form>

                <p className="auth-footer">
                    Déjà inscrit ?{" "}
                    <Link to="/login">Se connecter</Link>
                </p>
            </div>
        </div>
    )
}