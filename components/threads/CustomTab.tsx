import CommentList from '../common/CommentList';
import ThreadsList from '../common/ThreadsList';
import { Comment, ShowThread, thread } from '@/utils/interfae';

interface Props {
  componentType: string;
  comments: Comment[];
  threads: thread[] | ShowThread[];
}

export default function CustomTab({ componentType, comments, threads }: Props) {
  return (
    <section className="mt-9 flex flex-col gap-10">
      {componentType !== 'threads' ? (
        <CommentList comments={comments} />
      ) : (
        <ThreadsList threads={threads} />
      )}
    </section>
  );
}
