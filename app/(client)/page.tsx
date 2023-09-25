import DhagaCard from '@/components/cards/DhagaCard';
import '../globals.css';
import AddThreads from '@/components/threads/AddThreads';
import { getDhaga } from '@/methods/dhaga';
import { Dhaga } from '@/utils/interfae';

export default async function Home() {
  const dhagas: Array<Dhaga> = await getDhaga();

  if (!dhagas) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddThreads />
      {/* <h1 className='text-heading2-bold dark:text-light-1 text-left'>Home</h1> */}

      <section className="mt-9 flex flex-col gap-10">
        {dhagas.map((dhaga) => (
          <DhagaCard dhaga={dhaga} key={dhaga.id} />
        ))}
      </section>
    </>
  );
}
