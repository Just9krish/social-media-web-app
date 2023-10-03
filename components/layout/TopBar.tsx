import Image from 'next/image';
import ToggleThemeButton from '../common/ToggleThemeButton';

export default function TopBar() {
  return (
    <section className="fixed top-0 z-30 flex w-full items-center justify-end dark:bg-dark-2 px-6 py-3">
      {/* <Image src="/assets/thread.svg" alt="Thread" width={50} height={50} /> */}
      <ToggleThemeButton />
    </section>
  );
}
