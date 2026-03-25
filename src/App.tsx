import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import StudyPage from "./pages/StudyPage"
import QuizPage from "./pages/QuizPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

// ─── Header with dynamic auth state ─────────────────────────────────────────

function AppHeader() {
    const { isAuthenticated, user, logout } = useAuth()

    return (
        <header className="app-header">
            <h1>Kana App</h1>
            <p>Application simple pour apprendre les kana japonais</p>

            <nav className="app-nav">
                {isAuthenticated ? (
                    <>
                        <Link to="/">Étude</Link>
                        <Link to="/quiz">Quiz</Link>
                        <span className="app-nav-user">{user?.email}</span>
                        <button className="app-nav-logout" onClick={logout}>
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Connexion</Link>
                        <Link to="/register">Inscription</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

// ─── App shell ───────────────────────────────────────────────────────────────

function AppContent() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return null // wait for session restore

    return (
        <div className="app">
            <AppHeader />
            <main className="app-main">
                <Routes>
                    {/* Public routes */}
                    <Route
                        path="/login"
                        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
                    />
                    <Route
                        path="/register"
                        element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />}
                    />

                    {/* Protected routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <StudyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/study"
                        element={
                            <ProtectedRoute>
                                <StudyPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/quiz"
                        element={
                            <ProtectedRoute>
                                <QuizPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </BrowserRouter>
    )
}