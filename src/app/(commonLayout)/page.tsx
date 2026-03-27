import { Button } from '@/components/ui/button';
import { getMe } from '@/services/auth.server.service';

export default async function Home() {
  const session = await getMe();
  console.log('Testing...');
  console.log(session);
  return (
    <div>
      <Button variant="outline">Click Me</Button>
    </div>
  );
}
