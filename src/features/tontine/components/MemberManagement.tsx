import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMemberStore } from '@/store/member.store';
import { notificationService } from '@/lib/services/notification.service';

export function MemberManagement({ tontineId }: { tontineId: string }) {
  const [email, setEmail] = useState('');
  const { addMember, updateMemberStatus, isLoading } = useMemberStore();

  const handleAddMember = async () => {
    try {
      await addMember({ tontineId, email });
      notificationService.success('Membre invité avec succès');
      setEmail('');
    } catch (error) {
      notificationService.error('Échec de l\'invitation');
    }
  };

  const handleStatusUpdate = async (memberId: string, status: string) => {
    try {
      await updateMemberStatus(memberId, status);
      notificationService.success('Statut mis à jour avec succès');
    } catch (error) {
      notificationService.error('Échec de la mise à jour du statut');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email du membre"
        />
        <Button 
          onClick={handleAddMember}
          disabled={isLoading || !email}
        >
          Inviter
        </Button>
      </div>

      <div className="mt-4">
        {/* Liste des membres avec actions */}
        <h3 className="text-lg font-semibold mb-2">Membres</h3>
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-2 border-b">
            <span>{member.user.email}</span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusUpdate(member.id, 'ACTIVE')}
              >
                Activer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusUpdate(member.id, 'SUSPENDED')}
              >
                Suspendre
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}