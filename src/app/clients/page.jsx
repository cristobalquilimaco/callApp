import { BtnBack } from 'app/components/BtnBack/BtnBack';
import { ClientList } from '../../components/ClientList';

export default function ClientsPage() {
  return (
    <div>
      <BtnBack/>
      <ClientList />
    </div>
  );
}