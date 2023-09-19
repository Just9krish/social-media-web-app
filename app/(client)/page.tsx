import ToggleThemeButton from '@/components/ToggleThemeButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen dark:bg-black dark:text-white">
      Hello
      <ToggleThemeButton />
      {session && JSON.stringify(session)}
    </main>
  );
}
