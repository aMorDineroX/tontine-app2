import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTontineStore } from '@/store/tontine.store';
import { Button } from '@/components/ui/button';

export function TontineList() {
  const { tontines, isLoading, error, fetchTontines } = useTontineStore();

  useEffect(() => {
    fetchTontines();
  }, [fetchTontines]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mes Tontines</h2>
        <Link to="/dashboard/tontines/create">
          <Button>Créer une tontine</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tontines.map((tontine) => (
          <div key={tontine.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold">{tontine.name}</h3>
            <p>Montant: {tontine.amount} FCFA</p>
            <p>Fréquence: {tontine.frequency}</p>
            <p>Membres: {tontine.membersCount}</p>
            <Link to={`/dashboard/tontines/${tontine.id}`}>
              <Button variant="outline" className="mt-2">
                Voir les détails
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}