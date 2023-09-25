import { ReactNode } from 'react';
import TopBar from './TopBar';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import BottomBar from './BottomBar';

export default function BaseComponent({ children }: { children: ReactNode }) {
  return (
    <>
      <TopBar />
      <main className="flex flex-row">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col items-center dark:bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
          <div className="w-full max-w-2xl">{children}</div>
        </section>
        <RightSideBar />
      </main>
      <BottomBar />
    </>
  );
}
