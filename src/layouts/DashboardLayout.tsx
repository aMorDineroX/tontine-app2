import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinkClass = (path: string) =>
    `px-4 py-2 rounded-lg ${
      isActive(path)
        ? 'bg-blue-500 text-white'
        : 'text-gray-600 hover:bg-blue-100'
    }`;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4 items-center">
              <Link
                to="/dashboard"
                className={navLinkClass('/dashboard')}
              >
                Tableau de bord
              </Link>
              <Link
                to="/dashboard/tontines"
                className={navLinkClass('/dashboard/tontines')}
              >
                Tontines
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}
