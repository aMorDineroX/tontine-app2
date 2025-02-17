import { useState } from 'react';
import { TontineList } from '../../components/custom/TontineList';
import { CreateTontineForm } from '../../components/custom/CreateTontineForm';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export default function TontineDashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Ces données seront remplacées par des appels API réels
  const [tontines, setTontines] = useState([
    // Exemple de données
  ]);

  const handleCreateTontine = (data: any) => {
    // Implémenter la création de tontine
    console.log('Nouvelle tontine:', data);
    setShowCreateForm(false);
  };

  const handleJoinTontine = (tontineId: string) => {
    // Implémenter la logique pour rejoindre une tontine
    console.log('Rejoindre tontine:', tontineId);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Tontines</h1>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button>Créer une tontine</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <CreateTontineForm onSubmit={handleCreateTontine} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Tontines actives</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <TontineList 
            tontines={tontines.filter(t => t.status === 'ACTIVE')}
            onJoinTontine={handleJoinTontine}
          />
        </TabsContent>

        <TabsContent value="pending">
          <TontineList 
            tontines={tontines.filter(t => t.status === 'PENDING')}
            onJoinTontine={handleJoinTontine}
          />
        </TabsContent>

        <TabsContent value="completed">
          <TontineList 
            tontines={tontines.filter(t => t.status === 'COMPLETED')}
            onJoinTontine={handleJoinTontine}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}