import Hero from '@/components/homepage/herosection';
import { Button } from '@/components/ui/button';
import { getMe } from '@/services/auth/auth.server.service';
import { getCategories } from '@/services/category/category.server.service';

export default async function Home() {
  const { data: categories } = await getCategories();
  // console.log('Testing...');
  // console.log(session);
  return (
    <div>
      <Hero categories={categories} />
    </div>
  );
}
