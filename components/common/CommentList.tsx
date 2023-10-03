import { getUserComments } from '@/methods/thread';
import { Comment } from '@/utils/interfae';
import CommentCard from '../cards/CommentCard';

export default async function CommentList() {
  const comments: Comment[] = await getUserComments();
  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} />
        ))
      ) : (
        <p className="text-center font-bold mt-5 text-xl">
          No comments to show.
        </p>
      )}
    </>
  );
}
