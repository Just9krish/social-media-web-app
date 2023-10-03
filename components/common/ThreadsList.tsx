import { getUserThread } from '@/methods/thread';
import { thread } from '@/utils/interfae';
import ThreadCard from '../cards/ThreadCard';

export default async function ThreadsList() {
  const threads: thread[] = await getUserThread();
  return (
    <>
      {threads && threads.length > 0 ? (
        threads.map((thread) => <ThreadCard thread={thread} key={thread.id} />)
      ) : (
        <p className="text-center font-bold mt-5 text-xl">
          No threads to show.
        </p>
      )}
    </>
  );
}
