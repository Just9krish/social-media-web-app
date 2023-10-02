import ThreadCard from '@/components/cards/ThreadCard';
import '../globals.css';
import PostThreads from '@/components/froms/PostThreads';
import { getThread } from '@/methods/thread';
import { thread } from '@/utils/interfae';
import Spinner from '@/components/common/Spinner';

export default async function Home() {
  const threads: Array<thread> = await getThread();

  if (!threads) {
    return <Spinner />;
  }

  return (
    <>
      <PostThreads />
      <section className="mt-9 flex flex-col gap-10">
        {threads.map((thread) => (
          <ThreadCard thread={thread} key={thread.id} />
        ))}
      </section>
    </>
  );
}
