import { getUserDhaga } from '@/methods/dhaga';
import DhagaCard from '../cards/DhagaCard';
import { Dhaga } from '@/utils/interfae';

interface Props {
  componentType: string;
}

export default async function DhagaTab({ componentType }: Props) {
  let result;

  if (componentType === 'dhagas') {
    result = await getUserDhaga();
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result && result.length > 0 ? (
        result.map((dhaga: any) => <DhagaCard key={dhaga.id} dhaga={dhaga} />)
      ) : (
        <p className="text-center font-bold mt-5 text-xl">No content to show</p>
      )}
    </section>
  );
}
