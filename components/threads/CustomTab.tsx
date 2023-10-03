import { getUserComments, getUserThread } from '@/methods/thread';
import ThreadCard from '../cards/ThreadCard';
import CommentList from '../common/CommentList';
import ThreadsList from '../common/ThreadsList';

interface Props {
  componentType: string;
}

export default async function CustomTab({ componentType }: Props) {
  return (
    <section className="mt-9 flex flex-col gap-10">
      {componentType !== 'threads' ? <CommentList /> : <ThreadsList />}
    </section>
  );
}
