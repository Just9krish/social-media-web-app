import ToggleThemeButton from '@/components/ToggleThemeButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import LeftSideBar from '@/components/base/LeftSideBar';
import RightSideBar from '@/components/base/RightSideBar';
import BottomBar from '@/components/base/BottomBar';
import TopBar from '@/components/base/TopBar';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <TopBar />
      <main className="flex flex-row">
        {/* <ToggleThemeButton /> */}
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col items-center dark:bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10"></section>
        <RightSideBar />
      </main>
      <BottomBar />
    </>
  );
}
