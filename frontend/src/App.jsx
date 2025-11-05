import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './hooks/useToast'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'
import Login from './pages/Login'
import Home from './pages/Home'
import MovieManagement from './pages/MovieManagement'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Reports from './pages/Reports'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status on app load
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <ToastProvider>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <Toast />
      </ToastProvider>
    )
  }

  return (
    <ToastProvider>
      <Router>
        {isAuthenticated ? (
          <div className="App w-full flex">
            <Sidebar />
            <div className="flex-1 ml-64">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/movies" element={<MovieManagement />} />
                <Route path="/movies/add" element={<AddMovie />} />
                <Route path="/movies/edit/:id" element={<EditMovie />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        )}
        <Toast />
      </Router>
    </ToastProvider>
  )
}

export default App
