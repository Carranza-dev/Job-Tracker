import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {
  const [user, setUser]         = useState(null)
  const [showLogin, setShowLogin] = useState(true)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    // Verifica si hay sesión activa al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escucha cambios de sesión (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="app-loading">Loading...</div>

  if (user) return <Dashboard user={user} />

  return showLogin
    ? <Login    onSwitch={() => setShowLogin(false)} />
    : <Register onSwitch={() => setShowLogin(true)}  />
}