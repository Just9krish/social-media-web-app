import { getUserThread } from '@/methods/thread';
import ThreadCard from '../cards/ThreadCard';

interface Props {
  componentType: string;
}

export default async function threadTab({ componentType }: Props) {
  let result;

  if (componentType === 'threads') {
    result = await getUserThread();
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result && result.length > 0 ? (
        result.map((thread: any) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))
      ) : (
        <p className="text-center font-bold mt-5 text-xl">No content to show</p>
      )}
    </section>
  );
}
