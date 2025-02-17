import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./features/dashboard/components/Dashboard";
import Tontines from "./features/tontine/components/Tontines";
import Login from './pages/auth/Login';
import Register from "./pages/auth/Register";
import Home from "./features/home/components/Home";
import DashboardLayout from './layouts/DashboardLayout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b p-4">
        <nav className="container mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">
            Tontine App
          </Link>
          <div className="space-x-4">
            <Link to="/" className="px-4 py-2 hover:bg-gray-100 rounded-md">
              Accueil
            </Link>
            <Link to="/dashboard/tontines" className="px-4 py-2 hover:bg-gray-100 rounded-md">
              Mes Tontines
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  Connexion
                </Link>
                <Link to="/register" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  S'inscrire
                </Link>
              </>
            ) : null}
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="tontines" element={<Tontines />} />
          </Route>
        </Routes>
      </main>

      <footer className="border-t p-4">
        <div className="container mx-auto text-center text-gray-600">
          © 2024 Tontine App. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}






