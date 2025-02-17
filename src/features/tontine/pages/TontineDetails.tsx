import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemberManagement } from '../components/MemberManagement';
import { PaymentForm } from '../components/PaymentForm';
import { useTontineStore } from '@/store/tontine.store';
import { NotificationProvider } from '@/components/ui/notification';

export function TontineDetails() {
  const { id } = useParams();
  const { tontine } = useTontineStore();

  return (
    <NotificationProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">{tontine?.name}</h1>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="members">Membres</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-4">
              <div className="p-4 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Détails</h2>
                <p>Montant: {tontine?.amount} FCFA</p>
                <p>Fréquence: {tontine?.frequency}</p>
                <p>Membres: {tontine?.memberCount}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="bg-white rounded-lg shadow p-4">
              <MemberManagement tontineId={id!} />
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <div className="bg-white rounded-lg shadow p-4">
              <PaymentForm tontineId={id!} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </NotificationProvider>
  );
}