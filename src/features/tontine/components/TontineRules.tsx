import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'import { TontineModel } from '@/types/database'
interface TontineRulesProps {
  tontine: TontineModel}
export function TontineRules({ tontine }: TontineRulesProps) {
  return (    <Card>
      <CardHeader>        <CardTitle>Règles de la tontine</CardTitle>
      </CardHeader>      <CardContent>
        <div className="space-y-4">          <div>
            <h3 className="font-semibold mb-2">Informations générales</h3>            <ul className="list-disc pl-4 space-y-2">
              <li>Montant de la contribution: {tontine.amount.toLocaleString()} FCFA</li>              <li>Fréquence: {tontine.frequency}</li>
              <li>Nombre de participants: {tontine.membersCount}</li>              <li>Nombre total de tours: {tontine.totalRounds}</li>
            </ul>          </div>
          <div>
            <h3 className="font-semibold mb-2">Dates importantes</h3>            <ul className="list-disc pl-4 space-y-2">
              <li>Début: {new Date(tontine.startDate).toLocaleDateString()}</li>              <li>Fin: {new Date(tontine.endDate).toLocaleDateString()}</li>
            </ul>          </div>
          <div>
            <h3 className="font-semibold mb-2">Règles de paiement</h3>            <ul className="list-disc pl-4 space-y-2">
              <li>Les paiements doivent être effectués avant la date limite</li>              <li>Tout retard de paiement peut entraîner des pénalités</li>
              <li>Les membres doivent respecter l'ordre de rotation établi</li>            </ul>
          </div>
          <div>            <h3 className="font-semibold mb-2">Conditions de participation</h3>
            <ul className="list-disc pl-4 space-y-2">              <li>Être à jour dans ses cotisations</li>
              <li>Respecter les règles de la tontine</li>              <li>Participer aux réunions si nécessaire</li>
            </ul>          </div>
        </div>      </CardContent>
    </Card>
  )
}


























import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TontineModel } from '@/types/database'

interface TontineRulesProps {
  tontine: TontineModel
}

export function TontineRules({ tontine }: TontineRulesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Règles de la tontine</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Informations générales</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Montant de la contribution: {tontine.amount.toLocaleString()} FCFA</li>
              <li>Fréquence: {tontine.frequency}</li>
              <li>Nombre de participants: {tontine.membersCount}</li>
              <li>Nombre total de tours: {tontine.totalRounds}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Dates importantes</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Début: {new Date(tontine.startDate).toLocaleDateString()}</li>
              <li>Fin: {new Date(tontine.endDate).toLocaleDateString()}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Règles de paiement</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Les paiements doivent être effectués avant la date limite</li>
              <li>Tout retard de paiement peut entraîner des pénalités</li>
              <li>Les membres doivent respecter l'ordre de rotation établi</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Conditions de participation</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Être à jour dans ses cotisations</li>
              <li>Respecter les règles de la tontine</li>
              <li>Participer aux réunions si nécessaire</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
