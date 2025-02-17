import { useState } from 'react';
import { TontineList } from '@/features/tontine/components/TontineList';
import { CreateTontineForm } from '@/features/tontine/components/CreateTontineForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TontineType } from '@/types/tontine';

export default function TontineDashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tontines] = useState<TontineType[]>([]);

  const handleCreateTontine = (data: TontineType) => {
    setShowCreateForm(false);
  };

  const handleJoinTontine = (tontineId: string) => {
    console.log('Rejoindre tontine:', tontineId);
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Actives</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <TontineList 
            tontines={tontines.filter(t => t.status === 'ACTIVE')}
            onJoin={handleJoinTontine}
          />
        </TabsContent>

        <TabsContent value="pending">
          <TontineList 
            tontines={tontines.filter(t => t.status === 'PENDING')}
            onJoin={handleJoinTontine}
          />
        </TabsContent>

        <TabsContent value="completed">
          <TontineList 
            tontines={tontines.filter(t => t.status === 'COMPLETED')}
            onJoin={handleJoinTontine}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogTrigger asChild>
          <Button>Créer une tontine</Button>
        </DialogTrigger>
        <DialogContent>
          <CreateTontineForm onSubmit={handleCreateTontine} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
