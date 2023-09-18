import ToggleThemeButton from '@/components/ToggleThemeButton';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen dark:bg-black dark:text-white">
      Hello
      <ToggleThemeButton />
    </main>
  );
}
