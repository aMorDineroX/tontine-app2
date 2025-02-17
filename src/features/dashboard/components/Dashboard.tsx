import { useState } from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import { 
  FaHome, 
  FaUsers, 
  FaMoneyBillWave, 
  FaHistory, 
  FaCog, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Composants temporaires pour les différentes sections
const DashboardHome = () => (
  <Tabs defaultValue="overview" className="w-full">
    <TabsList>
      <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
      <TabsTrigger value="statistics">Statistiques</TabsTrigger>
      <TabsTrigger value="activities">Activités</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" className="p-4">
      <h2 className="text-2xl font-bold mb-4">Vue d'ensemble</h2>
      <p>Aperçu de vos tontines et activités récentes</p>
    </TabsContent>
    <TabsContent value="statistics" className="p-4">
      <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
      <p>Statistiques détaillées de vos tontines</p>
    </TabsContent>
    <TabsContent value="activities" className="p-4">
      <h2 className="text-2xl font-bold mb-4">Activités récentes</h2>
      <p>Liste de vos dernières activités</p>
    </TabsContent>
  </Tabs>
)

const Tontines = () => (
  <Tabs defaultValue="active" className="w-full">
    <TabsList>
      <TabsTrigger value="active">Tontines actives</TabsTrigger>
      <TabsTrigger value="pending">En attente</TabsTrigger>
      <TabsTrigger value="completed">Terminées</TabsTrigger>
    </TabsList>
    <TabsContent value="active" className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tontines actives</h2>
      <p>Liste des tontines en cours</p>
    </TabsContent>
    <TabsContent value="pending" className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tontines en attente</h2>
      <p>Liste des tontines à venir</p>
    </TabsContent>
    <TabsContent value="completed" className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tontines terminées</h2>
      <p>Historique des tontines terminées</p>
    </TabsContent>
  </Tabs>
)

const Members = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Membres</h2>
    <p>Liste des membres</p>
  </div>
)

const Transactions = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Transactions</h2>
    <p>Historique des transactions</p>
  </div>
)

const Settings = () => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Paramètres</h2>
    <p>Paramètres du compte</p>
  </div>
)

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { icon: FaHome, label: 'Accueil', path: '/dashboard' },
    { icon: FaUsers, label: 'Mes Tontines', path: '/dashboard/tontines' },
    { icon: FaMoneyBillWave, label: 'Membres', path: '/dashboard/members' },
    { icon: FaHistory, label: 'Transactions', path: '/dashboard/transactions' },
    { icon: FaCog, label: 'Paramètres', path: '/dashboard/settings' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white h-full shadow-lg transition-all duration-300`}>
        <div className="p-4 flex justify-between items-center">
          <h2 className={`font-bold text-xl ${!sidebarOpen && 'hidden'}`}>
            Tontine App
          </h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-gray-100' : ''
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && (
                <span className="ml-4">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <h1 className="text-2xl font-semibold">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="tontines" element={<Tontines />} />
            <Route path="members" element={<Members />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
